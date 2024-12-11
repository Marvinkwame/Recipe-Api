import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

//User Signup
export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { email, password } = req.body;

    let user = await User.findOne({
      email,
    });

    //if there is a user with the email already in the db, dont register the user
    if (user) {
       res.status(400).send({ message: "User already exists" });
       return
    }

    //hashed the Password in the model

    user = new User(req.body); //creating a user in the db the req from the user
    await user.save();

    //creating a jwt for a user using the user._id from the mongodb
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h", //1 hour token expiration
      }
    );

    //send the token back to the browser in response cookie with a key of jwtToken

    res.cookie("jwtToken", token, {
      httpOnly: true, //can only be accessed on the server
      secure: process.env.NODE_ENV === "production", //means on localhost its false, but true in production
      maxAge: 86400000,
    });

    return res.status(200).send({ message: "User sucessfully registered!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //we now need to check if the password from the request matches the one in the database
    const matchedPassword = await bcrypt.compare(
      password, //password from the request
      user.password //password from the database
    );

    if (!matchedPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //create a new jwt token when the user logs in using the user._id from the database
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h", //1 hour token expiration
      }
    );

    res.cookie("jwtToken", token, {
      httpOnly: true, //can only be accessed on the server
      secure: process.env.NODE_ENV === "production", //Ensures cookie is sent only over HTTPS in production
      maxAge: 86400000, //Cookie will expire after 1 day
    });

    res.send({ token }); //returning the jwt Token
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

//get user details

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwtToken", "", {
    expires: new Date(0), // token has expired on creation. its invalid
  });
  res.send();
};
