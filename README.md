# 12 SQL: Employee Tracker

![image](https://img.shields.io/badge/License-MIT-slateblue.svg)

## by Dan McKay

# Overview

* This is an assignment for week 12 of BootCamp Spot's Full Stack Coding Bootcamp, as offered by UC Berkeley continuing education.

* This assignment is to make an Employee Tracker from scratch with a Command Line Interface using SQL tables and JavaScript Node. Per assignment criteria it allows the user to view departments, roles, and employees, as well as to additional departments, roles, and employees, and finally to update an employee's role. The changes can be confirmed within the interface. You can also exit the application and the data will remain as long as the CLI is still open and a new sql file hasn't overwritten them.

* Additionally, per extra-credit criteria, employees and departments can also be eliminated, and employees' managers can be updated as well.

* It also uses an .env file to separate the user's password. 

## Installation

* Inside the appropriate folder in the CLI of your choice, please execute 'git init -y' and then 'npm i' to install the correct packages declared in the package.json file to support the app. Note that the version of inquirer should only be 8.2.4 and not a later one, so if inquirer was entered manually, please revert to that one with the command "npm i inquirer@8.2.4". In addition to that one, main installations should be for dotenv, inquirer, express, mysql2, node, and console.table. Nodemon and sequelize are also installed in my app.

* Also, please add an .env file to the app with your sql password. The .env file should only need the single line: "db_password='fakepassword'" with your password replacing fakepassword and without the out

* Once this has been done, using the CLI, please log into mysql using 'mysql -u root -p' and then enter your password. Then run the line 'source db/schema.sql' and then 'source db/seeds.sql' to inject the app's data tables and dummy seed data. Then exit mysql.

## Application Launch

* The application can be launched in your Command Line Editor with either the command _npm start_ or _node server.js_. It is recommended there is an ample number of visible rows in the CLI to see what is happening, at least 12 or so.

## Walkthrough Demonstration Video

* https://drive.google.com/file/d/1Hrws0HorkeduX5luvLcBLimD8xoEE5ux/view

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### License
This app is licensed under [the MIT License](https://choosealicense.com/licenses/mit/) and is free to use "as is" under their terms and conditions, without warranty or liability.

(c) Copyright Dan McKay 2023
