import { config } from "dotenv";
import { Pool } from "pg";
config()

// const pool = new Pool({
//   connectionString: process.env.PG_CONNECTION_STRING,
//   ssl: { rejectUnauthorized: false },
// });

const { PG_USER, PG_HOST, PG_DATABASE, PG_PORT, PG_PASSWORD, PORT } = process.env;

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  port: PG_PORT as any,
  password: PG_PASSWORD,
  ssl: true 
});

pool.on("connect", () => {
  console.log("</> Database successfully connected");
});

pool.on("error", () => {
  console.log("<!> Database connection error!");
});

export default pool;
