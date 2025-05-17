import { Router } from "express";
import { authRoutes } from "./auth/routes";
import { homePageRouter } from "./homepage";
import { articlesRouter } from "./articles";
import { categoriesRouter } from "./categories";
import { imagesRouter } from "./images";
import { bookingsRouter } from "./bookings";

export const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/homepage", homePageRouter);
v1Router.use("/articles", articlesRouter);
v1Router.use("/categories", categoriesRouter);
v1Router.use("/images", imagesRouter);
v1Router.use("/bookings", bookingsRouter);
