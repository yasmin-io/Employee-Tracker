DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees; 
USE employees; 

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY, /* Links with  departtment_id on role table*/
    name VARCHAR(30),
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, /* Links with role_id on employee table*/
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, /* Links with manager_id*/
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);