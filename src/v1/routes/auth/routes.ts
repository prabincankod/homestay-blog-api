import { Router } from "express";

import {
  loginController,
  signUpController,
} from "../../controllers/authController";

export const authRoutes = Router();

authRoutes.post("/signup", signUpController);
authRoutes.post("/login", loginController);
