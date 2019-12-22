const express = require('express');
const router = express.Router();
const readUsers = require('../services/commands/user/read');
const createUser = require('../services/commands/user/create');
const updateUser = require('../services/commands/user/update');
const deleteUser = require('../services/commands/user/delete');
const _ = require('lodash');
const moment = require('moment');

/* GET users listing. */
router.get('/', (req, res, next) => {
  readUsers((error, users) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.send(users);
  });
});
/* POST create user. */
router.post('/', (req, res, next) => {
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

  createUser(user, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.status(201).send();
  });
});
/* PUT update user. */
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const user = req.body;

  updateUser(id, user, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.status(200).send();
  });
});
/* DELETE remove user. */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  deleteUser(id, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Ops! ${error}`);
    }

    res.status(200).send();
  });
});

module.exports = router;
