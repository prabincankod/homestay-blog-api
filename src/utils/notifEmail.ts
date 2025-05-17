import { z } from "zod";
import { CreateBooking } from "../dtos/CreateBooking";

export const getNotifEmailText = (data: z.infer<typeof CreateBooking>) => {
    return `
  <html>
    <head>
      <title>HomestayNotif</title>
    </head>
    <body>


    // booking created, this is a email that reaches the host of the homestay
      <h1>Booking created</h1>
      <p>Name: ${data.name}</p>
      <p>Email: ${data.email}</p>
      <p>Phone: ${data.phone}</p>
      <p>Address: ${data.address}</p>
      <p>Country: ${data.country}</p>
      <p>Total People: ${data.totalPeople}</p>
      <p>Stay Duration: ${data.stayDuration}</p>    

    </body>
  </html>
  `;
};