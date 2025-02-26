import { ConsoleUtil } from "../../../shared/utils/Console";
import pool from "../databaseConfig"
import { EXPECTED_TABLE_LIST } from "./TABLE_LIST";

export const verifyMigrations = async (): Promise<void> => {
    const migrationsList = await pool.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );

    // Extract current tables
    const existingTables: string[] = migrationsList.rows.map((table: any) => {
        return table?.table_name
    })

    // check for missing tables
    const missingTables = EXPECTED_TABLE_LIST.filter((table: string) => {
        return !existingTables.includes(table)
    })

    // thow error message for missing tables
    if (missingTables.length > 0) {
        throw new Error(`Migrations may not be successful! Missing tables: ${missingTables.join(", ")}`)
    }
    else {
        console.log(new ConsoleUtil().successLog("Initial Migrations verified successfully"))
    }
}