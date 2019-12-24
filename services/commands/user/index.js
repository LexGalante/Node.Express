const queryUsers = require('./query');
const createUser = require('./create');
const updateUser = require('./update');
const deleteUser = require('./delete');

module.exports = {
    queryUsers,
    createUser,
    updateUser,
    deleteUser
}