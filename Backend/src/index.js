import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import home from "./routes/home.js";
import users from "./routes/users.js";
import ejs from "ejs";
import dotenv from "dotenv";
import cors from "cors";
/* import passport from "./lib/passport.js"; */
import session from "express-session";
import mysqlSession from "express-mysql-session";
import pool from "./db/database.js";

dotenv.config();

const website = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* const MySQLStore = mysqlSession(session)
const sessionStore = new MySQLStore({
  expiration: 1000 * 60 * 60 * 24,
    createDatabaseTable: true
}, pool) */

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
/* website.use(
  session({
    secret: "node-session",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 día
      httpOnly: true,
      secure: false, // en producción con HTTPS → true
    },
  }),
);
website.use(passport.initialize());
website.use(passport.session()); */

// ROUTES
website.use(home);
website.use(users);




// START SERVER
const port = website.get("port");
website.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

export default website;
