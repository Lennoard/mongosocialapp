import { Request, Response } from "express";
import path from "path";

import { Collection, Db, MongoClient } from "mongodb";
import { User } from "../../domain/models/User";

export class AuthController {
  private client: MongoClient;
  private db: Db;
  private usersCollection: Collection<User>;

  constructor() {
    const uri = "mongodb://localhost:27017";
    this.client = new MongoClient(uri);
    this.db = this.client.db("socialapp");
    this.usersCollection = this.db.collection<User>("users");
  }

  public signUp = async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    const newUser: User = { email, name, password };

    const databaseUser = await this.usersCollection.findOne<User>({ email });

    if (databaseUser) {
      return response
        .status(409)
        .json({ error: "A user with this email address already exists" });
    }

    const result = await this.usersCollection.insertOne(newUser);

    return response.status(200).json(result);
  };

  public signIn = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const databaseUser = await this.usersCollection.findOne<User>({
      email,
      password,
    });

    if (!databaseUser) {
      return response.status(401).json({ error: "Invalid email or password" });
    }

    return response.json(databaseUser);
  };
}
