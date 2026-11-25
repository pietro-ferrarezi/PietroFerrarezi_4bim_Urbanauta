import {Router} from "express"
const router = Router()

import peticoesController from "../controllers/peticoes_controller.js"

router.get("/", (req, res) => {
    peticoesController.listarPeticoes(req, res)
})
router.get("/destaques", (req, res) => {
    peticoesController.peticoesEmDestaque(req, res)
})

export default router