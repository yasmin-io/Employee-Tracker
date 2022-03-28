use employees_db;

INSERT INTO departments
    (name)
VALUES 
    ('Finance'),
    ('Sales'), 
    ('Legal'),
    ('Service'),
    ('Engineering'),
    ('Management');

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", "100000", 2),
       ("Salesperson", "80000", 2),
       ("Lead Engineer", "150000", 5),
       ("Software Engineer", "120000", 5),
       ("Account Manager", "160000", 2),
       ("Sales Manager", "100000", 6),
       ("IT Manager", "180000", 6),
       ("Accountant", "125000", 1),
       ("Legal Team Lead", "250000", 3),
       ("Lawyer", "190000", 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Yasmin", "Ali", 3, null),
       ("Josh", "Rose", 4, 2),
       ("Tiger-Lilly", "Attree", 2, 1),
       ("Sarah", "Williams", 4, null),
       ("Mark", "Bentree", 9, 2),
       ("Fatema", "Hussain", 8 ,2),
       ("Darius", "Shaffri", 2, 1),
       ("Ella", "Smith", 2, 1),
       ("Taylor", "Lee", 3, null);

    
