//require connection to db
const connection = require("./connection");

class dbStore {
  constructor(connection) {
    this.connection = connection;
  }

  // Create a new employee
  createEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
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
