import { CreateActivityLogDTO } from "../../application/dtos/activity_log/createActivityLog.dto";
import { UpdateActivityLogDTO } from "../../application/dtos/activity_log/updateActivityLog.dto";
import { ActivityLog } from "../../domain/entities/ActivityLog.entity";
import { ActivityLogRepository } from "../../domain/repositories/ActivityLogRepository.repo";
import pool from "../database/databaseConfig";

export class ActivityLogImpl implements ActivityLogRepository {
  async create(activityLogDetails: CreateActivityLogDTO): Promise<ActivityLog> {
    const res = await pool.query(
      `INSERT INTO activity_log (action, details, user_id, project_id) VALUES($1, $2, $3, $4) RETURNING *`,
      [
        activityLogDetails.action,
        activityLogDetails.details,
        activityLogDetails.user_id,
        activityLogDetails.project_id,
      ]
    );

    return res.rows[0];
  }

  async update(
    al_id: number,
    newALDetails: UpdateActivityLogDTO
  ): Promise<ActivityLog> {
    // Extract fields from `newALDetails` that are not `undefined`
    const fieldsToUpdate = Object.entries(newALDetails)
      .filter(([key, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    // Build the SET clause dynamically
    const setClause = Object.keys(fieldsToUpdate)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Build the values array
    const values = Object.values(fieldsToUpdate);

    // Add `al_id` to the values array for the WHERE clause
    values.push(al_id);

    // Construct the query
    const query = `
      UPDATE activity_log
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    const res = await pool.query(query, values);

    return res.rows[0];
  }

  async delete(al_id: number): Promise<ActivityLog> {
    const res = await pool.query(
      `DELETE FROM activity_log WHERE id = $1 RETURNING *`,
      [al_id]
    );

    return res.rows[0];
  }

  async getAll(): Promise<ActivityLog[]> {
    const res = await pool.query(`SELECT * FROM activity_log`);

    return res.rows;
  }

  async getById(al_id: number): Promise<ActivityLog | null> {
    const res = await pool.query(`SELECT * FROM activity_log WHERE id = $1`, [
      al_id,
    ]);

    return res.rows[0];
  }

  async getByProjectId(pid: number): Promise<ActivityLog[] | []> {
    const res = await pool.query(
      `SELECT * FROM activity_log WHERE project_id = $1`,
      [pid]
    );

    return res.rows;
  }
}
