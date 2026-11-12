import express from "express"
import dotenv from "dotenv"
dotenv.config()
import {pool} from "./database.js"

import cors from "cors"
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

import paginasRoutes from "./routes/paginas_routes.js";
import projetosRoutes from "./routes/projetos_routes.js";
import atividadesRoutes from "./routes/atividades_routes.js";
import peticoesRoutes from "./routes/peticoes_routes.js";
import usuariosRoutes from "./routes/usuarios_routes.js";

app.use("/", paginasRoutes);
app.use("/projetos", projetosRoutes);
app.use("/atividades", atividadesRoutes);
app.use("/peticoes", peticoesRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(process.env.PORT || 3030, async () => {
    try {
        await pool.query("SELECT NOW()")
        console.log("Database successfully connected!")
    } catch(err) {
        console.log(err.message)
    }
    console.log("Server Running!")
})