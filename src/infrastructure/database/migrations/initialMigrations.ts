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

    // DOCUMENT TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS document (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, doc_url VARCHAR(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    // TECHNOLOGY TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS tech (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, used_for VARCHAR(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    // ARCHITECTURE TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS architecture (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, detail VARCHAR(1500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    // LINK TABLE
    await pool.query(
      `CREATE TABLE IF NOT EXISTS link (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, url VARCHAR(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
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
    console.error("Error applying Migrations! ", err);
    return;
  }
}

export default initMigrations;
