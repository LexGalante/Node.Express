const database = require('../../database');
const _ = require('lodash');
const crypto = require('../../security/crypto');
const moment = require('moment');

module.exports = (id, user, callBack) => {
    if (_.isEmpty(id) || parseInt(id) == NaN || parseInt(id) == 0)
        throw Error('User [id] is mandatory to update');

    let command = "UPDATE user SET updated_at = ? ";
    if (!_.isEmpty(user.login))
        command += ` ,login = '${user.login}' `;
    if (!_.isEmpty(user.password))
        command += ` ,password = '${crypto.crypt(user.password)}' `;
    if (!_.isEmpty(user.name))
        command += ` ,name = '${user.name}' `;
    if (!_.isEmpty(user.active))
        command += ` ,active = '${user.active}' `;
    if (!_.isEmpty(user.roles))
        command += ` ,roles = ${user.roles}`;

    command += " WHERE id = ?";
    console.log(command);
    database.open();
    database.execute(command, [moment().format('YYYY-MM-DD HH:mm:ss'), id], callBack);
    database.close();
}