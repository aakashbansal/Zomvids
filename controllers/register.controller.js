const dbUser = require("../db/user");
const {encryptPassAndSaveUser} = require('../utils/password-bcrypt');

var fs = require('fs');
var config=require('../config/config')

const registerUser = (req, res, next) => {
    const username = (req.body.username || '').trim().toLowerCase();
    const password = (req.body.password || '').trim();
    console.log(req.body)
    if (username.length === 0 || password.length === 0 ) return next("ERROR :EMPTY_FIELDS");

    const newUser = new dbUser({
        username: username,
        password: password
    });

    return dbUser.findOne({username: username})
        .then(user => !!user ? Promise.reject("ERROR : USER_EXISTS") : "")
        .then(_ => encryptPassAndSaveUser(newUser))
        .then(user => {
            fs.mkdirSync(config.FILE_UPLOAD_ROOT_PATH+user.username)
            res.json({message: `Hello ${user.username}, you are now registered and can login.`})
        })
        .catch(e => next(e));
};

module.exports = registerUser;