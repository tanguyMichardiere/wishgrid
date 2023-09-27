ALTER TABLE "wishViews" RENAME TO "wish_views";--> statement-breakpoint
ALTER TABLE "wish_views" DROP CONSTRAINT "wishViews_wish_id_wishes_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wish_views" ADD CONSTRAINT "wish_views_wish_id_wishes_id_fk" FOREIGN KEY ("wish_id") REFERENCES "wishes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
