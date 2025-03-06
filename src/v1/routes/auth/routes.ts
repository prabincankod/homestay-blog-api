import { Router } from "express";

export const authRoutes = Router();

authRoutes.post("/login", async (req, res) => {
  res.send("login should be implemented here");
});
authRoutes.post("/signup", async (req, res) => {
  res.send("signup should be implemented here");
});
