import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import * as userRoutes from "./routes/userRoutes";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "Tope OJewale",
  });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
