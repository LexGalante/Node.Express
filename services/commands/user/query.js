const database = require('../../database');
const _ = require('lodash');

module.exports = {
    getByLogin: (login, callBack) => {
        const command = "SELECT id, login, name, created_at, updated_at, active, roles FROM user WHERE login = ?";
        database.open();
        database.query(command, [login], callBack);
        database.close();
    },
    getById: (id, callBack) => {
        const command = "SELECT id, login, name, created_at, updated_at, active, roles FROM user WHERE id = ?";
        database.open();
        database.query(command, [id], callBack);
        database.close();
    },
    all: (callBack, where = "where 1 = 1") => {
        const command = `SELECT id, login, name, created_at, updated_at, active, roles FROM user ${where}`;
        database.open();
        database.query(command, [], callBack);
        database.close();
    }
}