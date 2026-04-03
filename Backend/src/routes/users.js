import { Router } from "express";
import pool from "../db/database.js";
import healpers from "../lib/helpers.js";
import passport from "passport";
import { adminDashboard } from "../controllers/admin.controler.js";

const router = Router();


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/formulario");
}

function isAdmin(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect("/login");
  if (req.user.rol === "admin") return next();
  return res.redirect("/");
}

router.post("/registro", async (req, res) => {
  try {
    const { name, mail, password, modality } = req.body;

    if (!name || !mail || !password || !modality) {
      return res.json({
        success: false,
        message: "Todos los campos son obligatorios"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      return res.json({
        success: false,
        message: "El correo no es válido"
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.json({
        success: false,
        message: "La contraseña debe tener mínimo 8 caracteres y al menos un número"
      });
    }

    const normalizedMail = mail.trim().toLowerCase();

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE mail = ?",
      [normalizedMail]
    );

    if (existing.length > 0) {
      return res.json({
        success: false,
        message: "Este correo ya está registrado",
        redirect: "/login"
      });
    }

    const newUser = {
      name,
      mail: normalizedMail,
      password: await healpers.encryptPassword(password),
      modality
    };

    const [result] = await pool.query("INSERT INTO users SET ?", [newUser]);

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id_users = ?",
      [result.insertId]
    );

    const user = rows[0];

    req.login(user, (err) => {
      if (err) {
        console.error("Error al iniciar sesión automáticamente:", err);
        return res.json({
          success: true,
          message: "Usuario registrado, pero inicia sesión manualmente",
          redirect: "/login"
        });
      }

      return res.json({
        success: true,
        message: "Usuario registrado correctamente",
        redirect: "/perfil"
      });
    });

  } catch (error) {
    console.error("ERROR EN POST /registro:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno en el servidor"
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { mail } = req.body;
    const normalizedMail = mail.trim().toLowerCase();

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE mail = ?",
      [normalizedMail]
    );

    const user = rows[0];

    if (user) {
      const now = Date.now();
      const last = user.last_attempt ? new Date(user.last_attempt).getTime() : 0;

      if (now - last > 15 * 60 * 1000) {
        await pool.query(
          "UPDATE users SET login_attempts = 0 WHERE id_users = ?",
          [user.id_users]
        );
        user.login_attempts = 0;
      }

      if (user.login_attempts >= 5) {
        return res.json({
          success: false,
          message: "Demasiados intentos fallidos. Intenta más tarde."
        });
      }
    }

    passport.authenticate("login-local", async (err, user, info) => {
      if (err || !user) {
        await pool.query(
          "UPDATE users SET login_attempts = login_attempts + 1, last_attempt = NOW() WHERE mail = ?",
          [normalizedMail]
        );

        return res.json({
          success: false,
          message: "Credenciales incorrectas"
        });
      }
      req.login(user, async (err) => {
        if (err) {
          return res.json({
            success: false,
            message: "Error interno"
          });
        }

        await pool.query(
          "UPDATE users SET login_attempts = 0 WHERE id_users = ?",
          [user.id_users]
        );

        return res.json({
          success: true,
          message: "Inicio de sesión exitoso",
          redirect: "/perfil"
        });
      });
    })(req, res, next);

  } catch (error) {
    console.error("ERROR EN LOGIN:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno en el servidor"
    });
  }
});

/* router.post("/blog") */

router.get("/perfil", isLoggedIn, (req, res) => {
  res.render("perfil", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("formulario-sesion");
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.json({
        success: true,
        redirect: "/"
      });
    });
  });
});

router.get("/registro", (req, res) => {
  res.render("formulario");
});

router.get("/admin", isAdmin, adminDashboard);

router.delete("/admin/delete/:id", isAdmin, async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM users WHERE id_users = ?", [id]);
  res.json({ success: true });
});

export default router;