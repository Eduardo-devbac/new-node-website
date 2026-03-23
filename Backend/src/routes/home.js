import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
     res.sendFile(path.join(process.cwd(), "../frontend/public/pages/historia.html"));
}) 

router.get('/blog', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "../frontend/public/pages/blog.html"));

})

router.get('/beneficios', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "../frontend/public/pages/beneficios.html"));

})

router.get('/objetivos', (req, res) => {
   res.sendFile(path.resolve(process.cwd(), "../frontend/public/pages/objetivos.html"));

})

router.get('/paises', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "../frontend/public/pages/paises.html"));

})

router.get('/representantes', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "../frontend/public/pages/representantes.html"));

})

router.get('/tienda', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "../frontend/public/pages/tienda.html"));
})

export default router