import { Router } from "express";
import { AuthMiddleware } from "../auth/auth-middleware";
import { FeedController } from "./FeedController";

const feedController = new FeedController();
const router = Router();

router.use(AuthMiddleware);

router.get("/", feedController.getFeed);
router.post("/", feedController.fetchFeed);

export default router;
