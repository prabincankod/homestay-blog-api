import { Router } from "express";
import { authRoutes } from "./auth/routes";
import { homePageRouter } from "./homepage";
import { articlesRouter } from "./articles";

export const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/homepage", homePageRouter);
v1Router.use("/articles", articlesRouter);
