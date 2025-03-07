import { Request, Response } from "express";
import { CreateUser } from "../../dtos/CreateUser";
import { prismaClient } from "../../../prisma/prisma";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
export const signUpController = async (req: Request, res: Response) => {
    const body = req.body;
    let parsed = await CreateUser.spa(body);

    if (!parsed.success || !parsed.data) {
        return res
            .status(401)
            .json({ success: false, message: "check the request body" });
    }

    try {
        if (parsed.data) {
            const userExists = await prismaClient.author.findUnique({
                where: {
                    email: parsed.data.email,
                },
            });

            if (userExists) {
                return res
                    .status(403)
                    .json({ success: false, message: "user already exists" });
            }

            const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
            parsed.data.password = hashedPassword;

            const newUser = await prismaClient.author.create({ data: parsed.data });

            return res
                .status(201)
                .json({ success: true, message: "User created Successfully" });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "somethig went wrong" });
    }
};

export const loginController = async (req: Request, res: Response) => {
    const body = req.body;

    const parsed = await CreateUser.spa(body);

    if (!parsed.success || !parsed.data) {
        return res
            .status(401)
            .json({ success: false, message: "check the request body" });
    }

    try {
        const userExists = await prismaClient.author.findUnique({
            where: {
                email: parsed.data.email,
            },
        });
        if (!userExists) {
            return res
                .status(404)
                .json({ success: false, message: "user not found" });
        }

        const passwordMatch = await bcrypt.compare(
            userExists.password!,
            parsed.data.password,
        );

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Incorrect password" });
        }

        const token = await jwt.sign(
            { id: userExists.id, email: userExists.email },
            "secret",
            {
                expiresIn: "24h",
            },
        );

        return res
            .status(200)
            .json({ success: true, data: { token: token, email: userExists.email } });
            
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "somethig went wrong" });
    }
};
