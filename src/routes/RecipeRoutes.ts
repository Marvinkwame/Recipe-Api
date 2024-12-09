import express from "express";
import verifyToken from "../middleware/verifyToken";
import { validateRecipeRequest } from "../middleware/validation";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  updateRecipe,
} from "../controllers/RecipeController";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  validateRecipeRequest,
  createRecipe as express.RequestHandler
);
 
//Listof recipes(add filtering and pagination)
router.get("/");

//Get recipe based on ownership
router.get("/:id", verifyToken, getRecipe as express.RequestHandler);

//update a recipe if the user is the owner
router.put("/:id", verifyToken, updateRecipe as express.RequestHandler);

//delete a recipe 
router.delete("/:id", verifyToken, deleteRecipe as express.RequestHandler )

export default router;