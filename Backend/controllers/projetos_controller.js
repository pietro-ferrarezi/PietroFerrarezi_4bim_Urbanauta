import { pool } from "../database.js";

const listarProjetos = async (req, res) => {
  try {
    const projetos = await pool.query(
      "SELECT P.ID_PROJETO, P.titulo, P.lead, P.descricao, C.nome AS categoria, EA.nome AS estado, ID_COLABORADOR_CRIADOR FROM Projeto P JOIN Categoria C ON P.ID_CATEGORIA = C.ID_CATEGORIA JOIN Estado_Atividade EA ON P.ID_ESTADO = EA.ID_ESTADO_ATIV",
    );
    res.status(200).json({ projetos: projetos.rows });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const projetosEmDestaque = async (req, res) => {
  try {
    const projetos = await pool.query(`
            SELECT 
                P.ID_PROJETO,
                P.titulo,
                P.lead,
                P.descricao,
                C.nome AS categoria,
                EA.nome AS estado,
                P.ID_COLABORADOR_CRIADOR
            FROM Projeto P
            JOIN Categoria C
                ON P.ID_CATEGORIA = C.ID_CATEGORIA
            JOIN Estado_Atividade EA
                ON P.ID_ESTADO = EA.ID_ESTADO_ATIV
            WHERE P.ID_ESTADO <> 3
            ORDER BY RANDOM()
            LIMIT 4
        `);

    return res.status(200).json({ projetos: projetos.rows });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default { listarProjetos, projetosEmDestaque };
