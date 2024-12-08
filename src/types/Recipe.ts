import { CategoryType } from "./Category";

export type RecipeType = {
  _id: string;
  userId: string;
  description: string;
  imageUrl: string;
  tags: string[];
  instruction: string[];
  category: string;
  isPublic: boolean;
};
