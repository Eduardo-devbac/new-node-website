import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db/database.js";
import passport from "passport";
import healpers from "../lib/helpers.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/perfil", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "../frontend/pages/perfil.html"));
});

router.get("/formulario", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "../frontend/pages/formulario.html"));
});

router.post("/formulario", async (req, res) => {

  try {
    const { name, mail, password, modality } = req.body;

    if (!name || !mail || !password || !modality) {
      return res.json({
        success: false,
        message: "Todos los campos son obligatorios"
      });
    }

    const newUser = { name, mail, password, modality };

    newUser.password = await healpers.encryptingpassword(password)

    await pool.query("INSERT INTO users SET ?", [newUser]);

    return res.json({
      success: true,
      message: "Usuario registrado correctamente",
      data: newUser
    });

  } catch (error) {
    console.error("ERROR EN POST /formulario:", error);

    return res.status(500).json({
      success: false,
      message: "Error interno en el servidor"
    });
  }
});




export default router;
