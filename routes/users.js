const express = require('express');
const router = express.Router();
const userCommands = require('../services/commands/user');
const _ = require('lodash');
const moment = require('moment');
const authorize = require('../services/commands/auth/authorize');

/* GET users listing. */
router.get('/', authorize(['admin', 'manager']), (req, res, next) => {
  userCommands.queryUsers.all((error, users) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.send(users);
  });
});
/* GET single user. */
router.get('/:id', authorize(['admin', 'manager']), (req, res, next) => {
  const id = req.params.id;

  userCommands.queryUsers.getById(id, (error, users) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.send(users);
  });
});
/* POST create user. */
router.post('/', authorize(['admin', 'manager']), (req, res, next) => {
  const user = req.body;
  if (_.isEmpty(user.login))
    throw Error('User [login] is mandatory');
  if (_.isEmpty(user.password))
    throw Error('User [password] is mandatory');
  if (_.isEmpty(user.name))
    throw Error('User [name] is mandatory');
  if (_.isEmpty(user.created_at))
    user.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  if (_.isEmpty(user.active))
    user.active = 1;
  if (_.isEmpty(user.roles) || user.roles.length == 0)
    user.roles = "guest";

  userCommands.createUser(user, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.status(201).send();
  });
});
/* PUT update user. */
router.put('/:id', authorize(['admin', 'manager']), (req, res, next) => {
  const id = req.params.id;
  const user = req.body;

  userCommands.updateUser(id, user, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.status(200).send();
  });
});
/* DELETE remove user. */
router.delete('/:id', authorize(['admin']), (req, res, next) => {
  const id = req.params.id;

  userCommands.deleteUser(id, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.status(200).send();
  });
});

module.exports = router;
