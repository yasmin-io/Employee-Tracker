// Requiring Inquirer to prompt the user with the questions we want to ask.
const express = require("express");
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
        ],
      },
    ])
    .then((userChoice) => {
      // If the user's Choice matches the if statement, then execute the block of code attatched.
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
      }
    });
};

// This function allows the user to see all the departments saved in the database.
function viewDepartments() {
  console.log("db store:", dbStore);
  console.log(dbStore.viewAllDepartments);
  dbStore
    .viewAllDepartments()
    .then(([departments]) => {
      console.table(departments);
    })
    .then(() => {
      mainOptions();
    });
}

// This function allows the user to see all the employees saved in the database.
function viewEmployees() {
  console.log("db store:", dbStore);
  console.log(dbStore.viewallEmployees);
  dbStore
    .viewAllEmployees()
    .then(([employees]) => {
      console.table(employees);
    })
    .then(() => {
      mainOptions();
    });
}

// This function allows the user to see all the roles saved in the database.
function viewRoles() {
  console.log("db store:", dbStore);
  console.log(dbStore.viewAllRoles);
  dbStore
    .viewAllRoles()
    .then(([roles]) => {
      console.table(roles);
    })
    .then(() => {
      mainOptions();
    });
}

//Create new department

function createDepartmennt() {
  inquirer
    .prompt([
      {
        // name needs to match the column of the table that this will go to
        name: "name",
        message: "What is the name of the department you want to add?",
      },
    ])
    .then((response) => {
      dbStore
        .createNewDepartment(response)
        .then(() => {
          console.log(`Inserted Department ${response.name}`);
        })
        .then(() => {
          mainOptions();
        });
    });
}

// Create Role
function createRole() {
  dbStore.viewAllDepartments().then(([departments]) => {
    const listOfDepartments = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          name: "title",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          message: "What is the salary for this role? ",
        },
        {
          type: "list",
          name: "department_id",
          message: "which department does this role belong too? ",
          choices: listOfDepartments,
        },
      ])
      .then((role) => {
        dbStore
          .createNewRole(role)
          .then(() => {
            console.log(`Inserted Role ${role.title}`);
          })
          .then(() => {
            mainOptions();
          });
      });
  });
}

// Run these functions when the user types ' node index.js'
init();
