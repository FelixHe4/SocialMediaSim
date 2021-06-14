import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import Card from "@/components/Card";
import CardButton from "@/components/CardButton";
import Page from "@/components/Page";
import NewPost from "@/components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const COMMUNITY_QUERY = gql`
  query ($id: Int!) {
    community(id: $id) {
      id
      name
      description
      icon
      members {
        id
        name
        profile_photo
      }
      posts {
        user_id
        text
        user_name
        id
        created_ts
      }
    }
  }
`;

const COMMUNITY_POSTS_QUERY = gql`
  query ($community_id: Int!, $offset: Int!) {
    community_posts(community_id: $community_id, offset: $offset) {
      id
      user_id
      text
      user_name
    }
  }
`;

const CommunityPage = () => {
  const { query } = useRouter();
  const [reachedEnd, setReachedEnd] = useState(false);
  const { data: data1, loading: loading1 } = useQuery(COMMUNITY_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
    },
  });

  const {
    data: postData,
    loading: loading2,
    fetchMore,
  } = useQuery(COMMUNITY_POSTS_QUERY, {
    skip: !query.id,
    variables: {
      community_id: Number(query.id),
      offset: 0,
    },
  });

  const reloadPage = () => {
    window.location.reload();
  };

  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        community_id: Number(query.id),
        offset: postData.community_posts.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult.community_posts.length === 0) {
          setReachedEnd(true);
        }
        if (!fetchMoreResult) return previousResult;

        return Object.assign({}, previousResult, {
          community_posts: [
            ...previousResult.community_posts,
            ...fetchMoreResult.community_posts,
          ],
        });
      },
    });
  };

  var current_user_name = "Mario Gonzalez";
  var current_user_id = 1;
  const community = data1?.community;

  if (!community || loading1 || loading2) {
    return null;
  }

  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome to {community.name}</h1>
          <p>
            The community feed containing all the community’s posts should be
            shown in this section.
          </p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <NewPost
              user_id={current_user_id}
              user_name={current_user_name}
              community_id={community.id}
            ></NewPost>
            <img
              src="http://simpleicon.com/wp-content/uploads/refresh.png"
              style={{ cursor: "pointer", width: "20%" }}
              onClick={() => reloadPage()}
            ></img>
          </div>
          {!loading2 && (
            <InfiniteScroll
              dataLength={postData.community_posts.length}
              next={fetchMorePosts}
              hasMore={!reachedEnd}
              height={500}
              loader={<p>Loading...</p>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>You're all caught up! :)</b>
                </p>
              }
            >
              <ul className="grid gap-4 mt-2">
                {postData.community_posts.map(
                  ({ id, user_id, text, user_name }) => (
                    <li>
                      <CardButton
                        href={`/profile/${user_id}`}
                        deletable={user_id == current_user_id}
                        post_id={id}
                      >
                        <h2 className="text-md font-bold">{text}</h2>
                        <span className="text-md">{user_name}</span>
                      </CardButton>
                    </li>
                  )
                )}
              </ul>
            </InfiniteScroll>
          )}
        </Card>
        <Card className="ml-4 py-10 max-w-xs flex-none grid justify-items-center gap-2 max-w-xs">
          <div className="text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center">
            {community.icon}
          </div>
          <h2 className="text-md font-bold">{community.name}</h2>
          <span className="text-sm text-gray-400">
            <strong>{community.members.length}</strong> members
          </span>
          <p className="text-center text-sm">{community.description}</p>
          <ul className="grid gap-4 mt-2">
            {community.members.map(({ id, name, profile_photo }) => (
              <li>
                <CardButton
                  href={`/profile/${id}`}
                  className="flex items-center"
                >
                  <img className="h-6 w-6" src={profile_photo} />
                  <span className="ml-2 text-md">{name}</span>
                </CardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default CommunityPage;
