CREATE TABLE "clients" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL,
  "pwd" TEXT NOT NULL,
  "profile_img" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);

CREATE TABLE "devices" (
  "id" SERIAL PRIMARY KEY,
  "key" TEXT NOT NULL,
  "icon" TEXT,
  "place" TEXT,
  "client_id" INTEGER,
  "state" BOOLEAN,
  "created_at" TIMESTAMP NOT NULL DEFAULT (now()),
  UNIQUE("key")
);

CREATE TABLE "signals" (
  "id" SERIAL PRIMARY KEY,
  "device_key" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);

ALTER TABLE "devices" ADD FOREIGN KEY ("client_id") REFERENCES "clients" ("id");
ALTER TABLE "signals" ADD FOREIGN KEY ("device_key") REFERENCES "devices" ("key");