import sqlitedb from "@/server/db";

export const newPost = async (
  data,
  { text, community_id, user_id, user_name }
) => {
  let sql = `INSERT INTO posts (text, community_id, user_id, user_name) VALUES(?, ?, ?, ?)`;
  let args = [text, community_id, user_id, user_name];
  return new Promise((resolve, reject) => {
    sqlitedb.run(sql, args, (err, rows) => {
      if (err) reject(err);
      else
        sqlitedb.get(
          "SELECT * FROM posts WHERE ID = (SELECT MAX(ID) FROM posts) as id",
          (err, rows) => {
            resolve({
              text: text,
              community_id: community_id,
              user_id: user_id,
              user_name: user_name,
            });
          }
        );
    });
  });
};

export const deletePost = async (data, { id }) => {
  const sql = `DELETE FROM posts WHERE id = ?`;
  let args = [id];
  sqlitedb.run(sql, args);
  return true;
};

export const newFollow = async (data, { id, follow }) => {
  const sql = `INSERT INTO followers (user_id, follows) VALUES (?, ?)`;
  let args = [id, follow];
  sqlitedb.run(sql, args);
  return true;
};

export const unFollow = async (data, { id, follow }) => {
  const sql = `DELETE FROM followers 
                WHERE user_id = ? AND follows = ?`;
  let args = [id, follow];
  sqlitedb.run(sql, args);
  return true;
};
