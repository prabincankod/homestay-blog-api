ALTER TABLE "public"."article" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."Article_Status";--> statement-breakpoint
CREATE TYPE "public"."Article_Status" AS ENUM('Idea,', 'Unpublished', 'Published');--> statement-breakpoint
ALTER TABLE "public"."article" ALTER COLUMN "status" SET DATA TYPE "public"."Article_Status" USING "status"::"public"."Article_Status";