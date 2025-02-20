
import { boolean, pgEnum, PgEnumColumn, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Article_Status = pgEnum('Article_Status', ['Idea', 'Unpublished', 'Published'])

export const image = pgTable('images', {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
    url: text('url').notNull(),
})

export const article = pgTable('articles', {
    id: serial('id').primaryKey().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    content: text('content').notNull().default('Hello World'),
    status: Article_Status().notNull(),
    
    is_featured: boolean('is_featured').default(false).notNull(),
    og_image: serial('og_image').references(() => {
        return image.id
    })
})