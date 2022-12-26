import express from "express";
import AuthController from "../modules/auth/controllers/auth.controller";

//to create routes for authmodule
const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.get("/refreshToken", AuthController.refreshToken);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/me", AuthController.getMe);

//to use the authrouter outside this file
export default authRouter;
