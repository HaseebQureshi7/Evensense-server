import { User } from "../../domain/entities/User.entity";
import { AuthRepository } from "../../domain/repositories/AuthRepository.repo";
import { PasswordService } from "../../shared/services/PasswordService";
import pool from "../database/databaseConfig";

export class AuthRepositoryImpl implements AuthRepository {
  async createUser(user: User): Promise<User> {
    const hashedPassword = await PasswordService.hashPassword(user.password as string)

    const res = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at`,
      [user.name, user.email, hashedPassword]
    );

    const { id, name, email, created_at } = res.rows[0];

    return User.create({name, email, id, created_at});
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (res.rows.length == 0) {
      return null;
    }

    const { id, name, created_at, password } = res.rows[0];

    return User.create({name, email, password, id, created_at});
  }
}
