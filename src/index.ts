import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./routes/UserRoutes";
import recipeRoutes from "./routes/RecipeRoutes";
import publicRoutes from "./routes/PublicRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL as string)
  .then(() => console.log("Connected to database"));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 minutes
  limit: 20, //20 requests
  message: "Too many requests from this IP, please try again later.",
});

const app = express();
app.use(cookieParser());
app.use(express.json());

//Applying limit to all requests
app.use(limiter);

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "test" });
});

app.use("/api/auth/", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/categories", categoryRoutes);

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});

//9wElGpvJcvDMnX23
