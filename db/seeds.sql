INSERT INTO department (department_name)
('Accounting'),
('IT & Infrastructure'),
('Legal & Subterfuge'),
('Marketing & Sales'),
('Operations'),
('Security & Oversight'),
('Human Resources & Inquisition');

INSERT INTO roles (title, salary, department_id)
VALUES
('Accountant', 110000, 1),
('Auditor', 90000, 1),
('Budget Analyst', 85000, 1),
('Accounts Payable Specialist', 125000, 1),
('Junior Developer', 75000, 2),
('Full Stack Developer', 100000, 2),
('Systems Engineer', 85000, 2),
('Some Kind of Wizard', 105000, 2),
('Counsel on Retainer', 170000, 3),
('Lead Counsel', 320000, 3),
('Paralegal', 70000, 3),
('Sales Associate', 95000, 4),
('Copywriter', 80000, 4),
('Accounts Manager', 90000, 4),
('Social Media & Email Harassment', 65000, 4),
('Creative Director', 205000, 4),
('Project Annihilator', 225000, 5),
('Personal Assistant', 55000, 5),
('Chief Operating Operator', 500000, 5),
('Chief Employee Overseer', 150000, 6),
('Concierge', 85000, 6),
('Louie', 120000, 6),
('Staffing Coordinator', 90000, 7),
('HR Associate', 75000, 7),
('High Inquisitor & Adjudicator', 450000, 7);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Alex', 'Pereira', 1, null),
('Benjamin', 'Graham', 2, 1),
('Harlan', 'Lopez', 3, null),
('Barry', 'Whitmore', 4, 2),

('Cynthia', 'Macklemore', 5, null),
('Karen', 'Delanni', 6, 3),
('Radi', 'Silva', 7, null),
('Milly', 'Dober', 8, 4),

('Carlton', 'Jameson', 9, null),
('Whitley', 'McCracken', 10, 5),
('Gilly', 'Olsen', 11, null),

('Erika', 'Cho', 12, null),
('Saritha', 'Patel', 13, null),
('Pete', 'Galveson', 14, null),
('Zoe', 'Jedrzejczyk', 15, null),
('Angus', 'Nogueira', 16, 7),

('Carla', 'Mariopa', 17, 8),
('Dewey', 'Snow', 18, null),
('Markham', 'St. Pierre', 19, 9),

('Dewey', 'Bigglesworth', 20, 10),
('Felicia', 'Chiang', 21, null),
('Louie', 'Zee', 22, null),

('Antonina', 'Shevchenko', 23, null),
('Scarla', 'Tohsaka', 24, null),
('Archaea', 'Terminus', 25, 12);
