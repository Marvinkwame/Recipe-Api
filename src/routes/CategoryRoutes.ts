import express from "express"
import verifyToken from "../middleware/verifyToken";
import { validateCategoryRequest } from "../middleware/validation";
import { createCategory, deleteCategory, getMyCategory, updateCategory } from "../controllers/CategoryController";


const router = express.Router()

//creating a new category
router.post("/", verifyToken, validateCategoryRequest, createCategory as express.RequestHandler)


//get all categories related to the logged in user
router.get("/", verifyToken, getMyCategory as express.RequestHandler)


//update a category
router.put("/:id", verifyToken, updateCategory as express.RequestHandler)


//delete category
router.delete("/:id", verifyToken, deleteCategory as express.RequestHandler)


export default router