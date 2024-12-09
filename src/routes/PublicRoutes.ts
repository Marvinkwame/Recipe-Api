import express from "express"
import {
    getRecipe,
    getPublicRecipe
  } from "../controllers/RecipeController";


const router = express.Router()


router.get("/recipes/:id", getPublicRecipe as express.RequestHandler)


export default router