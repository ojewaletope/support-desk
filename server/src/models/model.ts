export interface TypedRequest<T> extends Express.Request {
  body: T;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}
