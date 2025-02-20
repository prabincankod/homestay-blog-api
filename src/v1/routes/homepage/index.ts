import { type Request, type Response, Router } from "express";
import { db } from "../../../db";
import { article } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const homePageRouter = Router()


homePageRouter.get('/', async (req: Request, res: Response) => {
    const featuredPosts = await db.select().from(article).where(eq(article.is_featured, true));


    res.json({
        success: true,
        data: {
            posts: featuredPosts

        }
    })







})