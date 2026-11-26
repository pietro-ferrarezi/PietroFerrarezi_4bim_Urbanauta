import { Router } from "express";
const router = Router();

import projetosController from "../controllers/projetos_controller.js";

router.get("/", (req, res) => {
  projetosController.listarProjetos(req, res);
});
router.get("/destaques", (req, res) => {
  projetosController.projetosEmDestaque(req, res);
});
router.get("/:id", (req, res) => {
  projetosController.buscarProjeto(req, res);
});

export default router;
