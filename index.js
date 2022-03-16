const { prompt } = require("inquirer");
const dbStore = require("./db");
require("console.table");

function viewDepartments() {
  dbStore.viewAllDepartments().then(([departments]) => {
    console.log(departments);
    console.table(departments);
  });
}
