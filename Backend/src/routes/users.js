import { Router } from "express";
import pool from "../db/database.js";
import healpers from "../lib/helpers.js";
import passport from "passport";



const router = Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/formulario.html");
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

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE mail = ?",
      [mail]
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

router.post("/login",
  passport.authenticate("login-local"),
  (req, res) => {
    return res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      redirect: "/perfil"
    });
  }
);

router.get("/perfil", isLoggedIn, (req, res) => {
  res.render("perfil", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("formulario-sesion")
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

router.get("/registro", (req, res) => {
  res.render("formulario")
})


export default router;