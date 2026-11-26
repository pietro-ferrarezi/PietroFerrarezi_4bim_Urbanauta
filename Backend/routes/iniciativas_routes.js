import { Router } from "express";
const router = Router();

import iniciativasController from "../controllers/iniciativas_controller.js";

router.get("/:id", async (req, res) => {
  await iniciativasController.buscarIniciativa(req, res)
})
router.post("/:id/participar", async (req, res) => {
  await iniciativasController.participar(req, res);
});

export default router;
