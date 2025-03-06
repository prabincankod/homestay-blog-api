import { Request, Response, Router } from "express";
import { CreateArticle } from "../../../dtos/CreateArticle";
import { prismaClient } from "../../../../prisma/prisma";

export const articlesRouter = Router();

articlesRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const parsed = await CreateArticle.spa(body);

  if (!parsed.success) {
    res.status(401).json({ success: false, message: "check the request body" });
  }

  try {
    if (parsed.success && parsed.data) {
      await prismaClient.article.create({ data: parsed.data });
      res
        .status(201)
        .json({ success: true, message: "article creation success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
});

articlesRouter.get("/:slug", async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const article = await prismaClient.article.findUnique({
    where: {
      slug: slug,
    },
    include: { ogImage: true },
  });

  if (!article) {
    res.status(404).json({ success: false, message: "not found" });
  }

  res.status(200).json({ success: true, data: article });
});

// gets all posts.
articlesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await prismaClient.article.findMany({
      include: {
        ogImage: true,
      },
    });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
});

articlesRouter.patch("/:slug", async (req: Request, res: Response) => {
  const { content, title } = req.body;

  const slug = req.params.slug;
  const article = await prismaClient.article.findUnique({
    where: {
      slug: slug,
    },
    include: { ogImage: true },
  });

  if (!article) {
    res.status(404).json({ success: false, message: "not found" });
  }

  await prismaClient.article.update({
    where: {
      id: article?.id,
    },
    data: {
      content,
      title,
    },
  });

  res.status(200).json({ success: true, data: article });
});
