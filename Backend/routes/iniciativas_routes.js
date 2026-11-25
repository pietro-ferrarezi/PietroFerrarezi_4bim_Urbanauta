import { Router } from "express";
const router = Router();

import iniciativasController from "../controllers/iniciativas_controller.js";

router.post("/:id/participar", (req, res) => {
    iniciativasController.participar(req, res);
});

export default router;