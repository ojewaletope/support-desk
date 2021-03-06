import { Router } from "express";
import usersRouter from "./userRoutes";

const routes = Router();

routes.use("/api/users", usersRouter);

export default routes;
