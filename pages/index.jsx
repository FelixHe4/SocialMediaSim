import Card from "@/components/Card";
import CommunityCardButton from "@/components/CommunityCardButton";
import Page from "@/components/Page";
import CardButton from "@/components/CardButton";
import InfiniteScroll from "react-infinite-scroll-component";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

const NEW_FEED_QUERY = gql`
  query ($user_id: Int!, $offset: Int!) {
    feed(user_id: $user_id, offset: $offset) {
      id
      text
      user_name
      user_id
      created_ts
    }
  }
`;

const Home = () => {
  const current_user_id = 1;
  const { query } = useRouter();
  query.id = current_user_id;
  const [reachedEnd, setReachedEnd] = useState(false);

  const {
    data: postData,
    loading: loading2,
    fetchMore,
  } = useQuery(NEW_FEED_QUERY, {
    skip: !query.id,
    variables: {
      user_id: current_user_id,
      offset: 0,
    },
  });

  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        user_id: current_user_id,
        offset: postData.feed.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult.feed.length === 0) {
          setReachedEnd(true);
        }
        if (!fetchMoreResult) return previousResult;

        return Object.assign({}, previousResult, {
          feed: [...previousResult.feed, ...fetchMoreResult.feed],
        });
      },
    });
  };

  if (!postData || loading2) {
    return null;
  }

  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
          <p>Your newsfeed should be shown in this section.</p>
          {!loading2 && (
            <InfiniteScroll
              dataLength={postData.feed.length}
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
                {postData.feed.map(({ id, user_id, text, user_name }) => (
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
        <Card className="ml-4 max-w-xs flex-none">
          <h2 className="text-md font-bold">Communities</h2>
          <ul className="grid gap-4 mt-2">
            <li>
              <CommunityCardButton icon="🤠" href="/community/1">
                Dallas Fort Worth Investors
              </CommunityCardButton>
            </li>
            <li>
              <CommunityCardButton icon="🔨" href="/community/2">
                BRRRR Investors
              </CommunityCardButton>
            </li>
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default Home;
