import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import home from "./routes/home.js";
import users from "./routes/users.js";
import ejs from "ejs";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const website = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SETTINGS
website.set("port", process.env.PORT || 3000);
website.set("view engine", "ejs");
website.set("views", path.join(process.cwd(), "src/views"));

// MIDDLEWARES
website.use(cors({ origin: "*" }));
website.use(express.json());
website.use(express.text());
website.use(urlencoded({ extended: true }));
website.use(morgan("dev"));

// ROUTES
website.use(home);
website.use(users);

// STATIC FILES
website.use(express.static(path.join(process.cwd(), "public")));

// START SERVER
const port = website.get("port");
website.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

export default website;