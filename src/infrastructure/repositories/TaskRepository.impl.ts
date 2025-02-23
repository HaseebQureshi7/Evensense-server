import { TaskRepository } from "../../domain/repositories/TaskRepository.repo";
import { Task } from "../../domain/entities/Task.entity";
import pool from "../database/databaseConfig";

export class TaskRepositoryImpl implements TaskRepository {
  async create(task: Task): Promise<Task> {
    const { name, status, deadline, comments, project_id } = task;

    const result = await pool.query(
      `INSERT INTO task (name, status, deadline, comments, project_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [name, status, deadline, comments, project_id]
    );

    return result.rows[0];
  }

  async getAll(): Promise<Task[]> {
    const result = await pool.query(`SELECT * FROM task`);
    return result.rows;
  }

  async getById(taskId: number): Promise<Task | null> {
    const result = await pool.query(`SELECT * FROM task WHERE id = $1;`, [taskId]);
    return result.rows.length ? result.rows[0] : null;
  }

  async getByProjectId(projectId: number): Promise<Task[]> {
    const result = await pool.query(`SELECT * FROM task WHERE project_id = $1;`, [projectId]);
    return result.rows;
  }

  async update(taskId: number, updatedData: Partial<Task>): Promise<Task | null> {
    const fields = Object.keys(updatedData);
    const values = Object.values(updatedData);

    if (fields.length === 0) {
      throw new Error("No fields provided for update.");
    }

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const result = await pool.query(
      `UPDATE task SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *;`,
      [...values, taskId]
    );

    return result.rows.length ? result.rows[0] : null;
  }

  async delete(taskId: number): Promise<Task> {
    const result = await pool.query(`DELETE FROM task WHERE id = $1 RETURNING *;`, [taskId]);
    return result.rows.length ? result.rows[0] : null;
  }
}
