import {Router} from "express"
const router = Router()

import usuarioController from "../controllers/usuario_controller.js"
import authMiddleware from "../Middleware/auth.js"

router.post("/login", async (req, res) => {
    await usuarioController.auth(req, res)
})

router.post("/logout", async (req, res) => {
    await usuarioController.logout(req, res)
});

router.get("/me", authMiddleware, async (req, res) => {
    await usuarioController.me(req, res)
})

router.post("/cadastro", async (req, res) => {
    await usuarioController.cadastrarVoluntario(req, res)
});


export default router