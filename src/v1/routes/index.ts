import { Router } from "express";
import { authRoutes } from "./auth/routes";
import { homePageRouter } from "./homepage";

export const v1Router = Router();

v1Router.use('/auth', authRoutes)
v1Router.use('/homepage' , homePageRouter)
