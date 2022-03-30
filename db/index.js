// Require connection to db.
const connection = require("./connection");

// This class is where we are handling interactions with the database.
// Seperating it from the root index.js, where we handle user interaction.
class dbStore {
  constructor(connection) {
    this.connection = connection;
  }

  // Create a New Employee
  createEmployee(employee) {
    // The information from the user is passed in as employee.
    // We want to insert it into the db.
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  // View all Departments
  viewAllDepartments() {
    // We create
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

  // Create a new Employee
  createNewEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  updateEmployee(employeeId, newRole) {
    return this.connection
      .promise() // I want to SET the role WHERE on employees name
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        newRole,
        employeeId,
      ]);
  }

  quitConnection() {
    return connection.end();
  }
}

// Export this as a class with the connection passed through.
// This prevents a new connection being created for every request.
module.exports = new dbStore(connection);
