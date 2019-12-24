const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const login = require('../services/commands/auth/login');
/** POST authentication jwt */
router.post('/', (req, res, next) => {
    const user = req.body;
    login(user, (error, user) => {
        if (error) {
            res.status(200).send(`User or password invalid - ${error}`);
        }

        const token = jwt.sign({ sub: user.id, role: [user.roles] }, process.env.JWT_SECRET, { expiresIn: 600 });

        res.status(200).send(token);
    });
});
/** GET jwt information */
router.get('/:token', (req, res, next) => {
    jwt.verify(req.params.token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(500).send(error);
        }

        res.status(200).send(decoded);
    });
});

module.exports = router;