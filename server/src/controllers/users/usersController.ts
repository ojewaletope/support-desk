import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/userModel";
import { IUserRequest, NewUser, TypedRequest } from "../../models/model";

// @desc    Register a user
// @route   /api/users/register
// @access  Public
export const registerUser = asyncHandler(
  async (req: TypedRequest<NewUser>, res: Response) => {
    const { name, email, password } = req.body;

    if (!name) {
      res.status(400);
      throw new Error("Name is required");
    }
    if (!email) {
      res.status(400);
      throw new Error("Email is required");
    }
    if (!password) {
      res.status(400);
      throw new Error("Password is required");
    }

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        status: true,
        _id: user._id,
        message: "User create successfully",
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("An error occured");
    }
  }
);

// @desc   Login a user
// @route   /api/users/login
// @access  Public
export const loginUser = asyncHandler(
  async (req: TypedRequest<NewUser>, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // const token = jwt.sign(user.email)
      res.status(200).json({
        status: true,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  }
);

// @desc   get current user
// @route   /api/users/profile
// @access  Private

export const getUser = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    try {
      res.status(201).json({
        status: true,
        data: req.user,
      });
    } catch (error) {}
  }
);

const generateToken = (id: any) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: "1d" });
};
