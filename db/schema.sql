DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db; 
USE employees_db; 

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, /* Links with  departtment_id on role table*/
    name VARCHAR(30) NOT NULL,
);

 CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, /* Links with role_id on employee table*/
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, /* Links with manager_id*/
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);