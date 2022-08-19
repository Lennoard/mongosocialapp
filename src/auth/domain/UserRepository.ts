import { Filter } from "mongodb";
import { User } from "../../entities/User";

export interface UserRepository {
  find(filter: Filter<User>): Promise<User | null>;
  getUserByEmail(email: String): Promise<User | null>;
  createUser(user: User): Promise<User | null>;
}
