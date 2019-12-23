const database = require('../../database');
const crypto = require('../../security/crypto');

module.exports = (user, callBack) => {
    user.password = crypto.crypt(user.password);
    const command = "INSERT INTO user(login, password, name, created_at, updated_at, active, roles) VALUES (?, ?, ?, ?, ?, ?, ?)";
    database.open();
    database.execute(command, [
        user.login,
        user.password,
        user.name,
        user.created_at,
        user.updated_at,
        user.active,
        user.roles
    ], callBack);
    database.close();
}