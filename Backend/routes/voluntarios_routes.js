import { Router } from "express";
const router = Router();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authMiddleware from "../Middleware/auth.js";

router.get("/", authMiddleware, (req, res) => {
  return res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "Frontend",
      "AreaVoluntario",
      "voluntario.html",
    ),
  );
});
router.get("/projetos", authMiddleware, (req, res) => {
  return res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "Frontend",
      "AreaVoluntario",
      "projetos",
      "projetos_cat.html",
    ),
  );
});
router.get("/projetos/:id", authMiddleware, (req, res) => {
  return res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "Frontend",
      "AreaVoluntario",
      "projetos",
      "projeto.html",
    ),
  );
});

router.get("/peticoes", authMiddleware, (req, res) => {
  return res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "Frontend",
      "AreaVoluntario",
      "peticoes",
      "peticoes_cat.html",
    ),
  );
});
router.get("/peticoes/:id", authMiddleware, (req, res) => {
  return res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "Frontend",
      "AreaVoluntario",
      "peticoes",
      "peticao.html",
    ),
  );
});

export default router;
