import app from "./app";
import config from "./config/config";
import db from "./config/db";

const server = async () => {
    await db();
    app.listen(config.PORT, () => {
        console.log(`Server is listening on port ${config.PORT}`);
    });
};

server();
