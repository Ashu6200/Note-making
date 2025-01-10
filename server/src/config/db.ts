import mongoose from "mongoose";
import config from "./config";
const db = async () => {
    try {
        if (!config.DATABASEURL) {
            throw new Error('MONGODB_URL is not defined in the environment variables.')
        }
        const connectionInstance = await mongoose.connect(config.DATABASEURL);
        console.log(
            `\n  MongoDB Connected! Db host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
};
export default db