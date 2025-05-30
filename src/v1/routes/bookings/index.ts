import { type Request, type Response, Router } from "express";

import { CreateBooking } from "../../../dtos/CreateBooking";
import { prismaClient } from "../../../../prisma/prisma";
import { Resend } from 'resend';
import { getNotifEmailText } from "../../../utils/notifEmail";

const resend = new Resend(process.env.RESEND_KEY);

export const bookingsRouter = Router();
bookingsRouter.post("/", async (req: Request, res: Response) => {
    const body = req.body;
    const parsed = await CreateBooking.spa(body);

    if (!parsed.success) {
        res.status(401).json({ success: false, message: "check the request body" });
    }


    try {
        if (parsed.success && parsed.data) {

            resend.emails.send({
                from: 'HomestayNotif <notifs@email.homestaystories.com>',
                to: ['prabinsubedi2016@gmail.com'],
                subject: 'Guest Alert!',
                html: getNotifEmailText(parsed.data)
            }).then((response) => {
                console.log('success', response);
            }).catch((error) => {
                console.log(error);
            });
            console.log('started recording');
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
            console.log('stopped recording');
            res
                .status(201)
                .json({ success: true, message: "booking creation success" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "something went wrong" });
    }



});


