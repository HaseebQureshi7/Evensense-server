import { User } from "../../domain/entities/User.entity";
import { UserRepository } from "../../domain/repositories/UserRepository.repo";
import pool from "../database/databaseConfig";

export class UserRepositoryImpl implements UserRepository {
  async updateUser(uid: number, updatedUser: Partial<User>): Promise<User> {
    const { name, email, password } = updatedUser;
    const res = await pool.query(
      `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`,
      [name, email, password, uid]
    );
    return res.rows[0];
  }

  async deleteUser(uid: number): Promise<User> {
    const res = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [uid]
    );
    return res.rows[0];
  }
}
