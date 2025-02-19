CREATE TABLE "image" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "og_image" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_og_image_image_id_fk" FOREIGN KEY ("og_image") REFERENCES "public"."image"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_slug_unique" UNIQUE("slug");