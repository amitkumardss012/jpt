import dotenv from "dotenv";

dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
    dbName: process.env.DATABASE_Name,
    FRONTEND_URL: process.env.FRONTEND_URL,
    FRONTEND_URL1: process.env.FRONTEND_URL1,
}

export default ENV;