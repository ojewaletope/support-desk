import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
// import { Response, Request, NextFunction } from 'express';

import * as express from "express";
import { IUserRequest } from "../models/model";

export const protect = asyncHandler(
  async (
    req: IUserRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let token!: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // get token from headers
        token = req.headers.authorization.split(" ")[1];

        // verify token
        const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET}`);

        // get user from token
        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.status(401);

        throw new Error("Unauthorized");
      }
    }

    if (!token) {
      res.status(401);

      throw new Error("Unauthorized");
    }
  }
);
