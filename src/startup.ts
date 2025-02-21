import checkDbConnection from "./infrastructure/database/checkDatabaseConnection";
import runInitMigrations from "./infrastructure/database/migrations";
import { ConsoleUtil } from "./shared/utils/Console";

async function startup() {
  const consoleUtil = new ConsoleUtil();

  console.log(consoleUtil.infoLog(`<~> Running startup tasks...`));
  const startTime = performance.now(); // Start the timer manually

  try {
    // Check database connection once at startup
    await checkDbConnection();
    // Run initial migrations for db
    await runInitMigrations();

    // Calculate elapsed time
    const elapsedTime = performance.now() - startTime;
    console.info(
      consoleUtil.successLog(`</>All startup tasks executed successfully in ${elapsedTime.toFixed(2)}ms`)
    );
  } catch (err) {
    console.error("<!> Error during startup tasks:", err);
  }
}

export default startup;
