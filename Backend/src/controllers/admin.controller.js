import pool from "../db/database.js";

export async function adminUsers(req, res) {
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

export async function adminComents (req, res) {
  try {
    const [comentarios] = await pool.query(
      "SELECT * FROM comentarios"
    );

    res.render("admin/admin-coments", {
      user: req.user,
      comentarios
    }) 
  } catch (error){
    console.error("Error cargando admin:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function Products (req, res) {
  try{
    const [productos] = await pool.query(
      'SELECT * FROM products'
    );

    res.render("tienda", {
      user: req.user,
      productos
    })
  }catch (error){
    console.error("Error cargando productos:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function adminProducts (req, res) {
  try{
    const [productos] = await pool.query(
      'SELECT * FROM products'
    );

    res.render("admin/admin-products", {
      user: req.user,
      productos
    })
  }catch (error){
    console.error("Error cargando productos:", error);
    res.status(500).send("Error interno del servidor");
  }
}