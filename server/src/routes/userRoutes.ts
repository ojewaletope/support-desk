import { Router, Request, Response } from "express";
import { getUser, loginUser, registerUser } from "../controllers";
import { protect } from "../middleware/authMiddleware";

const usersRouter: Router = Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/profile", protect, getUser);

export default usersRouter;
