const database = require('../../database');
const _ = require('lodash');

module.exports = (user, callBack) => {
    const command = "INSERT INTO user(login, password, name, created_at, active) VALUES (?, ?, ?, ?, ?)";
    const parameters = _.values(user);
    database.open();
    database.execute(command, parameters, callBack);
    database.close();
}