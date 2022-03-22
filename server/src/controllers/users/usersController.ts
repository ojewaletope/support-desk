import { Request, Response } from "express";
import { NewUser, TypedRequest } from "../../models/model";
import asyncHandler from "express-async-handler";

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
  }
);

// @desc   Login a user
// @route   /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  res.json({ status: true, data: "user" });
});
