ALTER TABLE "article" RENAME TO "articles";--> statement-breakpoint
ALTER TABLE "image" RENAME TO "images";--> statement-breakpoint
ALTER TABLE "articles" DROP CONSTRAINT "article_slug_unique";--> statement-breakpoint
ALTER TABLE "articles" DROP CONSTRAINT "article_og_image_image_id_fk";
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_og_image_images_id_fk" FOREIGN KEY ("og_image") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_slug_unique" UNIQUE("slug");