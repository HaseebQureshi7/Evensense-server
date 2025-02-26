import initMigrations from "./initialMigrations";
import { verifyMigrations } from "./verifyMigrations";

const runInitMigrations = async () => {
    try {
        await initMigrations()
        await verifyMigrations()
    } catch (err) {
        throw new Error(err as string)
    }
};

export default runInitMigrations;
