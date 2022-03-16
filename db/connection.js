// require mysql
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees",
});

connection.connect((error) => {
  if (error) throw error;
});

module.exports = connection;
