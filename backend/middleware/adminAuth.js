const jwt = require("jsonwebtoken");

const config = require("../config");
const query = require('../services/query');

const adminAuth = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log({decoded})
    const data = await query.getUser(decoded.id)
    if(data.user.role1==1){
        return res.status(401).send("Invalid permission");
    }
    req.user = data.user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = adminAuth;