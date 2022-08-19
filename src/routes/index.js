import { Router } from "express";
import authRoutes from "../auth/auth-routes";
import feedRoutes from "../feed/feed-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/feed", feedRoutes);

export default router;
