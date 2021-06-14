DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS communities;
DROP TABLE IF EXISTS feeds;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS followers;


CREATE TABLE users (
  id             INTEGER       PRIMARY KEY,
  name           VARCHAR(128)  NOT NULL,
  bio            TEXT          NOT NULL,
  profile_photo  VARCHAR(256)  NOT NULL,
  created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE communities (
  id          INTEGER       PRIMARY KEY,
  name        VARCHAR(256)  NOT NULL,
  description TEXT          NOT NULL,
  icon        VARCHAR(256)  NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE memberships (
  user_id,
  community_id,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, community_id)
);

CREATE TABLE feeds (
  source_id,
  source_type,
  post_id,
  PRIMARY KEY (post_id, source_id, source_type)
);

CREATE TABLE followers (
  user_id     INTEGER,
  follows     INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, follows)
);

CREATE TABLE posts (
  id          INTEGER       PRIMARY KEY,
  text        VARCHAR(256)  NOT NULL,
  user_id     INTEGER       NOT NULL,
  user_name   STRING        NOT NULL,
  community_id INTEGER,
  created_ts  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_ts  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users
(id, created_at, updated_at, profile_photo, name, bio)
VALUES
(1,  "2021-05-28 06:26", "2021-05-28 06:26", "https://mock-images.s3-us-west-1.amazonaws.com/green-placeholder.svg", "Mario Gonzalez", "I'm a retired software engineer turned single-family home investor in DFW."),
(2,  "2021-05-28 08:26", "2021-05-28 08:26", "https://mock-images.s3-us-west-1.amazonaws.com/red-placeholder.svg",   "Paquita Perez",  "I'm a local loan officer and RE investor in Dallas.");


INSERT INTO communities
(id, created_at, updated_at, icon, name, description)
VALUES
(1,  "2021-05-28 06:26", "2021-05-28 06:26", "🤠",  "Dallas Fort Worth Investors", "Home to all investors in the Dallas Fort Worth market"),
(2,  "2021-05-28 08:26", "2021-05-28 08:26", "🔨",  "BRRRR Investors", "We're not cold. We just want to buy, rehab, rent, refinance, and repeat.");

INSERT INTO memberships
(user_id, community_id, created_at)
VALUES
(1,  1, "2021-05-28 06:26"),
(1,  2, "2021-05-28 07:26"),
(2,  2, "2021-05-28 08:26");

-- INSERT INTO posts
-- (id, text, user_id, user_name, community_id)
-- VALUES
-- (3, "Hi", 1, "Mario Gonzales", 1),
-- (2, "Hello", 2, "FirstName LastName", 1),
-- (1, "3rd Post to check formatting", 1, "Broge Droge", 1),
-- (4, "User only post", 1, "?", -1),
-- (5, "Wowie", 2, "Paqita Perez", -1);

INSERT INTO posts
(text, user_id, user_name, community_id)
VALUES
("Hi", 1, "Mario Gonzales", 1),
("Hello", 2, "FirstName LastName", 1),
("3rd Post to check formatting", 1, "Broge Droge", 1),
("User only post", 1, "?", -1),
("Wowie", 2, "Paqita Perez", 1),
("asdasdsadasd", 2, "a Perez", 1),
("Wo212321wie", 2, "Wo Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Wowie", 2, "Paqita Perez", 1),
("Follow Post", 2, "Wo Perez", -1),
("Follow Post2", 2, "Wo Perez", -1);

