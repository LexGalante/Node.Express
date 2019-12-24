const database = require('../../database');
const _ = require('lodash');
const crypto = require('../../security/crypto');

module.exports = (user, callBack) => {
    if (_.isEmpty(user.login)) {
        return "Ops! need your username";
    }

    if (_.isEmpty(user.password)) {
        return "Ops! need your password";
    }

    const command = "SELECT * FROM user WHERE login = ? AND password = ?";
    database.open();
    database.single(command, [user.login, crypto.crypt(user.password)], callBack);
    database.close();
}