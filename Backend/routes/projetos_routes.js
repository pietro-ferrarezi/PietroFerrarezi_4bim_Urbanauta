import Router from "express"
const router = Router()

import projetosController from "../controllers/projetos_controller.js"

router.get("/", (req, res) => {
    projetosController.listarProjetos(req, res)
})

export default router