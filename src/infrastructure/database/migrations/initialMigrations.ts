import pool from "../databaseConfig";

async function initMigrations(): Promise<void> {
  try {
    console.log("Running Initial Migrations...");

    // TABLES
    // USER TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    // PROJECT TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS project (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(255) NOT NULL, deadline DATE ,project_logo VARCHAR(255), est_deadline DATE, start_date DATE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    // TASK TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS task (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, status VARCHAR(255) NOT NULL CHECK (status IN ('open', 'close', 'conflict')), deadline DATE, comments VARCHAR(1000), project_id INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE);`
    );

    // JUNCTION TABLES (ONLY CREATE MANY TO MANY TABLES, (otherwise add a FK field in the tables))

    // PROJECT TEAM - JUNCTION TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS project_team (id SERIAL PRIMARY KEY, project_id INT NOT NULL, user_id INT NOT NULL, FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`
    );

    // TASK ASSIGNMENT - JUNCTION TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS task_assignment (id SERIAL PRIMARY KEY, task_id INT NOT NULL, user_id INT NOT NULL, FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`
    );

    console.log("Initial Migrations applied successfully");
  } catch (err) {
    throw new Error(`Error applying Migrations: ${err}`)
  }
}

export default initMigrations;
