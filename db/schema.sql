DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db; 
USE employees_db; 

CREATE TABLE departments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, /* Links with  departtment_id on role table*/
    name VARCHAR(30) NOT NULL
);

 CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, /* Links with role_id on employee table*/
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT UNSIGNED, /* Links to department */
    INDEX department_index (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, /* Links with manager_id*/
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT,
   INDEX role_indexROLE_INDEX (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
   INDEX manager_index (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);