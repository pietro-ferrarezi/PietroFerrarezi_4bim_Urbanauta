import dotenv from "dotenv"
dotenv.config()
import {Pool} from "pg"

export const pool = new Pool(
    {
        host: process.env.DB_HOST,
        port: process.env.DB_ṔORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
)