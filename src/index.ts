import express, { Request, Response } from "express";
import mongoose from "mongoose"
import "dotenv/config";
import authRoutes from "./routes/UserRoutes"
import recipeRoutes from "./routes/RecipeRoutes"
import cookieParser from "cookie-parser"


mongoose
  .connect(process.env.MONGODB_CONNECTION_URL as string)
  .then(() => console.log("Connected to database"));


const app = express()
app.use(cookieParser())
app.use(express.json())

app.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "test" })
})


app.use("/api/auth/", authRoutes)
app.use("/api/recipes", recipeRoutes)


app.listen("5000", () => {
    console.log("Server is running on port 5000")
})


//9wElGpvJcvDMnX23