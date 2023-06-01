CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" varchar(256) NOT NULL,
	"date" date NOT NULL,
	"user_id" char(32) NOT NULL,
	"wish_id" uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS "friend_requests" (
	"user_id" char(32) NOT NULL,
	"friend_id" char(32) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_user_id_friend_id" PRIMARY KEY("user_id","friend_id");

CREATE TABLE IF NOT EXISTS "friends" (
	"user_id" char(32) NOT NULL,
	"friend_id" char(32) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_friend_id" PRIMARY KEY("user_id","friend_id");

CREATE TABLE IF NOT EXISTS "wishes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(32) NOT NULL,
	"description" varchar(256) NOT NULL,
	"link" varchar(191) NOT NULL,
	"user_id" char(32) NOT NULL,
	"reserved_by_id" char(32)
);

DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_wish_id_wishes_id_fk" FOREIGN KEY ("wish_id") REFERENCES "wishes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
