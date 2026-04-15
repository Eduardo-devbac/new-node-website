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
    console.error("Error cargando los comentarios:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function userSales(req, res) {
  try {
    const [compras ] = await pool.query(
     `SELECT 
          v.id_venta,
          v.fecha,
          v.total,
          d.cantidad,
          d.precio_unitario,
          d.subtotal,
          p.nombre AS producto
        FROM ventas v
        JOIN ventas_detalle d ON v.id_venta = d.id_venta
        JOIN products p ON d.id_producto = p.id_product
        WHERE v.id_usuario = ?
        ORDER BY v.fecha DESC` ,
      [req.user.id_users], 
    )

    res.render("client/compras", {
            user: req.user,
            compras
        })
  } catch (error) {
    console.error("Error cargando las ventas:", error);
    res.status(500).send("Error interno del servidor");
  }
  
}
    
    
