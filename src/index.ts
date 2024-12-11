import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./routes/UserRoutes";
import recipeRoutes from "./routes/RecipeRoutes";
import publicRoutes from "./routes/PublicRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import connectDB from "./config/mongo";
import limiter from "./config/rateLimit";


connectDB()

const app = express();
app.use(cookieParser());
app.use(express.json());

//Applying limit to all requests
app.use(limiter);


app.use("/api/auth/", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/categories", categoryRoutes);

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});

//9wElGpvJcvDMnX23
