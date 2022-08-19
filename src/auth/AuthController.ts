import { Request, Response } from "express";
import { User } from "../common/entities/User";
import { UserRepositoryImpl } from "./data/UserRepositoryImpl";
import { UserRepository } from "./domain/UserRepository";
import jwt from "jsonwebtoken";

export class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  public signUp = async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    const newUser: User = { email, name, password };

    const databaseUser = await this.userRepository.getUserByEmail(email);

    if (databaseUser) {
      return response
        .status(409)
        .json({ error: "A user with this email address already exists" });
    }

    const result = await this.userRepository.createUser(newUser);

    return response.status(200).json(result);
  };

  public signIn = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const user = await this.userRepository.find({ email, password });
    if (!user) {
      return response.status(401).json({ error: "Invalid email or password" });
    }

    user.token = this.generateToken(user);
    return response.json(user);
  };

  private generateToken(user: User) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY || "";
    return jwt.sign(user, jwtSecretKey);
  }
}
