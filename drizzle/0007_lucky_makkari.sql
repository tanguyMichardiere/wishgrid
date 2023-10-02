CREATE EXTENSION pg_uuidv7;

ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT uuid_generate_v7();--> statement-breakpoint
ALTER TABLE "wishes" ALTER COLUMN "id" SET DEFAULT uuid_generate_v7();
