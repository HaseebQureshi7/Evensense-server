import { ProjectRepository } from "../../domain/repositories/ProjectRepository.repo";
import { Project } from "../../domain/entities/Project.entity";
import pool from "../database/databaseConfig";

export class ProjectRepositoryImpl implements ProjectRepository {
  async create(project: Project): Promise<Project> {
    const {
      name,
      description,
      deadline,
      user_id,
      est_deadline,
      project_logo,
      start_date,
    }: Project = project;

    const result = await pool.query(
      `INSERT INTO project (name, description, deadline, user_id, project_logo, est_deadline, start_date) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [
        name,
        description,
        deadline,
        user_id,
        project_logo,
        est_deadline,
        start_date,
      ]
    );

    return result.rows[0];
  }

  async getAll(): Promise<Project[]> {
    const result = await pool.query(`SELECT * FROM project`);
    console.log(result.rows);
    return result.rows;
  }

  async getById(pid: number): Promise<Project> {
    const result = await pool.query(`SELECT * FROM project WHERE id = ${pid};`);
    return result.rows[0];
  }

  async update(pid: number, updatedData: Partial<Project>): Promise<Project> {
    // Extract keys and values from provided data
    const fields = Object.keys(updatedData);
    const values = Object.values(updatedData);

    // If no fields are provided, return an error or do nothing
    if (fields.length === 0) {
      throw new Error("No fields provided for update.");
    }

    // Generate SQL SET clause dynamically: "field1 = $1, field2 = $2, ..."
    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    // Execute the update query
    const result = await pool.query(
      `UPDATE project SET ${setClause} WHERE id = $${
        fields.length + 1
      } RETURNING *;`,
      [...values, pid] // Spread values first, then add `pid`
    );

    return result.rows[0];
  }

  async delete(pid: number): Promise<Project> {
    const result = await pool.query(
      `DELETE FROM project WHERE id = ${pid} RETURNING *;`
    );
    return result.rows[0];
  }

  async getUserProjects(uid: number): Promise<Project[] | []> {
    const res = await pool.query(`SELECT * FROM project WHERE user_id = $1`, [
      uid,
    ]);
    return res.rows;
  }
}
