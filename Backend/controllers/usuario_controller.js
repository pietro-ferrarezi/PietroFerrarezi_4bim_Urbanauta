import session from "express-session"
import pgSession from "connect-pg-simple"
const PostgreSQLStore = pgSession(session);
import bcrypt from "bcrypt"
import { pool } from "../database.js"
import { resolve } from "dns";
import { log } from "console";

const auth = async (req, res) => {
    const { email, pass } = req.body

    try {
        const result = await pool.query("SELECT * FROM Usuario WHERE email = $1", [email])

        const user = result.rows[0]

        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas" })
        }

        const validPass = await bcrypt.compare(
            pass,
            user.senha
        )

        if (!validPass) {
            return res.status(401).json({ message: "Credenciais inválidas" })
        }

        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao criar sessão"
                })
            }

            req.session.userID = user.id_usuario

            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Erro ao salvar sessão"
                    })
                }

                return res.status(200).json({
                    message: "Login realizado com sucesso",
                    user: {
                        id: user.id_usuario,
                        nome: user.nome,
                        email: user.email
                    }
                })
            })
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: err.message })
    }
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao sair"
            });
        }

        res.clearCookie("connect.sid");

        return res.json({
            message: "Logout realizado"
        });
    });
}

export default [auth, logout]