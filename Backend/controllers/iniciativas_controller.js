import { pool } from "../database.js";

const participar = async (req, res) => {
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
        // Buscar o voluntário vinculado ao usuário
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

        // Verificar a existência da iniciativa
        const iniciativa = await pool.query(`
            SELECT id_estado
            FROM Iniciativa
            WHERE id_iniciativa = $1
        `, [id]);

        if (iniciativa.rows.length === 0) {
            return res.status(404).json({
                message: "Iniciativa não encontrada"
            });
        }

        // Verificar se a iniciativa aceita manifestações
        if (![1, 2].includes(iniciativa.rows[0].id_estado)) {
            return res.status(409).json({
                message: "Iniciativa indisponível para participação"
            });
        }

        // Registrar manifestação de interesse como pendente
        const manifestacao = await pool.query(`
            INSERT INTO Manifestacao_Interesse
                (data, id_voluntario, id_iniciativa, id_estado)
            SELECT NOW(), $1, I.id_iniciativa, 1
            FROM Iniciativa I
            WHERE I.id_iniciativa = $2
                AND I.id_estado IN (1, 2)
            ON CONFLICT (id_voluntario, id_iniciativa)
                DO NOTHING
            RETURNING id_manifestacao, data,
                id_voluntario, id_iniciativa, id_estado
        `, [voluntario.rows[0].id_voluntario, id]);

        if (manifestacao.rows.length === 0) {
            return res.status(409).json({
                message: "Já existe uma manifestação para esta iniciativa ou ela não está mais disponível"
            });
        }

        return res.status(201).json({
            message: "Manifestação de interesse registrada com sucesso!",
            manifestacao: manifestacao.rows[0]
        });

    } catch (err) {
        console.error(err.message);

        return res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
};

export default { participar };