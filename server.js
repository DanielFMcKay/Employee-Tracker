// Code Goes Here
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


require('dotenv').config()

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: root,
    // MySQL password
    password: db_password,
    database: employee_db
  },
  console.log(`Connected to the employee_db database.`)
);

connection.connect(err => {
  if (err) throw err;
  console.log('connection failed, reason pending')
  launchManager();
});

// I kinda wish I was better at ASCII art, but this will do now now
const launchManager = () => {
  console.log('++++++++++++++++++++++++++++++++');
  console.log('+                              +');
  console.log('+       Employee Tracker       +');
  console.log('+                              +');
  console.log('++++++++++++++++++++++++++++++++');
  inquiryStart();
}

// now for the inquirer questions
inquiryStart = () => {
  inquirer.prompt([
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
        'Delete a Role',
        'Exterminate an Employee',
        'View Department Budget',
        'Exit'
      ]
    }
  ]).then((answers) => {
    const { actions } = answers;

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
      connection.end();
    };
  });
};

// IN PROGRESS

// Now for functions

const listDepartments = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (error, res) => {
    if (error) throw error;
    console.table(res);
    inquiryStart();
  });
}

const listRoles = () => {
  const sql = `SELECT * FROM role`;

  db.query(sql, (error, res) => {
    if (error) throw error;
    console.table(res);
    inquiryStart();
  });
}

const listEmployees = () => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (error, res) => {
    if (error) throw error;
    console.table(res);
    inquiryStart();
  });
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the new department you would like to add?'
    }
  ]).then((answer) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    db.query(sql, answer.department, (error, res) => {
      if (error) throw error;
      console.log(`New department added: ${answer.department}.`);
      inquiryStart();
    });
  });
}

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',  
      name: 'first_name',
      message: 'What is the first name of the new employee you would like to add?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee you would like to add?'
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'What is the role of the new employee you would like to add?',
      choices: function () {
        // will get back to  this
      }


      
// in progress, looking to add a prompt for which department the new role will be added to

// const addRole = () => {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'role',
//       message: 'What is the name of the new employee role you would like to add?'

  
