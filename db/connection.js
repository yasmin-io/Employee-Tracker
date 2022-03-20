// require mysql
const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db",
  },
  console.log("employees_db database is now connected!")
);

connection.connect((error) => {
  if (error) throw error;
});

module.exports = connection;
