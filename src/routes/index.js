import { Router } from "express";
import authRoutes from "../auth/auth-routes";
import coreRoutes from "./feed";

const router = Router();

router.use("/auth", authRoutes);
router.use("/feed", coreRoutes);

export default router;
