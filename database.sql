CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  login VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "chats" (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  model VARCHAR(127) NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id")
);

CREATE TABLE IF NOT EXISTS "messages" (
  id SERIAL PRIMARY KEY,
  "chatId" INT NOT NULL,
  "from" VARCHAR(255),
  content TEXT NOT NULL,
  FOREIGN KEY ("chatId") REFERENCES "chats" ("id")
);

CREATE TABLE IF NOT EXISTS "aiModels" (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR(127) NOT NULL,
  "description" VARCHAR(1023) NOT NULL,
  "useCases" VARCHAR(511) NOT NULL
);