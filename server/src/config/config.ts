import dotenv from "dotenv";
dotenv.config();

const config = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASEURL: process.env.MONGODB_URL,
    EMAILUSER: process.env.EMAIL_USER,
    EMAILPASS: process.env.EMAIL_PASSWORD,
    JWT: process.env.JWT_SECRET
}


export default config;
