import { TaskAssignment } from "../../domain/entities/TaskAssignment.entity";
import { TaskAssignmentRepository } from "../../domain/repositories/TaskAssignmentRepository.repo";
import pool from "../database/databaseConfig";

export class TaskAssignmentImpl implements TaskAssignmentRepository {
  async create(task_id: number, user_id: number): Promise<TaskAssignment> {
    const res = await pool.query(
      `INSERT INTO task_assignment (task_id, user_id) VALUES($1, $2) RETURNING *`,
      [task_id, user_id]
    );
    return res.rows[0];
  }

  async getAll(): Promise<TaskAssignment[]> {
    const res = await pool.query(`SELECT * FROM task_assignment`);
    return res.rows;
  }

  async getById(ta_id: number): Promise<TaskAssignment> {
    const res = await pool.query(
      `SELECT * FROM task_assignment WHERE id = $1`,
      [ta_id]
    );
    return res.rows[0];
  }

  async getByUserId(user_id: number): Promise<TaskAssignment[]> {
    const res = await pool.query(
      `SELECT * FROM task_assignment WHERE user_id = $1`,
      [user_id]
    );
    return res.rows;
  }

  async getByProjectId(project_id: number): Promise<TaskAssignment[]> {
    const res = await pool.query(
      `SELECT ta.* FROM task_assignment ta JOIN task t ON ta.task_id = t.id WHERE t.project_id = $1`,
      [project_id]
    );
    return res.rows;
  }

  async update(
    ta_id: number,
    updatedTaskAssignment: Partial<TaskAssignment>
  ): Promise<TaskAssignment> {
    const fields = Object.keys(updatedTaskAssignment);
    const values = Object.values(updatedTaskAssignment);

    if (fields.length === 0) {
      throw new Error("No fields provided for update.");
    }

    // Build the SET clause dynamically
    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const query = `
          UPDATE task_assignment
          SET ${setClause}
          WHERE id = $${fields.length + 1}
          RETURNING *;
        `;

    // Execute the query
    const res = await pool.query(query, [...values, ta_id]);
    console.log(query, [...values, ta_id])
    // Return the updated task assignment
    return res.rows[0];
  }

  async delete(ta_id: number): Promise<TaskAssignment> {
    const res = await pool.query(
      `DELETE FROM task_assignment WHERE id = $1 RETURNING *`,
      [ta_id]
    );
    return res.rows[0];
  }
}
