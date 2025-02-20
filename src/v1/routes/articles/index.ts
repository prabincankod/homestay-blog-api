import { Request, Response, Router } from "express";

import { createInsertSchema } from 'drizzle-zod';
import { article } from "../../../db/schema";

export const articlesRouter = Router()


articlesRouter.get('/', async (req: Request, res: Response) => {
    res.send('artiles lies here')
})
articlesRouter.post('/', async (req: Request, res: Response) => {

    const body = req.body;


    const articleCreateSchema = createInsertSchema(article)
    const parsed = await articleCreateSchema.spa(body)



    if (parsed.success) {
        res.send('articles created')
    } else {
        res.send('cannot create articles')

    }






})
articlesRouter.get('/', async (req: Request, res: Response) => {
    res.send('artiles lies here')
})