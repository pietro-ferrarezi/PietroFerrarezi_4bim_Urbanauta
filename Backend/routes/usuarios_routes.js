import Router from "express"
const router = Router()

import usuarioController from "../controllers/usuario_controller.js"

router.post("/auth", async (req, res) => {
    await usuarioController.auth(req, res)
})

router.post("/logout", async (req, res) => {
    await usuarioController.logout(req, res)
});


export default router