const passport = require("passport");

class Authentication {

    authMiddleware= (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.status(401).json({ message: "You are not authenticated" });
        } else {
            return next();
        }
        // return next();
    };

    login=(req, res, next)=>{
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                return res.status(400).json({ errors: "No user found" });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(400).json({ errors: err });
                }
                return res.status(200).json({ success: `logged in ${user.id}`, user });
            });
        })(req, res, next);
    }

    logout=(req, res, next) => {

        req.logout(function(err) {
            if (err) { return next(err); }
            // res.redirect('/');
            res.status(200).json({ message: "logged out successfully" });

          });
    }

}

module.exports = {
    getInst: function(){
        return new Authentication();
    }
}