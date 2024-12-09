import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateRecipeRequest = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  body("tags")
    .isArray()
    .withMessage("Tags must be an array")
    .not()
    .isEmpty()
    .withMessage("Tags array cannot be empty"),
  body("instructions")
    .isArray()
    .withMessage("Instructions must be an array")
    .not()
    .isEmpty()
    .withMessage("Instructions array cannot be empty"),
  body("category").isString().notEmpty().withMessage("Category is required"),
  body("isPublic").isBoolean().withMessage("Boolean is required"),
];


export const validateCategoryRequest = [
  body("name").isString().notEmpty().withMessage("Name is required"),
]