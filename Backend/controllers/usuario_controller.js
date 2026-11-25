import session from "express-session";
import pgSession from "connect-pg-simple";
const PostgreSQLStore = pgSession(session);
import bcrypt from "bcrypt";
import { pool } from "../database.js";

const auth = async (req, res) => {
  const { email, pass } = req.body;

  if (
    typeof email !== "string" ||
    typeof pass !== "string" ||
    !email.trim() ||
    !pass
  ) {
    return res.status(400).json({
      message: "Email e senha são obrigatórios",
    });
  }

  try {
    const result = await pool.query("SELECT * FROM Usuario WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const validPass = await bcrypt.compare(pass, user.senha);

    if (!validPass) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao criar sessão",
        });
      }

      req.session.userId = user.id_usuario;

      req.session.save((err) => {
        if (err) {
          return res.status(500).json({
            message: "Erro ao salvar sessão",
          });
        }

        return res.status(200).json({
          message: "Login realizado com sucesso",
          user: {
            id: user.id_usuario,
            nome: user.nome,
            email: user.email,
          },
        });
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao sair",
      });
    }

    res.clearCookie("connect.sid");

    return res.json({
      message: "Logout realizado",
    });
  });
};

const me = async (req, res) => {
  const userID = req.session.userId
  try {
    if (!userID) {
      return res.status(401).json({ message: "Usuário não logado" });
    }

    const result = await pool.query(
      `SELECT
        u.ID_USUARIO AS id,
        u.nome,
        u.email,

        EXISTS (
            SELECT 1
            FROM Colaborador c
            WHERE c.ID_VOLUNTARIO = v.ID_VOLUNTARIO
        ) AS colaborador,

        EXISTS (
            SELECT 1
            FROM Administrador a
            WHERE a.ID_VOLUNTARIO = v.ID_VOLUNTARIO
        ) AS administrador

      FROM Usuario u
      INNER JOIN Voluntario v
        ON v.ID_USUARIO = u.ID_USUARIO

      WHERE u.ID_USUARIO = $1;`,
      [userID],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const usuario = result.rows[0];

    return res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        colaborador: usuario.colaborador,
        administrador: usuario.administrador
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const cadastrarVoluntario = async (req, res) => {
  const { nome, email, pass } = req.body;

  // Validar os dados recebidos
  if (
    typeof nome !== "string" ||
    typeof email !== "string" ||
    typeof pass !== "string" ||
    !nome.trim() ||
    !email.trim() ||
    pass.length < 8
  ) {
    return res.status(400).json({
      message: "Dados inválidos. A senha deve ter pelo menos 8 caracteres.",
    });
  }

  const nomeFormatado = nome.trim();
  const emailFormatado = email.trim().toLowerCase();

  const client = await pool.connect();

  try {
    // Iniciar transação
    await client.query("BEGIN");

    // Gerar hash da senha
    const senhaHash = await bcrypt.hash(pass, 12);

    // Inserir usuário
    const usuario = await client.query(
      `INSERT INTO Usuario (nome, email, senha)
             VALUES ($1, $2, $3)
             RETURNING ID_USUARIO, nome, email`,
      [nomeFormatado, emailFormatado, senhaHash],
    );

    const novoUsuario = usuario.rows[0];

    // Inserir voluntário vinculado ao usuário
    const voluntario = await client.query(
      `INSERT INTO Voluntario (ID_USUARIO)
             VALUES ($1)
             RETURNING ID_VOLUNTARIO`,
      [novoUsuario.id_usuario],
    );

    // Confirmar as duas inserções
    await client.query("COMMIT");

    req.session.regenerate((err) => {
      if (err) {
        console.error("Erro ao criar sessão:", err);

        return res.status(500).json({
          message: "Cadastro realizado, mas houve um erro ao iniciar sessão",
        });
      }

      req.session.userId = novoUsuario.id_usuario;

      req.session.save((err) => {
        if (err) {
          console.error("Erro ao salvar sessão:", err);

          return res.status(500).json({
            message: "Cadastro realizado, mas houve um erro ao iniciar sessão",
          });
        }

        return res.status(201).json({
          message: "Cadastro realizado com sucesso!",
          user: {
            id: novoUsuario.id_usuario,
            nome: novoUsuario.nome,
            email: novoUsuario.email,
          },
          id_voluntario: voluntario.rows[0].id_voluntario,
        });
      });
    });
  } catch (err) {
    await client.query("ROLLBACK");

    console.error("Erro ao cadastrar voluntário:", err);

    // Violação de restrição UNIQUE do PostgreSQL
    if (err.code === "23505") {
      return res.status(409).json({
        message: "Email já cadastrado",
      });
    }

    return res.status(500).json({
      message: "Erro interno ao cadastrar voluntário",
    });
  } finally {
    client.release();
  }
};

export default { auth, logout, me, cadastrarVoluntario };
