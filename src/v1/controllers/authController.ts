import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CreateUser } from "../../dtos/CreateUser";

import { LoginUser } from "../../dtos/LoginUser";
import { prismaClient } from "../../../prisma/prisma";

export const signUpController = async (req: Request, res: Response) => {
  const body = req.body;
  let parsed = await CreateUser.spa(body);

  if (!parsed.success || !parsed.data) {
    res.status(401).json({ success: false, message: "check the request body" });
    return;
  }

  try {
    if (parsed.data) {
      const userExists = await prismaClient.author.findUnique({
        where: {
          email: parsed.data.email,
        },
      });

      if (userExists) {
        res
          .status(403)
          .json({ success: false, message: "user already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
      parsed.data.password = hashedPassword;

      const newUser = await prismaClient.author.create({ data: parsed.data });

      res
        .status(201)
        .json({ success: true, message: "User created Successfully" });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "somethig went wrong" });
    return;
  }
};

export const loginController = async (req: Request, res: Response) => {
  const body = req.body;

  const parsed = await LoginUser.spa(body);

  if (!parsed.success || !parsed.data) {
    res.status(401).json({ success: false, message: "check the request body" });
    return;
  }

  try {
    const userExists = await prismaClient.author.findUnique({
      where: {
        email: parsed.data.email,
      },
    });
    if (!userExists) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      userExists.password ?? "",
    );
    if (!passwordMatch) {
      res.status(401).json({ success: false, message: "Incorrect password" });
      return;
    }

    const token = await jwt.sign(
      { id: userExists.id, email: userExists.email },
      "secret",
      {
        expiresIn: "24h",
      },
    );

    res
      .status(200)
      .json({ success: true, data: { token: token, email: userExists.email } });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "somethig went wrong" });
    return;
  }
};
