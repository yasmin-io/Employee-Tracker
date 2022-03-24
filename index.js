// Requiring Inquirer to prompt the user with the questions we want to ask.
const express = require("express");
const inquirer = require("inquirer");
// This is what we require to create our logos that display when you first run the command line application
const logo = require("asciiart-logo");

function init() {
  // logo is a function provided by asciiart-logo and you can provide an object array of text title, text description and styling.
  console.log(logo({ name: "Manager Page", font: "Speed" }).render());
}

// ..
const dbStore = require("./db");
// const { init } = require("express/lib/application");
// const { type } = require("express/lib/response");

// Console.table allows us to view tabular data as tables in the terminal.
// Similar to how console.log will display strings or javascript objects in the console.
require("console.table");

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
        // console.log(userChoice);
        console.log("You picked option number 1!");
        viewDepartments();
      }
    });
};

function viewDepartments() {
  console.log("db store:", dbStore);
  console.log(dbStore.viewAllDepartments);
  dbStore.viewAllDepartments().then((departments) => {
    console.log(departments);
    console.log([departments]);
    // console.table(departments);
  });
}

//Create all options here

// Run these functions when the user types ' node index.js'
init();
mainOptions();
