const bcrypt = require("bcrypt");

const config = require('../config/config');

const encryptPassAndSaveUser = (newUser) => {

    return bcrypt.hash(newUser.password, config.BCRYPT_SALT_ROUNDS).then(hash => {

        newUser.password = hash;
        return newUser.save();
    });

};

const verifyPassword = (candidatePassword, hash) => bcrypt.compare(hash, candidatePassword)
    .then(valid => 
            valid || Promise.reject("Invalid Password"));

            
module.exports = {
    encryptPassAndSaveUser,
    verifyPassword
}