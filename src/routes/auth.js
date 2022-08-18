import { Router } from "express";
import { AuthController } from "../auth/controllers/AuthController";

const router = Router();

const authController = new AuthController();

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.get("/signup", authController.getSignUp);

router.get("/signin", authController.getSignIn);

export default router;
