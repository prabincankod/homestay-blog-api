import { Request, Response, Router } from "express";
import { prismaClient } from "../../../../prisma/prisma";
import { CreateImage } from "../../../dtos/CreateImage";

export const imagesRouter = Router();

imagesRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  let parsed = await CreateImage.safeParseAsync(body);

  if (!parsed.success) {
    res.status(400).send({ success: false, message: "Check the request body" });
    return;
  }

  try {
    const newImage = await prismaClient.image.create({
      data: {
        url: parsed.data.url,
        alt: parsed.data.alt,
        Article: {
          connect: {
            id: parsed.data.article,
          },
        },
        Category: {
          connect: {
            id: parsed.data.category,
          },
        },
      },
    });

    res
      .status(201)
      .send({ success: true, message: "image created successfully" });
    return;
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).send({ success: false, message: "Server error" });
    return;
  }
});

imagesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const allImages = await prismaClient.image.findMany();

    res.status(200).json({ success: true, data: allImages });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: " something went wrong" });
    return;
  }
});
