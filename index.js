// Requiring Inquirer to prompt the user with the questions we want to ask.
require("express");
const inquirer = require("inquirer");
const dbStore = require("./db");

// Console.table allows us to view tabular data as tables in the terminal.
// Similar to how console.log will display strings or javascript objects in the console.
require("console.table");

// This is what we require to create our logos that display when you first run the command line application
const logo = require("asciiart-logo");
const db = require("./db");

function init() {
  // logo is a function provided by asciiart-logo and you can provide an object array of text title, text description and styling.
  console.log(logo({ name: "Manager Page", font: "Speed" }).render());
  // Then run this function to display the main options menu.
  mainOptions();
}

// When you run 'node index.js' you will be prompted with a list of questions using inquirer.
const mainOptions = () => {
  // Using the .prompt() function provided by inquirer, we will be able to prompt questions in the terminal
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])
    .then((userChoice) => {
      // If the user's Choice matches the 'if' statement, then execute the block of code attatched.
      if (userChoice.options === "View All Departments") {
        console.log("You picked option number 1!");
        viewDepartments();
      } else if (userChoice.options === "View All Roles") {
        console.log("You picked option number 2!");
        viewRoles();
      } else if (userChoice.options === "View All Employees") {
        console.log("You picked option number 3!");
        viewEmployees();
      } else if (userChoice.options === "Add Department") {
        console.log("You picked option number 4!");
        createDepartmennt();
      } else if (userChoice.options === "Add Role") {
        console.log("You picked option number 5!");
        createRole();
      } else if (userChoice.options === "Add Employee") {
        console.log("You picked option number 6!");
        createEmployee();
      } else if (userChoice.options === "Update Employee Role") {
        console.log("You picked option number 7!");
        updateEmployee();
      } else {
        console.log("Thankyou for using this application!");
        quit();
      }
    });
};

// This function allows the user to see all the departments saved in the database.
function viewDepartments() {
  // console.log("db store:", dbStore);
  // console.log(dbStore.viewAllDepartments);

  dbStore
    .viewAllDepartments()
    //After Retrieving the information, then create an object array with the return.
    .then(([departments]) => {
      // Then pass it into the console.table to use the object array and create a table.
      console.table(departments);
    }) // After this is complete, only then should this run the options page.
    .then(() => {
      mainOptions();
    });
}

// This function allows the user to see all the employees saved in the database.
function viewEmployees() {
  // console.log("db store:", dbStore);
  // console.log(dbStore.viewallEmployees);

  dbStore
    .viewAllEmployees()
    //After Retrieving the information, then create an object array with the return.
    .then(([employees]) => {
      // Then pass it into the console.table to use the object array and create a table.
      console.table(employees);
    }) // After this is complete, only then should this run the options page.
    .then(() => {
      mainOptions();
    });
}

// This function allows the user to see all the roles saved in the database.
function viewRoles() {
  // console.log("db store:", dbStore);
  // console.log(dbStore.viewAllRoles);

  dbStore
    .viewAllRoles()
    //After Retrieving the information, then create an object array with the return.
    .then(([roles]) => {
      // Then pass it into the console.table to use the object array and create a table.
      console.table(roles);
    }) // After this is complete, only then should this run the options page.
    .then(() => {
      mainOptions();
    });
}

// User can create a new department
function createDepartmennt() {
  // You need to prompt the user using inquirer to ask the question.
  inquirer
    .prompt([
      // name needs to match the column of the table that this will go to
      // For example: Departments table has: name, id for the table contents
      // When you create a name and message using inquirer, this creates an input feild for the user.
      {
        name: "name",
        message: "What is the name of the department you want to add?",
      },
    ]) // Pass the user's response into the dbStore function.
    .then((response) => {
      dbStore
        .createNewDepartment(response)
        .then(() => {
          // Let the user know there department choice was inserted into the database.
          console.log(`Inserted Department ${response.name}`);
        })
        .then(() => {
          // Only after this has completed then run the mainOptions() function.
          mainOptions();
        });
    });
}

// User can create a new role
function createRole() {
  // Call the departments function which will return the contents in the table.
  // Pass it through as an Object Array
  dbStore.viewAllDepartments().then(([departments]) => {
    // Create a variable of choices for the inquirer prompt
    // Loop through the departments and deconstruct them into id and name.
    const listOfDepartments = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    // Prompt the user with the following questions to create the role.
    inquirer
      .prompt([
        // Match each 'name' of the question to the table. Example: salary = salary in the roles table.
        {
          name: "title",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          message: "What is the salary for this role? ",
        },
        {
          // The variable will display the list of of departments from above.
          type: "list",
          name: "department_id",
          message: "which department does this role belong too? ",
          choices: listOfDepartments,
        },
      ]) // Then the return will be then passed into the database function to create the new role.
      .then((role) => {
        dbStore
          .createNewRole(role)
          .then(() => {
            // This lets the user know their role was just added to the db.
            console.log(`Inserted Role ${role.title}`);
          })
          .then(() => {
            // After all this is complete, then run the function to display the main menu.
            mainOptions();
          });
      });
  });
}

// User can create a new employee profile()
function createEmployee() {
  // Return all the roles from the database.
  dbStore.viewAllRoles().then(([roles]) => {
    const listOfRoles = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    // Prompt the user with the following questions to create the employee profile.
    inquirer
      .prompt([
        {
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's role?",
          choices: listOfRoles,
        },
      ]) // Then add the users response into the database by passing it into
      .then((employee) => {
        dbStore.viewAllEmployees().then(([employees]) => {
          const listOfEmps = employees.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "manager_id",
                message: "Who will be this employees manager?",
                choices: listOfEmps,
              },
            ])
            .then((manager) => {
              const newEmployee = {
                first_name: employee.first_name,
                last_name: employee.last_name,
                role_id: employee.role_id,
                manager_id: manager.manager_id,
              };
              dbStore
                .createNewEmployee(newEmployee)
                .then(() => {
                  console.log(employee);
                  console.log(`Inserted Role ${employee.first_name}`);
                })
                .then(() => {
                  mainOptions();
                });
            });
        });
      });
  });
}

// User can Update a Chosen employee
function updateEmployee() {
  // This retrieves the roles saved in the database

  dbStore.viewAllEmployees().then(([employees]) => {
    const listOfEmps = employees.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    // Prompt user with questions to update their chosen employee role
    inquirer
      .prompt([
        {
          type: "list",
          message: "What employee do you want to update?",
          name: "employeeId",
          choices: listOfEmps,
        },
      ])
      .then((employee) => {
        dbStore.viewAllRoles().then(([roles]) => {
          const listOfRoles = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                message: " What role would you like to give to this employee?",
                name: "newRole",
                choices: listOfRoles,
              },
            ])
            .then((role) => {
              console.log(employee.employeeId, role.newRole);
              dbStore
                .updateEmployee(employee.employeeId, role.newRole)
                .then(() => {
                  console.log("Updated Employee w/ new role");
                })
                .then(() => {
                  mainOptions();
                });
            });
        });
      });
  });
}

// Exit Application
function quit() {
  dbStore.quitConnection();
  process.exit();
}

// Run these functions when the user types ' node index.js'
init();
