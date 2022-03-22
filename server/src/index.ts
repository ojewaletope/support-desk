import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();

// connect db
connectDB();

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
