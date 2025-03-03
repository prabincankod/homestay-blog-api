import { Request, Response, Router } from "express";
import { prismaClient } from "../../../../prisma/prisma";

export const categoriesRouter = Router();


categoriesRouter.get("/sitemap-index", async (req: Request, res: Response) => {

  const allCategories = await prismaClient.category.findMany({
    omit: {
      description: true,
      isFeatured: true, imageid: true,
      name: true,

    }
  })
  res.json({ success: true, data: allCategories })
})


categoriesRouter.get("/:slug", async (req, res) => {
  const slug = req.params.slug;

  const category = await prismaClient.category.findUnique({
    where: {
      slug: slug,
    },
    include: {
      articles: {
        omit: {
          content: true,
        },
        include: {
          ogImage: true,
        },
      },
      image: true,
    },
  });

  if (!category) {
    res.status(404).json({ success: false, message: "category not found" });
  }

  res.json({ success: true, data: category });
});
