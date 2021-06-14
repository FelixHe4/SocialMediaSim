import { query } from "@/server/db";

export const members = async (community) => {
  const members = await query(
    `
    SELECT u.*
    FROM memberships m
    JOIN users u on m.user_id = u.id
    WHERE m.community_id = ?
  `,
    [community.id]
  );

  return members;
};

export const posts = async (community) => {
  const posts = await query(
    `
    SELECT *
    FROM posts
    WHERE community_id = ?
    ORDER BY 6 DESC
  `,
    [community.id]
  );

  return posts;
};
