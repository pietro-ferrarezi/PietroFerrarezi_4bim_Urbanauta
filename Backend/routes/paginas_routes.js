import {Router} from "express"
const router = Router()
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authMiddleware  from "../Middleware/auth.js"

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "Frontend", "paginas", "Home", "index.html"))
})

router.get("/login", (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "..", "Frontend", "paginas", "Auth", "login.html"))
})
router.get("/cadastrar", (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "..", "Frontend", "paginas" ,"Auth", "cadastro.html"))
})

router.get("/gerenciamento", authMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "..", "Frontend", "paginas" ,"AreaColaborador", "colaborador.html"))
})

export default router