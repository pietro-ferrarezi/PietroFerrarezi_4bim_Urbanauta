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

const buscarProjeto = async (req, res) => {
    const userId = req.session.userId ?? null;
    const id = Number(req.params.id);

    if (!/^\d+$/.test(req.params.id) ||
        !Number.isInteger(id) || id <= 0 || id > 2147483647) {
        return res.status(400).json({
            message: "ID inválido"
        });
    }

    try {
        const projeto = await pool.query(`
            SELECT
                P.id_projeto,
                P.titulo,
                P.lead,
                P.descricao,
                C.nome AS categoria,
                EA.nome AS estado,
                P.id_colaborador_criador,
                U.nome AS criador
            FROM Projeto P
            JOIN Categoria C
                ON P.id_categoria = C.id_categoria
            JOIN Estado_Atividade EA
                ON P.id_estado = EA.id_estado_ativ
            JOIN Colaborador CO
                ON P.id_colaborador_criador = CO.id_colaborador
            JOIN Voluntario V
                ON CO.id_voluntario = V.id_voluntario
            JOIN Usuario U
                ON V.id_usuario = U.id_usuario
            WHERE P.id_projeto = $1
        `, [id]);

        if (projeto.rows.length === 0) {
            return res.status(404).json({
                message: "Projeto não encontrado"
            });
        }

        const iniciativas = await pool.query(`
            SELECT
                I.id_iniciativa,
                I.titulo,
                I.descricao,
                I.localizacao,
                I.data_inicio,
                I.data_fim,
                I.vagas,
                EA.nome AS estado,

                EXISTS (
                    SELECT 1
                    FROM Manifestacao_Interesse MI
                    JOIN Voluntario V
                        ON MI.id_voluntario = V.id_voluntario
                    WHERE MI.id_iniciativa = I.id_iniciativa
                        AND V.id_usuario = $2
                ) AS ja_manifestou

            FROM Iniciativa I
            JOIN Estado_Atividade EA
                ON I.id_estado = EA.id_estado_ativ
            WHERE I.id_projeto = $1
            ORDER BY I.data_inicio, I.id_iniciativa
            `, [id, userId]);

        return res.status(200).json({
            projeto: projeto.rows[0],
            iniciativas: iniciativas.rows
        });

    } catch (err) {
        console.error(err.message);

        return res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
};

export default { listarProjetos, projetosEmDestaque, buscarProjeto };
