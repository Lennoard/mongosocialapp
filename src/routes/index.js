import { Router } from "express";
import authRoutes from "./auth";
import coreRoutes from "./feed";

const router = Router();

router.use("/auth", authRoutes);
router.use("/core", coreRoutes);

export default router;
