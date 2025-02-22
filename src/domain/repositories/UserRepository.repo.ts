import { User } from "../entities/User.entity";

export interface UserRepository {
  updateUser(uid: number, updatedUser: Partial<User>): Promise<User>;
  deleteUser(uid: number): Promise<User>;
}
