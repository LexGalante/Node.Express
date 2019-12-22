const sqlite3 = require('sqlite3').verbose();
let db;

const database = {
    /* Open connection */
    open: () => db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
    }),
    /* Close connection */
    close: () => db.close((error) => console.error(error)),
    /**
     * Execute DML commands INSERT, UPDATE, DELETE
     * @param {string} sql
     * @param {Array} parameters
     * @param {Function} onExecute
     */
    execute: (sql, parameters, callBack) => db.run(sql, parameters, callBack),
    /**
     * Execute DQL commands SELECT etc...
     * @param {string} url
     * @param {object} options
     * @returns {Promise}
     */
    query: (sql, parameters, callBack) => db.all(sql, parameters, callBack)
}

module.exports = database;