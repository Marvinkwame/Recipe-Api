import express from "express";
import { check, validationResult } from "express-validator";
import { getUserDetails, login, signup } from "../controllers/UserController";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

//user signup
router.post(
  "/signup",
  [
    // Validate user input
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  signup as express.RequestHandler
);


//user login
router.post("/login",  [
    // Validate user input
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ], login as express.RequestHandler )


//getting user details
router.get("/profile", verifyToken, getUserDetails as express.RequestHandler)

export default router;
