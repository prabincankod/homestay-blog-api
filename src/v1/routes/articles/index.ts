import { Request, Response, Router } from "express";
import { CreateArticle } from "../../../dtos/CreateArticle";
import { prismaClient } from "../../../../prisma/prisma";

export const articlesRouter = Router();

articlesRouter.get("/", async (req: Request, res: Response) => {
  res.send("artiles lies here");
});
articlesRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const parsed = await CreateArticle.spa(body);

  try {
    if (parsed.success && parsed.data) {
      const created = await prismaClient.article.create({ data: parsed.data });

      res
        .status(201)
        .json({ success: true, message: "article creation success" });
    } else {
      console.log(parsed.error);
      res
        .status(401)
        .json({ success: false, message: "check the request body" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
});
articlesRouter.get("/", async (req: Request, res: Response) => {
  res.send("artiles lies here");
});
