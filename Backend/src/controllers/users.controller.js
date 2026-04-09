import pool from "../db/database.js";

export async function userProfile(req, res) {
  try {

    res.render("client/perfil", {
        
    });

  } catch (error) {
    console.error("Error cargando usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function userComents(req, res) {
    try {

    const [comentarios] = await pool.query(
        "SELECT * FROM comentarios WHERE id_usuario = ?" ,
         [req.user.id_users],
    )

    res.render("client/comentarios", {
            user: req.user,
            comentarios
        })

  } catch (error) {
    console.error("Error cargando usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}
    
    
