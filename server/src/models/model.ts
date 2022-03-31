import * as express from "express";
export interface TypedRequest<T> extends Express.Request {
  body: T;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserRequest extends express.Request {
  user?: any;
}
