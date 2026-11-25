
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

const buscarPeticao = async (req, res) => {
    const id = Number(req.params.id);
    const userId = req.session.userId ?? null;

    if (!/^\d+$/.test(req.params.id) ||
        !Number.isInteger(id) || id <= 0 || id > 2147483647) {
        return res.status(400).json({
            message: "ID inválido"
        });
    }

    res.set("Cache-Control", "private, no-store");

    try {
        const peticao = await pool.query(`
            SELECT
                P.id_peticao,
                P.titulo,
                P.lead,
                P.descricao,
                P.meta_assinatura,
                P.data_criacao,
                P.id_colaborador_criador,
                U.nome AS criador,
                COUNT(A.id_voluntario)::INT AS qtd_assinaturas,
                EXISTS (
                    SELECT 1
                    FROM Assinatura AS ASI
                    JOIN Voluntario AS VOL
                        ON ASI.id_voluntario = VOL.id_voluntario
                    WHERE ASI.id_peticao = P.id_peticao
                        AND VOL.id_usuario = $2
                ) AS ja_assinou
            FROM Peticao P
            JOIN Colaborador CO
                ON P.id_colaborador_criador = CO.id_colaborador
            JOIN Voluntario V
                ON CO.id_voluntario = V.id_voluntario
            JOIN Usuario U
                ON V.id_usuario = U.id_usuario
            LEFT JOIN Assinatura A
                ON P.id_peticao = A.id_peticao
            WHERE P.id_peticao = $1
            GROUP BY P.id_peticao, U.nome
        `, [id, userId]);

        if (peticao.rows.length === 0) {
            return res.status(404).json({
                message: "Petição não encontrada"
            });
        }

        return res.status(200).json({
            peticao: peticao.rows[0]
        });

    } catch (err) {
        console.error(err.message);

        return res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
};

const assinarPeticao = async (req, res) => {
    const userId = req.session.userId;
    const id = Number(req.params.id);

    if (!userId) {
        return res.status(401).json({
            message: "Usuário não logado"
        });
    }

    if (!/^\d+$/.test(req.params.id) ||
        !Number.isInteger(id) || id <= 0 || id > 2147483647) {
        return res.status(400).json({
            message: "ID inválido"
        });
    }

    try {
        // Buscar o voluntário
        const voluntario = await pool.query(`
            SELECT id_voluntario
            FROM Voluntario
            WHERE id_usuario = $1
        `, [userId]);

        if (voluntario.rows.length === 0) {
            return res.status(403).json({
                message: "Voluntário não encontrado"
            });
        }

        // Verificar se a petição existe
        const peticao = await pool.query(`
            SELECT id_peticao
            FROM Peticao
            WHERE id_peticao = $1
        `, [id]);

        if (peticao.rows.length === 0) {
            return res.status(404).json({
                message: "Petição não encontrada"
            });
        }

        // Registrar assinatura
        const assinatura = await pool.query(`
            INSERT INTO Assinatura
                (id_voluntario, id_peticao, data)
            VALUES ($1, $2, NOW())
            ON CONFLICT (id_voluntario, id_peticao)
                DO NOTHING
            RETURNING id_voluntario, id_peticao, data
        `, [voluntario.rows[0].id_voluntario, id]);

        if (assinatura.rows.length === 0) {
            return res.status(409).json({
                message: "Você já assinou esta petição"
            });
        }

        return res.status(201).json({
            message: "Petição assinada com sucesso!",
            assinatura: assinatura.rows[0],
            ja_assinou: true
        });

    } catch (err) {
        console.error(err.message);

        if (err.code === "23503") {
            return res.status(409).json({
                message: "Petição ou voluntário não está mais disponível"
            });
        }

        return res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
};

export default {listarPeticoes, peticoesEmDestaque, buscarPeticao, assinarPeticao}