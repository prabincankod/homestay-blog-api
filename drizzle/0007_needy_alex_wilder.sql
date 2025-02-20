CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;