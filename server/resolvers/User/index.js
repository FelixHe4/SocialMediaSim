import { query } from "@/server/db";

export const communities = async (user) => {
  const communities = await query(
    `
    SELECT c.*
    FROM memberships m
    JOIN communities c on m.community_id = c.id
    WHERE m.user_id = ?
  `,
    [user.id]
  );

  return communities;
};

export const posts = async (user) => {
  const posts = await query(
    `
    SELECT *
    FROM posts
    WHERE user_id = ?
  `,
    [user.id]
  );

  return posts;
};
