import pool from "../db/database.js";

export async function adminDashboard(req, res) {
  try {
    const [usuarios] = await pool.query(
      "SELECT id_users, name, mail, modality, rol FROM users"
    );

    res.render("admin/admin-users", {
      user: req.user,
      usuarios
    });

  } catch (error) {
    console.error("Error cargando admin:", error);
    res.status(500).send("Error interno del servidor");
  }
}