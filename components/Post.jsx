import React from "react";
import classnames from "classnames";

import { gql, useMutation } from "@apollo/client";

const NEW_POST = gql`
  mutation NewPost(
    $text: String!
    $community_id: Int!
    $user_id: Int!
    $user_name: String!
  ) {
    newPost(
      text: $text
      community_id: $community_id
      user_id: $user_id
      user_name: $user_name
    ) {
      text
      community_id
      user_id
      user_name
    }
  }
`;

export default function NewPost({ user_name, user_id, community_id }) {
  let input;
  const [newPost, { data }] = useMutation(NEW_POST);
  return (
    <div
      className={classnames({
        [`p-6 rounded-2xl bg-${"white"}`]: true,
      })}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newPost({
            variables: {
              text: input.value,
              community_id: community_id,
              user_id: user_id,
              user_name: user_name,
            },
          });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
