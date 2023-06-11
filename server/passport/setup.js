const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("../models/admin");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {

    user.findById(id)
        .exec()
        .then((user)=>{
            done(null, user);
        })
        .catch((error)=>{
            done(error);
        })
});

passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        user
            .findOne({ email })
            .then((user) => {
                if (!user) return done(null, false, { message: "Invalid Credentials" });
                user.comparePassword(password, (err, isMatched) => {
                    if (err) return done(null, false, { message: "Invalid Credentials" });
                    if (!isMatched)
                        return done(null, false, { message: "Invalid Credentials" });
                    return done(null, user);
                });
            })
            .catch((err) => {
                return done(null, false, { message: err });
            });
    })
);

module.exports = passport;