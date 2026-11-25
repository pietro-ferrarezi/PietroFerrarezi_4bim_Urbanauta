
import {pool} from "../database.js"

const listarPeticoes = async (req, res) => {
    try {
        const peticoes = await pool.query(`
            SELECT
                P.ID_PETICAO,
                P.titulo,
                P.lead,
                P.descricao,
                P.meta_assinatura,
                P.data_criacao,
                P.ID_COLABORADOR_CRIADOR,
                COUNT(A.ID_VOLUNTARIO)::INT AS qtd_assinaturas
            FROM Peticao P
            LEFT JOIN Assinatura A
                ON P.ID_PETICAO = A.ID_PETICAO
            GROUP BY P.ID_PETICAO
            ORDER BY P.data_criacao DESC
        `)

        return res.status(200).json({ peticoes: peticoes.rows })
    } catch(err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Erro interno do servidor"
        })
    }
}

const peticoesEmDestaque = async (req, res) => {
    try {
        const peticoes = await pool.query(`
            SELECT
                P.ID_PETICAO,
                P.titulo,
                P.lead,
                P.descricao,
                P.meta_assinatura,
                P.data_criacao,
                P.ID_COLABORADOR_CRIADOR,
                COUNT(A.ID_VOLUNTARIO)::INT AS qtd_assinaturas
            FROM Peticao P
            LEFT JOIN Assinatura A
                ON P.ID_PETICAO = A.ID_PETICAO
            GROUP BY P.ID_PETICAO
            ORDER BY RANDOM()
            LIMIT 4
        `)

        return res.status(200).json({ peticoes: peticoes.rows })
    } catch(err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Erro interno do servidor"
        })
    }
}

export default {listarPeticoes, peticoesEmDestaque}