const database = require('../../database');
const _ = require('lodash');

module.exports = (id, user, callBack) => {
    if (_.isEmpty(id) || parseInt(id) == NaN || parseInt(id) == 0)
        throw Error('User [id] is mandatory to update');

    let command = "UPDATE user SET updated_at = ? ";
    if (!_.isEmpty(user.login))
        command += ` ,login = '${user.login}' `;
    if (!_.isEmpty(user.password))
        command += ` ,password = '${user.password}' `;
    if (!_.isEmpty(user.name))
        command += ` ,name = '${user.name}' `;
    if (!_.isEmpty(user.active))
        command += ` ,active = '${user.active}' `;

    command += " WHERE id = ?";
    console.log(command);
    database.open();
    database.execute(command, ["DATETIME('now')", id], callBack);
    database.close();
}