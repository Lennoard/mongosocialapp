import { Request, Response } from "express";
import { User } from "../../entities/User";
import { UserRepositoryImpl } from "../data/UserRepositoryImpl";
import { UserRepository } from "../domain/UserRepository";

export class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryImpl("mongodb://localhost:27017");
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

    const databaseUser = await this.userRepository.find({ email, password });
    if (!databaseUser) {
      return response.status(401).json({ error: "Invalid email or password" });
    }

    return response.json(databaseUser);
  };
}
