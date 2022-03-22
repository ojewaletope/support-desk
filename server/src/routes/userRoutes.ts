import { Router, Request, Response } from "express";
import { registerUser } from "../controllers";

const usersRouter: Router = Router();

usersRouter.post("/register", registerUser);

export default usersRouter;
