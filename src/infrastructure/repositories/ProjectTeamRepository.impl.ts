import { CreateProjectTeamDTO } from "../../application/dtos/project_team/createProjectTeam.dto";
import { UpdateProjectTeamDTO } from "../../application/dtos/project_team/updateProjectTeam.dto";
import { Project } from "../../domain/entities/Project.entity";
import { ProjectTeam } from "../../domain/entities/ProjectTeam.entity";
import { User } from "../../domain/entities/User.entity";
import { ProjectTeamRepository } from "../../domain/repositories/ProjectTeam.repo";
import pool from "../database/databaseConfig";

export class ProjectTeamRepositoryImpl implements ProjectTeamRepository {
  async create(newPTData: CreateProjectTeamDTO): Promise<ProjectTeam> {
    const { project_id, user_id } = newPTData;

    const res = await pool.query(
      `INSERT INTO project_team (project_id, user_id) VALUES($1, $2) RETURNING *`,
      [project_id, user_id]
    );

    return res.rows[0];
  }

  async update(
    pt_id: number,
    updatedPTData: UpdateProjectTeamDTO
  ): Promise<ProjectTeam> {
    const { project_id, user_id } = updatedPTData;

    const res = await pool.query(
      `UPDATE project_team SET project_id = $1, user_id = $2 WHERE id = $3 RETURNING *`,
      [project_id, user_id, pt_id]
    );

    return res.rows[0];
  }

  async delete(pt_id: number): Promise<ProjectTeam> {
    const res = await pool.query(
      `DELETE FROM project_team WHERE id = $1 RETURNING *`,
      [pt_id]
    );

    return res.rows[0];
  }

  async getProjectTeam(project_id: number): Promise<User[]> {
    const res = await pool.query(
      `SELECT u.* from project_team pt JOIN users u ON pt.user_id = u.id WHERE pt.project_id = $1`,
      [project_id]
    );

    return res.rows;
  }

  async getUserProjects(user_id: number): Promise<Project[]> {
    const res = await pool.query(
      `SELECT p.* from project_team pt JOIN project p ON pt.project_id = p.id WHERE pt.user_id = $1`,
      [user_id]
    );

    return res.rows;
  }
}
