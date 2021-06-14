import { get } from "@/server/db";
import { query } from "@/server/db";

export const user = async (parent, { id }) => {
  const user = await get(
    `
    SELECT * 
    FROM users 
    WHERE id = ?
  `,
    [id]
  );

  return user;
};

export const community = async (parent, { id }) => {
  const community = await get(
    `
    SELECT * 
    FROM communities 
    WHERE id = ?
  `,
    [id]
  );

  return community;
};

export const community_posts = async (parent, { community_id, offset }) => {
  const community_posts = await query(
    `
    SELECT * 
    FROM posts 
    WHERE community_id = ? 
    ORDER BY id DESC 
    LIMIT 5 
    OFFSET ?
    `,
    [community_id, offset]
  );

  return community_posts;
};

export const user_posts = async (parent, { user_id, offset }) => {
  const user_posts = await query(
    `
    SELECT * 
    FROM posts 
    WHERE user_id = ? 
    ORDER BY id DESC 
    LIMIT 5 
    OFFSET ?
    `,
    [user_id, offset]
  );

  return user_posts;
};

export const feed = async (parent, { user_id, offset }) => {
  const feed = await query(
    `
    SELECT p.*
    FROM posts p
    JOIN followers f on (f.follows == p.user_id)
    WHERE f.user_id = ?
    UNION
    SELECT p.*
    FROM posts p
    JOIN memberships m on (m.community_id == p.community_id)
    WHERE m.user_id = ?
    ORDER BY 5 ASC
    LIMIT 5 OFFSET ?
    `,
    [user_id, user_id, offset]
  );

  return feed;
};

export const post = async (parent, { id }) => {
  const post = await get(
    `
    SELECT *
    FROM posts
    WHERE id = ?
  `,
    [id]
  );

  return post;
};

export const follows = async (parent, { id, follow }) => {
  const follows = await get(
    `
    SELECT *
    FROM followers
    WHERE user_id = ? AND follows = ?
  `,
    [id, follow]
  );

  return follows != null ? true : false;
};
