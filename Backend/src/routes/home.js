import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
     res.sendFile(path.resolve(process.cwd(), "views/historia.html"));
}) 

router.get('/blog', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "views/blog.html"));

})

router.get('/beneficios', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "views/beneficios.html"));

})

router.get('/objetivos', (req, res) => {
   res.sendFile(path.resolve(process.cwd(), "views/objetivos.html"));

})

router.get('/paises', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "views/paises.html"));

})

router.get('/representantes', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "views/representantes.html"));

})

router.get('/tienda', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "views/tienda.html"));
})

export default router