 import { Router } from "express";

const router = Router();
 
/* router.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
}); */

router.get("/", (req, res) => {
  res.render("index")
})

router.get("/beneficios", (req, res) => {
  res.render("beneficios")
})

router.get("/objetivos", (req, res) => {
  res.render("objetivos")
})

router.get("/paises", (req, res) => {
  res.render("paises")
})

router.get("/representantes", (req, res) => {
  res.render("representantes")
})

router.get("/blog", (req, res) => {
  res.render("blog")
})

router.get("/tienda", (req, res) => {
  res.render("tienda")
})
export default router;

  