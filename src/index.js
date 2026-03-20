import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import home from "./routes/home.js";
import users from "./routes/users.js";
import ejs from "ejs";
import dotenv from "dotenv";
import cors from "cors";

//initializacions
const website = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//settings
website.set("port", 3000);
website.set("view engine", "ejs");
website.set("views", path.join(__dirname, "src/views"));
website.set("app name", "CRUD");
dotenv.config();

website.use(
  cors({
    origin: "*",
  }),
);

//middlewares
website.use(express.text());
website.use(express.json());
website.use(morgan("dev"));
website.use(urlencoded({ extended: true }));

//routes
website.use(home);
website.use(users);

//global variables

//public
website.use(express.static(path.join(__dirname, "../public")));

const port = website.get("port");
website.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

export default website;
