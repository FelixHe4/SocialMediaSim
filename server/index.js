import { ApolloServer, gql } from "apollo-server-micro";
import * as resolvers from "@/server/resolvers";

const typeDefs = gql`
  type Community {
    id: Int!
    name: String!
    description: String!
    icon: String!
    members: [User!]!
    posts: [Post!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    profile_photo: String!
    communities: [Community!]!
    posts: [Post!]!
    feed: [Post!]!
  }

  type Post {
    id: Int!
    text: String!
    user_name: String!
    user_id: String!
    community_id: Int!
    created_ts: String!
    updated_ts: String!
  }

  type Query {
    community(id: Int!): Community!
    user(id: Int!): User!
    post(id: Int!): Post!
    community_posts(community_id: Int!, offset: Int!): [Post!]!
    user_posts(user_id: Int!, offset: Int!): [Post!]!
    feed(user_id: Int!, offset: Int!): [Post!]!
    follows(id: Int!, follow: Int!): Boolean!
  }

  type Mutation {
    newPost(
      text: String!
      community_id: Int!
      user_id: Int!
      user_name: String!
    ): Post!
    deletePost(id: Int!): Boolean
    newFollow(id: Int!, follow: Int!): Boolean
    unFollow(id: Int!, follow: Int!): Boolean
  }
`;

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});
