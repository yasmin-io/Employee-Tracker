//require connection to db
const connection = require("./connection");

class dbStore {
  constructor(connection) {
    this.connection = connection;
  }

  //View all departments
  viewAllDepartments() {
    return this.connection.promise().query("SELECT * FROM departments");
  }

  //view all employees
  viewAllEmployees() {
    return this.connection; //.promise().query("SELECT * FROM employees");
  }
}

module.exports = new dbStore(connection);
