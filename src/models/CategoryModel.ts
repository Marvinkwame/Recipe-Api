import mongoose from "mongoose";
import { CategoryType } from "../types/Category";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});


const Category = mongoose.model<CategoryType>("Category",categorySchema)

export default Category