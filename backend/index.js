const express = require("express");
const app = express();
const port = 4000;
const guestRouter = require('./routes/guest')
const auth = require("./middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("./config")
const query = require("./services/query")
var cors = require("cors");
const adminRouter = require("./routes/admin");
const adminAuth = require("./middleware/adminAuth");

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.get("/genratetoken", async (req, res) => {
    let date = new Date();
    
    var user = {
        agent: req.header('user-agent'), // User Agent we get from headers
        referrer: req.header('referrer'), //  Likewise for referrer
        ip: req.header('x-forwarded-for') || req.connection.remoteAddress, // Get IP - allow for proxy
        date: date,
        c_limit_per_day:2100,
        p_limit_per_month:1000
      };

      user = await query.createUser(user)
      
    console.log({user})
    const token = jwt.sign(
        user,
        config.TOKEN_KEY, //secretOrPrivateKey of token
        {
        //   expiresIn: "2h",
        }
      );
    res.json({ token, user});
  });
app.use("/user",auth, guestRouter);
app.use("/admin",adminAuth, adminRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});