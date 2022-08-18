import { Router } from "express";

const router = Router();

const feed = "feed";

router.get("/feed", (_, response) => {
  response.json({ feed });
});

export default router;
