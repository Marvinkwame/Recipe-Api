import express, { Request, Response } from "express";
import { RecipeType } from "../types/Recipe";
import Recipe from "../models/RecipeModel";
import verifyToken from "../middleware/verifyToken";

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const newRecipe: RecipeType = req.body;

    newRecipe.userId = req.userId; //setting the userId from the cookies to the userId in the database to track who owns the recipe

    const savedRecipe = new Recipe(newRecipe);
    await savedRecipe.save();

    return res.status(200).send(savedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//Getting recipe based on ownership usinng the userId and whether its public/private
export const getRecipe = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    //found recipe by id
    const userRecipe = await Recipe.findById({
      _id: id,
    });

    if (!userRecipe) {
      return res.status(400).json({ message: "No recipe found" });
    }

    if (userRecipe.isPublic) {
      //if recipe isPublic === true
      return res.status(200).json(userRecipe);
    }

    //if the recipe is private and userId === req.userId(getting the owner of the recipe through the cookies),
    //Then return the owner's recipe
    if (!userRecipe.isPublic && userRecipe.userId === req.userId) {
      return res.status(200).json(userRecipe);
    }

    return res
      .status(403)
      .json({ message: "Recipe is private." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//updating a recipe
export const updateRecipe = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const updatedRecipe: RecipeType = req.body;

    const newRecipe = await Recipe.findOneAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      updatedRecipe,
      { new: true }
    );

    if (!newRecipe) {
      return res.status(400).json({ message: "Recipe not found" });
    }

    await newRecipe.save();

    res.status(200).send(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//delete a recipe based on id and userId
export const deleteRecipe = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const removeRecipe = await Recipe.findByIdAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!removeRecipe) {
      return res.status(400).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPublicRecipe = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const userRecipe = await Recipe.findById({
      _id: id,
    });

    if (!userRecipe) {
      return res.status(400).json({ message: "No recipe found" });
    }

    if (userRecipe.isPublic) {
      return res.status(200).json(userRecipe);
    }

    return res.status(403).json({ message: "This recipe is private" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
