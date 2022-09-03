const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "",
      database: "calorie_tracking_app",
    },
    listPerPage: 10,
    TOKEN_KEY:"carorie-traking-app-2022"
  };
  module.exports = config;