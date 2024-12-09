import express, { Request, Response } from "express";
import { CategoryType } from "../types/Category";
import Category from "../models/CategoryModel";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category: CategoryType = req.body;

    category.userId = req.userId;

    const savedCategory = new Category(category);
    await savedCategory.save();

    return res.status(200).json(savedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getMyCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ userId: req.userId });

    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const updatedCategory: CategoryType = req.body;

    const newCategory = await Category.findByIdAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      updatedCategory,
      { new: true }
    );

    if (!newCategory) {
      return res.status(400).json({ message: "Category Not Found" });
    }

    await newCategory.save();

    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const removeCategory = await Category.findByIdAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!removeCategory) {
      return res.status(400).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Category deleted!!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};
