const express = require('express');
const router = express.Router();
const query = require('../services/query');
const { Validator } = require('node-input-validator');

router.get('/', async function(req, res, next) {
  try {
    console.log("user id", req.user.id)
    res.json(await query.getUser(req.user.id));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

/* GET foods. */
router.get('/foods', async function(req, res, next) {
  try {
    console.log("user id", req.user.id)
    res.json(await query.getFoodsByUser(req.user.id));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post('/foods/create', async function(req, res, next) {
  console.log("req.body",req.body)
  const v = new Validator(req.body,
    { 
      name: 'required' ,
      calorie: 'required' ,
      price: 'required' ,
      date: 'required' 
    }
  );
  v.check().then((matched)=>{
    if (!matched) {
      console.log({matched}, v.errors)
      throw {erros: v.errors, message: Object.values(v.errors).map(x=>x.message).join("")};
    }
    let obj = req.body
    console.log("user id", req.user.id)
    obj.user= req.user.id
    return query.createFood(obj)
  })
  .then(data=>{
    res.json(data);
  })
  .catch(err=>{
    console.error(`Error while getting programming languages `, err);
    next(err);
  })
});

router.post('/foods/delete', async function(req, res, next) {
  console.log("req.body",req.body)
  const v = new Validator(req.body,
    { 
      id: 'required' 
    }
  );
  v.check().then((matched)=>{
    if (!matched) {
      console.log({matched}, v.errors)
      throw {erros: v.errors, message: Object.values(v.errors).map(x=>x.message).join("")};
    }
    let obj = req.body
    console.log("user id", req.user.id)
    obj.user= req.user.id
    return query.deleteFood(obj)
  })
  .then(data=>{
    res.json(data);
  })
  .catch(err=>{
    console.error(`Error while getting programming languages `, err);
    next(err);
  })
});

module.exports = router;