CREATE TYPE "public"."Article_Status" AS ENUM('Idea, Unpublished,Published');--> statement-breakpoint
CREATE TABLE "article" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL
);
