INSERT INTO department (department_name)
VALUES
('Accounting'),
('IT & Infrastructure'),
('Legal & Subterfuge'),
('Marketing & Sales'),
('Operations'),
('Security & Oversight'),
('Human Resources & Inquisition');

INSERT INTO roles (title, salary, department_id)
VALUES
('Budget Analyst', 85000, 1),
('Accountant', 110000, 1),
('Auditor', 90000, 1),
('Accounts Payable Specialist', 125000, 1),

('Some Kind of Wizard', 105000, 2),
('Junior Developer', 75000, 2),
('Full Stack Developer', 100000, 2),
('Systems Engineer', 85000, 2),

('Lead Counsel', 320000, 3),
('Counsel on Retainer', 170000, 3),
('Paralegal', 70000, 3),
('Creative Director', 205000, 4),
('Sales Associate', 95000, 4),
('Copywriter', 80000, 4),
('Accounts Manager', 90000, 4),
('Social Media & Email Harassment', 65000, 4),

('Chief Operating Operator', 500000, 5),
('Project Annihilator', 225000, 5),
('Personal Assistant', 55000, 5),

('Chief Employee Overseer', 150000, 6),
('Concierge', 85000, 6),
('Louie', 120000, 6),
('High Inquisitor & Adjudicator', 450000, 7),
('Staffing Coordinator', 90000, 7),
('HR Associate', 75000, 7);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
('Alex', 'Pereira', 1, null),
('Benjamin', 'Graham', 2, 1),
('Harlan', 'Lopez', 3, 1),
('Barry', 'Whitmore', 4, 1),

('Cynthia', 'Macklemore', 5, null),
('Karen', 'Delanni', 6, 5),
('Radi', 'Silva', 7, 5),
('Milly', 'Dober', 8, 5),

('Whitley', 'McCracken', 9, null),
('Carlton', 'Jameson', 10, 9),
('Gilly', 'Olsen', 11, 9),

('Erika', 'Cho', 12, null),
('Saritha', 'Patel', 13, 12),
('Pete', 'Galveson', 14, 12),
('Zoe', 'Jedrzejczyk', 15, 12),
('Angus', 'Nogueira', 16, 12),

('Carla', 'Mariopa', 17, null),
('Dewey', 'Snow', 18, 17),
('Markham', 'St. Pierre', 19, 17),

('Dewey', 'Bigglesworth', 20, null),
('Felicia', 'Chiang', 21, 20),
('Louie', 'Zee', 22, null),

('Archaea', 'Terminus', 23, null),
('Antonina', 'Shevchenko', 24, 23),
('Scarla', 'Tohsaka', 25, 23);

