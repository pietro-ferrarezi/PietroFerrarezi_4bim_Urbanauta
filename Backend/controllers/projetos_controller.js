import {pool} from "../database.js"

const listarProjetos = async (req, res) => {
    try {
        const projetos = await pool.query("SELECT P.ID_PROJETO, P.titulo, P.descricao, C.nome AS categoria, EA.nome AS estado, ID_COLABORADOR_CRIADOR FROM Projeto P JOIN Categoria C ON P.ID_CATEGORIA = C.ID_CATEGORIA JOIN Estado_Atividade EA ON P.ID_ESTADO = EA.ID_ESTADO_ATIV")
        res.json(projetos.rows)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

export default {listarProjetos}