// Code Goes Here
// const mysql = require('mysql2');
const inquirer = require('inquirer');

// constant not yet used in current build

const cTable = require('console.table');

const db = require('./config/connections')
// require('dotenv').config()

// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password
//     password: process.env.db_password,
//     database: 'employee_db'
//   },
// );

// console.log(process.env.db_password);



// I kinda wish I was better at ASCII art, but this will do now now
const launchManager = () => {
  console.log('++++++++++++++++++++++++++++++++');
  console.log('+///                          /+');
  console.log('+//     Employee Tracker     //+');
  console.log('+/                          ///+');
  console.log('++++++++++++++++++++++++++++++++');
  inquiryStart();
}

db.connect(err => {
  if (err) //throw err;
    console.log(' connection failed, reason pending')
});

// now for the inquirer questions
const inquiryStart = () => {
  inquirer.prompt(
    {
      type: 'list',
      name: 'actions',
      message: 'What shall we do?',
      choices: [
        'List all Departments',
        'List all Roles',
        'List all Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Update an Employee Manager',
        'Delete a Department',
        // 'Delete a Role',
        // 'Exterminate an Employee',
        // 'View Department Budget',
        'Exit'
      ]
    }
  ).then((answer) => {
    const { actions } = answer;

    if (actions === 'List all Departments') {
      listDepartments();
    }

    if (actions === 'List all Roles') {
      listRoles();
    }

    if (actions === 'List all Employees') {
      listEmployees();
    }

    if (actions === 'Add a Department') {
      addDepartment();
    }

    if (actions === 'Add a Role') {
      addRole();
    }

    if (actions === 'Add an Employee') {
      addEmployee();
    }

    if (actions === 'Update an Employee Role') {
      updateEmployeeRole();
    }

    if (actions === 'Update an Employee Manager') {
      updateEmployeeManager();
      console.log('Employee manager has been updated.');
    }

    if (actions === 'Delete a Department') {
      deleteDepartment();
      console.log('Department has been deleted.');
    }

    if (actions === 'Delete a Role') {
      deleteRole();
      console.log('Role has been deleted.');
    }

    if (actions === 'Exterminate an Employee') {
      purgeEmployee();
      console.log('Target employee has been expunged from the company and erased from the historical record. They never existed.');
    }

    if (actions === 'View Department Budget') {
      viewBudget();
      console.log('Departmental budget has been mathed out. Louie has immunity.');
    }

    if (actions === 'Exit') {
      console.log("Goodbye.");
      db.end();
    };
  });
};

// IN PROGRESS

// Functions to take action below

const listDepartments = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    inquiryStart();
  });
}

const listRoles = () => {
  const sql = `SELECT * FROM roles`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    inquiryStart();
  });
}

const listEmployees = () => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    inquiryStart();
  });
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the new department you would like to add?',
      validate: addDept => {
        if (addDept) {
          return true;
        } else {
          console.log('Please enter a department name.');
          return false;
        }
      }
    }
  ]).then((answer) => {
    const sql = `INSERT INTO department (department_name) VALUES (?)`;
    db.query(sql, answer.department, (err, results) => {
      if (err) throw err;
      console.log(`New department added: ${answer.department}.`);
      inquiryStart();
    });
  });
}


// 'SELECT * FROM department; SELECT * FROM roles'


const addRole = () => {
  const sql = 'SELECT * FROM department';
  db.query(sql, (err, results) => {
    if (err) throw err; 
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role you would like to add?',
        validate: addTitle => {
          if (addTitle) {
            return true;
          } else {
            console.log('Please enter a title for the new role.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the new role you would like to add?',
        validate: addSalary => {
          if (addSalary) {
            return true;
          } else {
            console.log('Please enter a salary for the new role.');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'department',
        message: 'What department does the new role belong to?',
        choices: function () {
          console.log(results);
          let departmentList = results.map(({ department_name, id }) => ({ name: department_name, value: id }))
          return departmentList;
        }
      }
    ]).then((answer) => {
      const sql2 = `INSERT INTO roles (title, salary, department_id)
      VALUES (${answer.title}, ${answer.salary}, ${answer.department})`;

      db.query(sql2, answer.title, answer.salary, answer.department, (err, results) => {
        if (err) throw err;
        console.log(`New role added: ${answer.title} has been added ${answer.department}.`);
        inquiryStart();
      });
    });
  });
}




const addEmployee = () => {
  const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;
  db.query(sql, [answer.first_name, answer.last_name, answer.roles_id, answer.manager_id], (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the first name of the new employee you would like to add?',
        validate: addFirst => {
          if (addFirst) {
            return true;
          } else {
            console.log('Please enter a first name');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the last name of the new employee you would like to add?',
        validate: addLast => {
          if (addLast) {
            return true;
          } else {
            console.log('Please enter a last name');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'roles_id',
        message: "What is the role of the new employee?",
        choices: function () {
          let roleList = results[0].map(choice => choice.title);
          return roleList;
        }
      },
      {
        type: 'list',
        name: 'manager_id',
        message: "Who is the manager of the new employee?",
        choices: function () {
          let managerList = results[0].map(choice => choice.manager);
          return managerList;
        }
      }
    ]).then((answer) => {
      console.log(`New employee added: ${answer.first_name} ${answer.last_name}.`);
    });
    inquiryStart();
  });
}

const updateEmployeeRole = () => {
  const query = `UPDATE employee SET roles_id = ? WHERE (first_name, last_name) VALUES (?, ?)`;
  db.query(query, (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: function () {
          let employeeList = results[0].map(choice => choice.employee);
          return employeeList;
        }
      },
      {
        type: 'list',
        name: 'roles',
        message: 'What is the new role of the employee?',
        choices: function () {
          let roleList = results[0].map(choice => choice.title);
          return roleList;
        }
      },
    ]).then((answer) => {
      // Updating the employee role based on employee name. WILL THIS ACTUALLY WORK???
      console.log(`Employee role updated: ${answer.employee}'s role is now ${answer.roles}.`);
    });
    inquiryStart();
  });
}

const updateEmployeeManager = () => {
  const query = `UPDATE employee SET manager_id = ? WHERE (first_name, last_name) VALUES (?, ?)`
  db.query(query, (err, results) => {
    if (err) // throw err;
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which employee would you like to update?',
          choices: function () {
            let employeeList = results[0].map(choice => choice.employee);
            return employeeList;
          }
        },
        {
          type: 'list',
          name: 'manager',
          message: 'Who is the new manager of the employee?',
          choices: function () {
            let managerList = results[0].map(choice => choice.manager);
            return managerList;
          }
        },
      ]).then((answer) => {
        console.log(`Employee manager updated: ${answer.employee}'s manager is now ${answer.manager}.`);
      });
    inquiryStart();
  });
}

const deleteDepartment = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, results) => {
    if (err) throw err;
  inquirer.prompt([
    {
      type: 'list',
      name: 'dept',
      message: 'Which department would you like to delete?',
      choices: function () {
        let departmentList = results.map(({ department_name, id }) => ({ name: department_name, value: id }))
        return departmentList;
      }
    }
  ]).then((answer) => {
    const sql2 = `DELETE FROM department WHERE name = ?`
    db.query(sql2,  { department_name: answer.dept })
      console.log(`Department deleted: ${answer.dept} has been deleted.`);
    });
    inquiryStart();
  });
}


launchManager();
