import { type Request, type Response, Router } from "express";

import { CreateBooking } from "../../../dtos/CreateBooking";
import { prismaClient } from "../../../../prisma/prisma";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export const bookingsRouter = Router();
bookingsRouter.post("/", async (req: Request, res: Response) => {
    const body = req.body;
    const parsed = await CreateBooking.spa(body);

    if (!parsed.success) {
        res.status(401).json({ success: false, message: "check the request body" });
    }




    resend.emails.send({
        from: 'Notif <email.homestaystories.com>',
        to: ['prabinsubedi2016@gmail.com'],
        subject: 'hello world',
        html: '<p>it works!</p>',
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });


    try {
        if (parsed.success && parsed.data) {
            await prismaClient.bookings.create({
                data: {
                    identifier: parsed.data.identifier,
                    packageIdentifier: parsed.data.packageIdentifier,
                    name: parsed.data.name,
                    email: parsed.data.email,
                    phone: parsed.data.phone,
                    address: parsed.data.address,
                    country: parsed.data.country,
                    totalPeople: parsed.data.totalPeople,
                    stayDuration: parsed.data.stayDuration,

                },

            });
            res
                .status(201)
                .json({ success: true, message: "booking creation success" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "something went wrong" });
    }



});

