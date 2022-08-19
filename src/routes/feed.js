import { Router } from "express";
import { AuthMiddleware } from "../auth/middleware/auth-middleware";

const router = Router();

router.use(AuthMiddleware);

router.get("/", (req, res) => res.json({ posts: [] }));

export default router;
