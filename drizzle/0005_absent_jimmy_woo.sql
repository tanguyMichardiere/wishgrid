CREATE TABLE IF NOT EXISTS "wishViews" (
	"user_id" char(32) NOT NULL,
	"wish_id" uuid NOT NULL,
	CONSTRAINT wishViews_user_id_wish_id PRIMARY KEY("user_id","wish_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishViews" ADD CONSTRAINT "wishViews_wish_id_wishes_id_fk" FOREIGN KEY ("wish_id") REFERENCES "wishes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
