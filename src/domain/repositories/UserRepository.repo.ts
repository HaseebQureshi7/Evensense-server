import { User } from "../entities/User.entity";

export interface UserRepository {
  findUser(uid: number): Promise<User | undefined>
  updateUser(uid: number, updatedUser: Partial<User>): Promise<User>;
  deleteUser(uid: number): Promise<User>;
}
