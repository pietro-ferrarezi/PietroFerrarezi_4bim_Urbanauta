import express from "express"
import dotenv from "dotenv"
dotenv.config()
import {pool} from "./database.js"
import path from "path"
import { fileURLToPath } from 'url';
import session from "express-session"
import pgSession from "connect-pg-simple"
const PostgreSQLStore = pgSession(session);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cors from "cors"
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, "..", "Frontend", "public")))
app.use(
  session({
    store: new PostgreSQLStore({
      pool,
      tableName: "session",
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60
    }
  })
);

import paginasRoutes from "./routes/paginas_routes.js";
import projetosRoutes from "./routes/projetos_routes.js";
import usuariosRoutes from "./routes/usuarios_routes.js";

app.use("/", paginasRoutes);
app.use("/projetos", projetosRoutes);
app.use("/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3030
app.listen(PORT, async () => {
    try {
        await pool.query("SELECT NOW()")
        console.log("Database successfully connected!")
    } catch(err) {
        console.error(err.message)
    }
    console.log(`Server Running! http://localhost:${PORT}`)
})