use employees_db;

INSERT INTO departments
    (name)
VALUES 
    ('Finance'),
    ('Sales'), 
    ('Legal'),
    ('Service'),
    ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", "100000", 2),
       ("Salesperson", "80000", 2),
       ("Lead Engineer", "150000", 5),
       ("Software Engineer", "120000", 5),
       ("Account Manager", "160000", 2),
       ("Accountant", "125000", 1),
       ("Legal Team Lead", "250000", 3),
       ("Lawyer", "190000", 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Yasmin", "Ali", 3, null),
       ("Josh", "Rose", 4, 1);
    
