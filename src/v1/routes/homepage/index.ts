import { type Request, type Response, Router } from "express";
import { prismaClient } from "../../../../prisma/prisma";

export const homePageRouter = Router();

homePageRouter.get("/", async (req: Request, res: Response) => {
  const featuredPosts = await prismaClient.article.findMany({
    where: { isFeatured: true, status: "Published" },
    omit: { content: true, imageId: true },
    include: { ogImage: true },
  });

  const featuredCatrgories = await prismaClient.category.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      image: true,
      _count: {
        select: { articles: true },
      },
    },

    take: 4,
  });

  res.json({
    success: true,
    data: {
      posts: featuredPosts,
      categories: featuredCatrgories,
    },
  });
});
