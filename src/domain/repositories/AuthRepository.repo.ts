import { User } from "../entities/User.entity";

export interface AuthRepository {
  createUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
