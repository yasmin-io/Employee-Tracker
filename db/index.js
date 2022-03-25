//require connection to db
const connection = require("./connection");

// This is where we are interacting with the database and seperating it to keep our code cleaner, more readable.

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
    return this.connection.promise().query("SELECT * FROM employee");
  }

  viewAllRoles() {
    return this.connection.promise().query("SELECT * FROM roles");
  }

  createNewDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO departments SET ?", department);
  }
  createNewRole(role) {
    return this.connection.promise().query("INSERT INTO roles SET ?", role);
  }
}

module.exports = new dbStore(connection);
