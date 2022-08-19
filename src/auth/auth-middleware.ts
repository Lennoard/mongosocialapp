import { Request, Response, NextFunction } from "express";
import { UserRepositoryImpl } from "./data/UserRepositoryImpl";
import { UserRepository } from "./domain/UserRepository";
import jwt from "jsonwebtoken";

// TODO: Inject
const userRepository: UserRepository = new UserRepositoryImpl();

export const AuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response
      .status(401)
      .json({ error: "Access denied, invalid credentials." });
  }

  const [authType, credentials] = authorization.split(" ");

  if (authType === "Basic") {
    return checkBasicAuth(credentials, response, next);
  }

  if (authType === "Bearer") {
    return checkBearerAuth(credentials, response, next);
  }

  return response
    .status(501)
    .json({ error: "Invalid request, must provide auth." });
};

const checkBasicAuth = async (
  credentials: string,
  response: Response,
  next: NextFunction
) => {
  let buff = Buffer.from(credentials, "base64");
  let [email, password] = buff.toString("ascii").split(":");

  const user = await userRepository.find({ email, password });
  if (!user) {
    return response.status(401).json({ error: "Invalid auth credentials." });
  }

  return next();
};

const checkBearerAuth = async (
  token: string,
  response: Response,
  next: NextFunction
) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY || "";

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return next();
    }
    return response
      .status(401)
      .json({ error: "Access denied, invalid credentials." });
  } catch (error) {
    return response.status(401).send(error);
  }
};
