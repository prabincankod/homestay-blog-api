import { type Request, type Response, Router } from "express";
import { prismaClient } from "../../../../prisma/prisma";

export const homePageRouter = Router();

homePageRouter.get("/", async (req: Request, res: Response) => {
  const featuredPosts = await prismaClient.article.findMany({
    where: { isFeatured: true },
  });

  res.json({
    success: true,
    data: {
      posts: featuredPosts,
    },
  });
});
