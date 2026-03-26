import { Router } from "express";
import pool from "../db/database.js";
import healpers from "../lib/helpers.js";
import passport from "passport";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/formulario.html");
}

router.post("/formulario", async (req, res, next) => {
  try {
    const { name, mail, password, modality } = req.body;

    if (!name || !mail || !password || !modality) {
      return res.json({
        success: false,
        message: "Todos los campos son obligatorios"
      });
    }

    // 1. Revisar si el usuario ya existe
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE mail = ?",
      [mail]
    );

    if (existing.length > 0) {
      const user = existing[0];

      // Validar contraseña
      const validPassword = await healpers.matchPassword(password, user.password);

      if (!validPassword) {
        return res.json({
          success: false,
          message: "La contraseña no coincide con la cuenta existente"
        });
      }

      // LOGIN AUTOMÁTICO
      req.login(user, (err) => {
        if (err) return next(err);

        return res.json({
          success: true,
          message: "Inicio de sesión exitoso",
          redirect: "/perfil"
        });
      });

      return;
    }

    // 2. Si no existe → registrar
    const newUser = {
      name,
      mail,
      password: await healpers.encryptPassword(password),
      modality
    };

    const [result] = await pool.query("INSERT INTO users SET ?", [newUser]);

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id_users = ?",
      [result.insertId]
    );

    const user = rows[0];

    // LOGIN AUTOMÁTICO DESPUÉS DE REGISTRAR
    req.login(user, (err) => {
      if (err) return next(err);

      return res.json({
        success: true,
        message: "Usuario registrado correctamente",
        redirect: "/perfil"
      });
    });

  } catch (error) {
    console.error("ERROR EN POST /formulario:", error);

    return res.status(500).json({
      success: false,
      message: "Error interno en el servidor"
    });
  }
});

router.get("/perfil", isLoggedIn, (req, res) => {
  res.render("perfil", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.json({
        success: true,
        redirect: "/"
      });
    });
  });
});

export default router;