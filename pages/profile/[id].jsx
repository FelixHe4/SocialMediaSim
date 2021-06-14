import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";

import Card from "@/components/Card";
import CardButton from "@/components/CardButton";
import CommunityCardButton from "@/components/CommunityCardButton";
import Page from "@/components/Page";
import NewPost from "@/components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const USER_QUERY = gql`
  query ($id: Int!, $follow: Int!) {
    user(id: $id) {
      id
      name
      profile_photo
      bio
      communities {
        id
        name
        icon
      }
    }
    follows(id: $follow, follow: $id)
  }
`;

const USER_POSTS_QUERY = gql`
  query ($user_id: Int!, $offset: Int!) {
    user_posts(user_id: $user_id, offset: $offset) {
      id
      user_id
      text
      user_name
    }
  }
`;

const NEW_FOLLOW = gql`
  mutation NewFollow($id: Int!, $follow: Int!) {
    newFollow(id: $id, follow: $follow)
  }
`;

const UN_FOLLOW = gql`
  mutation UnFollow($id: Int!, $follow: Int!) {
    unFollow(id: $id, follow: $follow)
  }
`;

const ProfilePage = () => {
  const current_user_id = 1;
  const current_user_name = "Mario Gonzalez";
  const [newFollow] = useMutation(NEW_FOLLOW);
  const [unFollow] = useMutation(UN_FOLLOW);

  const { query } = useRouter();
  const [reachedEnd, setReachedEnd] = useState(false);
  const { data: data1, loading: loading1 } = useQuery(USER_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
      follow: current_user_id,
    },
  });

  const reloadPage = () => {
    window.location.reload();
  };

  const {
    data: postData,
    loading: loading2,
    fetchMore,
  } = useQuery(USER_POSTS_QUERY, {
    skip: !query.id,
    variables: {
      user_id: Number(query.id),
      offset: 0,
    },
  });

  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        user_id: Number(query.id),
        offset: postData.user_posts.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult.user_posts.length === 0) {
          setReachedEnd(true);
        }
        if (!fetchMoreResult) return previousResult;

        return Object.assign({}, previousResult, {
          user_posts: [
            ...previousResult.user_posts,
            ...fetchMoreResult.user_posts,
          ],
        });
      },
    });
  };

  const user = data1?.user;
  if (!user || loading1 || loading2) {
    return null;
  }

  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">{user.name}'s posts</h1>
          <p>
            Posts created by the user (the user's timeline) should be shown in
            this section.
          </p>
          {user.id == current_user_id && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <NewPost
                user_id={current_user_id}
                user_name={current_user_name}
                community_id={-1}
              ></NewPost>
              <img
                src="http://simpleicon.com/wp-content/uploads/refresh.png"
                style={{ cursor: "pointer", width: "20%" }}
                onClick={() => reloadPage()}
              ></img>
            </div>
          )}
          {!loading2 && (
            <InfiniteScroll
              dataLength={postData.user_posts.length}
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
                {postData.user_posts.map(({ id, user_id, text, user_name }) => (
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
                ))}
              </ul>
            </InfiniteScroll>
          )}
        </Card>
        <Card className="ml-4 py-10 max-w-xs flex-none grid justify-items-center gap-2 max-w-xs">
          <div className="text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center">
            <img src={user.profile_photo} />
          </div>
          <h2 className="text-md font-bold">{user.name}</h2>
          <span className="text-sm text-gray-400">
            <strong>{user.communities.length}</strong> communities
          </span>
          <p className="text-center text-sm">{user.bio}</p>
          {!data1.follows && data1.user.id != current_user_id && (
            <p
              onClick={() => {
                newFollow({
                  variables: { id: current_user_id, follow: data1.user.id },
                });
              }}
            >
              Follow?
            </p>
          )}
          {data1.follows && data1.user.id != current_user_id && (
            <p
              onClick={() => {
                unFollow({
                  variables: { id: current_user_id, follow: data1.user.id },
                });
              }}
            >
              Unfollow?
            </p>
          )}
          <ul className="grid gap-4 mt-2">
            {user.communities.map(({ id, name, icon }) => (
              <li>
                <CommunityCardButton href={`/community/${id}`} icon={icon}>
                  {name}
                </CommunityCardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default ProfilePage;
