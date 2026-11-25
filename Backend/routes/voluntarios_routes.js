import {Router} from "express"
const router = Router()
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authMiddleware  from "../Middleware/auth.js"

router.get("/", authMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "..", "Frontend", "AreaVoluntario", "voluntario.html"))
})

export default router