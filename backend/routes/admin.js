const express = require('express');
const adminRouter = express.Router();
const query = require('../services/query');
const { Validator } = require('node-input-validator');

adminRouter.get('/', async function(req, res, next) {
  try {
    console.log("user id", req.user.id)
    res.json(await query.getUser(req.user.id));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

/* GET foods. */
adminRouter.get('/foods', async function(req, res, next) {
  try {
    console.log("user id", req.user.id)
    res.json(await query.getFoods());
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = adminRouter;