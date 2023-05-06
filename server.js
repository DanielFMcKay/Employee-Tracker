// Code Goes Here
// const mysql = require('mysql2');
const inquirer = require('inquirer');

require('console.table');

const db = require('./config/connections')



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
        // 'Update an Employee Role',
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
      console.log('Department will be deleted.');
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
        name: 'department_id',
        message: 'What department does the new role belong to?',
        choices: function () {
          console.log(results);
          let departmentList = results.map(({ department_name, id }) => ({ name: department_name, value: id }))
          return departmentList;
        }
      }
    ]).then((answer) => {
      // LEARNING FLAG: use SET to insert multiple values into a table. I think using a ? after. Look it up. Or get co-pilot to explain it.
      // It's just an alternate way, but likely simpler.
      const sql2 = `INSERT INTO roles (title, salary, department_id)
      VALUES (?, ?, ?)`;

      // LEARNING FLAG: all your answers above become "answer", which is an array now,
      // because they contain all the row IDs from the SQL table
      db.query(sql2, [answer.title, answer.salary, answer.department_id], (err, results) => {
        if (err) throw err;
        console.log(`New role added: ${answer.title} has been added to department #${answer.department_id}.`);
        inquiryStart();
      });
    });
  });
}



//  FLAG TO DO
const addEmployee = () => {
  const sql = 'SELECT * FROM department INNER JOIN roles ON department.id = roles.department_id';
  db.query(sql, (err, results) => {
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
          let roleList = results.map(({ title, id }) => ({ name: title, value: id }));
          return roleList;
        }
      },

      // FLAG FIX THIS BELOW
      {
        type: 'list',
        name: 'manager',
        message: "Who is the manager of the new employee?",
        choices: function () {
          let managerList = results.map(choice => ({ name: (choice.first_name) + " " + (choice.last_name), value: choice.id }));
          return managerList;
        }
      }
    ]).then((answer) => {
      const sql2 = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;
      db.query(sql2, [answer.first_name, answer.last_name, answer.roles_id, answer.manager_id], (err, results) => {
        if (err) throw err;
        console.log(`New employee added: ${answer.first_name}" "${answer.last_name}.`);
        inquiryStart();
      });
    });
  });
}

// FLAG NEXT TO COMPLETE?
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

// FLAG TO DO OPTIONAL
const updateEmployeeManager = () => {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: function () {
          let employeeList = results.map(choice => ({ name: (choice.first_name) + " " + (choice.last_name), value: choice.id }));
          return employeeList;
        }
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is the new manager of the employee?',
        // MAKE THE MANAGER LIST PLZ (because like, it's needed both here and probably for "show employees" anyway)
        choices: function () {
          let managerList = results.map(choice => ({ name: (choice.first_name) + " " + (choice.last_name), value: choice.id }));
          return managerList;
        }
      },
    ]).then((answer) => {
      const sql2 = `UPDATE employee SET manager_id = ? WHERE id = ?`
      db.query(sql2, [answer.manager, answer.employee], (err, results) => {
        if (err) throw err;
        console.log(`Employee manager updated: employee #${answer.employee}'s manager is now manager #${answer.manager}.`)
      });
      inquiryStart();
    });

  });
}


const deleteDepartment = () => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;

    // Create an array of objects with a name and value property for each row


    // Ask the user to select a value to delete from the list
    inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Select a department to delete:',
        choices: function () {
          let departmentList = results.map(({ department_name, id }) => ({ name: department_name, value: id }))
          return departmentList;
        }
      }
    ]).then((answer) => {
      // Construct the SQL query to delete the row with the specified ID
      console.log("+    +    +    +    +    +    +");
      console.log("Department successfully purged!");
      console.log("+    +    +    +    +    +    +");
      const sql = `DELETE FROM department WHERE id = ${answer.department}`;

      // Execute the SQL query
      db.query(sql, (err, result) => {
        if (err) throw err;
        listDepartments();
      });
    });
  });
};

launchManager();
