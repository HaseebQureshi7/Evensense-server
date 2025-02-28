import pool from "../../infrastructure/database/databaseConfig";

// Generic utility class for database operations
export class HelperMethods {
    static async create(tableName: string, data: Record<string, any>) {
        const keys = Object.keys(data).join(", ");
        const values = Object.values(data);
        const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
        const result = await pool.query(
            `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
            values
        );
        return result.rows[0];
    }

    static async delete(tableName: string, id: number) {
        await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
    }
}