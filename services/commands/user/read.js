const database = require('../../database');
const _ = require('lodash');

module.exports = (callBack, where = "where 1 = 1") => {
    const command = `SELECT id, login, password, name, created_at, active FROM user ${where}`;
    database.open();
    let data = database.query(command, [], callBack);
    database.close();

    return data;
}