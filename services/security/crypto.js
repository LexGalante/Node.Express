const crypto = require('crypto');

module.exports = {
    crypt: (password) => {
        const security = crypto.createCipher('aes-128-cbc', process.env.AES_SECRET);
        password = security.update(password, 'utf8', 'hex');
        password += security.final('hex');

        return password;
    },
    decrypt: (password) => {
        const security = crypto.createCipher('aes-128-cbc', process.env.AES_SECRET);
        password = security.update(password, 'hex', 'utf8');
        password += security.final('utf8');

        return password;
    }
}