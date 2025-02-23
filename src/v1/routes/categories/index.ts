import { Router } from "express";
import { prismaClient } from "../../../../prisma/prisma";

export const categoriesRouter = Router()

categoriesRouter.get('/:slug', async (req, res) => {

    const slug = req.params.slug;

    // const posts = await prismaClient.article.findMany({
    //     where: {
    //         categories: {
    //             some: {
    //                 slug: slug
    //             }
    //         }
    //     }
    // })

    const category = prismaClient.category.findUnique({
        where: {
            slug: slug
        }, include: {
            articles: {
                omit: {
                    content: true
                },
                include: {
                    ogImage: true
                }
            },
            image: true
        }
    })


    if (!category) {
        res.status(404).json({ success: false, message: 'category not found' })
    }


    res.json({ success: true, data: category })








})