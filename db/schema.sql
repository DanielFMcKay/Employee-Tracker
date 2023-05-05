DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db; 

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roles_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);