const expressSession = require("express-session");
const mysqlStore = require("express-mysql-session")(expressSession);
const store = new mysqlStore({
  host: "localhost",
  port: 3306,
  createDatabaseTable: true,
  database: "crud_db",
  user: "root",
  password: "",
});

const session = expressSession({
  secret: "this secret create by podo wwkwkwkw",
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 43200000,
  },
});

module.exports = session;
