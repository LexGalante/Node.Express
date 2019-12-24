const database = require('../../database');
const _ = require('lodash');

module.exports = (id, callBack) => {
    const command = "DELETE FROM user WHERE id = ?";
    database.open();
    database.execute(command, [id], callBack);
    database.close();
}