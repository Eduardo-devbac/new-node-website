import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
  "registro-local",
  new Strategy({
    usernameField: "name",
    passwordField: "password",
    passReqToCallback: true,
  }),
);

passport.serializeUser((usr, done) => {
    
})

export default passport;
