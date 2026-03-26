import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pool from "../db/database.js";
import helpers from "./helpers.js";

passport.use(
  "login-local",
  new LocalStrategy(
    {
      usernameField: "mail",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, mail, password, done) => {
      try {
        const [rows] = await pool.query("SELECT * FROM users WHERE mail = ?", [
          mail,
        ]);

        if (rows.length === 0) {
          return done(null, false, { message: "Correo no registrado" });
        }

        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password,
        );

        if (!validPassword) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// SERIALIZAR
passport.serializeUser((user, done) => {
  done(null, user.id_users);
});

// DESERIALIZAR
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id_users = ?", [
      id,
    ]);
    done(null, rows[0]);
  } catch (e) {
    done(e);
  }
});

export default passport;
