import { Db, Filter, MongoClient } from "mongodb";
import { User } from "../../entities/User";
import { UserRepository } from "../domain/UserRepository";

export class UserRepositoryImpl implements UserRepository {
  private client: MongoClient;
  private db: Db;

  constructor(uri: string) {
    this.client = new MongoClient(uri);
    this.db = this.client.db("socialapp");
  }

  public async find(filter: Filter<User>): Promise<User | null> {
    return await this.getUsersCollection().findOne<User>(filter);
  }

  public async getUserByEmail(email?: String): Promise<User | null> {
    if (!email) return null;
    return await this.getUsersCollection().findOne<User>({ email });
  }

  public async createUser(user: User): Promise<User | null> {
    let result = await this.getUsersCollection().insertOne(user);
    user.id = result.insertedId.toString();
    return user;
  }

  private getUsersCollection = () => {
    return this.db.collection<User>("users");
  }
}
