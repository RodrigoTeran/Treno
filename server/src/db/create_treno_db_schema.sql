CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL,
  "pwd" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);