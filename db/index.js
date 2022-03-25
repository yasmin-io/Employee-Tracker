//require connection to db
const connection = require("./connection");

// This is where we are interacting with the database and seperating it to keep our code cleaner, more readable.

class dbStore {
  constructor(connection) {
    this.connection = connection;
  }

  // Create a New Employee
  createEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  // View all Departments
  viewAllDepartments() {
    return this.connection.promise().query("SELECT * FROM departments");
  }

  // View all Employees
  viewAllEmployees() {
    return this.connection.promise().query("SELECT * FROM employee");
  }

  // View all Roles
  viewAllRoles() {
    return this.connection.promise().query("SELECT * FROM roles");
  }

  // Create a new Department
  createNewDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO departments SET ?", department);
  }

  // Create a new Employee Role
  createNewRole(role) {
    return this.connection.promise().query("INSERT INTO roles SET ?", role);
  }
}

// Export this as a class with the connection passed through.
// This prevents a new connection being created for every request.
module.exports = new dbStore(connection);
