import pool from "./databaseConfig";

const checkDbConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW();"); // Simple query to verify connection
    console.log("</> Database connection verified at:", res.rows[0].now);
  } catch (err) {
    console.error("<!> Failed to verify database connection: ", err);
  }
};

export default checkDbConnection