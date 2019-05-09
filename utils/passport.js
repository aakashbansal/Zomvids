const passport = require("passport");
const {Strategy} = require("passport-local");
const dbUser = require('./../db/user');
const {verifyPassword} = require('./password-bcrypt'); 

passport.use(new Strategy(
    function (username, password, cb) {
        return dbUser.findOne({username: String(username).trim().toLowerCase()})
            .then(user => {
                if (!!user) {
                    // start verification if a user exists
                    return verifyPassword(user.password, password)
                        .then(_ => cb(null, user))
                        .catch(e => cb(e))
                }
                // unauthorised if no user is found.
                return cb(null, false)
            })
            .catch(e => cb(e));
    }));

// store user's id in cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// gets the user from the database and populate the req.user object.
passport.deserializeUser((id, done) => dbUser.findById(id)
    .then(user => !!user ? done(null, user) : done(new Error('Does not exists')))
    .catch(e => done(e)));

module.exports = passport;
