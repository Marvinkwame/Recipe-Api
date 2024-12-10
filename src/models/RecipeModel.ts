import mongoose from "mongoose";
import { RecipeType } from "../types/Recipe";


const recipeSchema = new mongoose.Schema({
  userId: { type: String, required: true }, //keep track of the owner of the recipe using the id in user collection
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }, 
  imageUrl: {
    type: String,
    required: true,
    match:  /^https?:\/\/.+/,
  },
  tags: [{ type: String }],
  instructions: [{ type: String, required: true }],
  //category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  category: { type: String },
  isPublic: {
    type: Boolean,
    required: true
  },
});

const Recipe = mongoose.model<RecipeType>("Recipe", recipeSchema);

export default Recipe;
