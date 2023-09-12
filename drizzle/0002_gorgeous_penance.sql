ALTER TABLE "comments" RENAME COLUMN "date" TO "timestamp";--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "timestamp" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "timestamp" SET DEFAULT now();