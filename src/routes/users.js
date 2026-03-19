import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from '../db/database.js'

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/perfil", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/perfil.html"));
});

router.get("/formulario", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/formulario.html"));
});

router.post("/formulario", async (req, res) => {
  console.log(req.body)
  try {
    const { name, mail, password, modality } = req.body;

    // VALIDACIÓN
    if (!name || !mail || !password || !modality) {
      return res.send("Todos los campos son obligatorios");
    }

    const newUser = {
        name: name,
        mail: mail,
        password: password,
        modality: modality
    };

    await pool.query("INSERT INTO users SET ?", [newUser]);

    res.send("Usuario registrado correctamente");
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar usuario");
   
  }
});

export default router;
