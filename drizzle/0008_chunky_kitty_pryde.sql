ALTER TABLE "comments" DROP CONSTRAINT "comments_wish_id_wishes_id_fk";
--> statement-breakpoint
ALTER TABLE "wish_views" DROP CONSTRAINT "wish_views_wish_id_wishes_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_wish_id_wishes_id_fk" FOREIGN KEY ("wish_id") REFERENCES "wishes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wish_views" ADD CONSTRAINT "wish_views_wish_id_wishes_id_fk" FOREIGN KEY ("wish_id") REFERENCES "wishes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
