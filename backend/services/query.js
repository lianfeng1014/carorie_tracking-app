const db = require('./db');
const helper = require('../helper');
const config = require('../config');
function getValues(obj){
  return JSON.stringify(Object.values(obj)).replace('[','').replace(']','')
}
async function getUser(user){
  const rows = await db.query(
    `SELECT *
    FROM users
    WHERE id=${user}`
  );
  let data = helper.emptyOrRows(rows);
  // data = data.map(x=>({...x, date: new Date(Date.parse(x.date.toString().replace(/-/g, '/'))).toISOString()}))
  return {
    user:data[0]
  }
}
async function getFoodsByUser(user){
  const rows = await db.query(
    `SELECT *
    FROM foods
    WHERE user=${user}`
  );
  let data = helper.emptyOrRows(rows);
  // data = data.map(x=>({...x, date: new Date(Date.parse(x.date.toString().replace(/-/g, '/'))).toISOString()}))
  return {
    data
  }
}

async function getFoods(user){
  const rows = await db.query(
    `SELECT *
    FROM foods`
  );
  let data = helper.emptyOrRows(rows);
  // data = data.map(x=>({...x, date: new Date(Date.parse(x.date.toString().replace(/-/g, '/'))).toISOString()}))
  return {
    data
  }
}
async function createUser(user){
  user.date=user.date.toISOString().slice(0, 19).replace('T', ' ');
  const sql = `Insert into users (${Object.keys(user).toString()}) Values (${getValues(user)})`
  const rows = await db.query(sql);
  const users = await db.query(`Select * from users where id = ${rows.insertId}`);
  return users[0]
}

async function createFood(obj){
  obj.date=new Date(obj.date).toISOString().slice(0, 19).replace('T', ' ');
  const sql = `Insert into foods (${Object.keys(obj).toString()}) Values (${getValues(obj)})`
  const rows = await db.query(sql);
  const users = await db.query(`Select * from foods where id = ${rows.insertId}`);
  return users[0]
}
async function deleteFood(obj){
  const sql = `Delete from foods where id=${obj.id} and user=${obj.user}`
  const rows = await db.query(sql);
  const users = await db.query(`Select * from foods where id = ${rows.insertId}`);
  return users[0]
}
module.exports = {
  getFoodsByUser,
  createUser,
  createFood,
  deleteFood,
  getUser,
  getFoods
}