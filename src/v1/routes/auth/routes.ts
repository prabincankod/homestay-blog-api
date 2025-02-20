import { Router } from "express";

export const authRoutes = Router();

authRoutes.post("/login", (req, res) => {
  res.send("login should be implemented here");
});
authRoutes.post("/signup", (req, res) => {
  res.send("signup should be implemented here");
});
