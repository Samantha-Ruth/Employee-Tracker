const inquirer = require('inquirer');
// const { removeListener } = require('./db/connection');
// const db = require('./db/connection');
const cTable = require('console.table');
const db = require('./db');
const { addNewDepartment, deleteRole } = require('./db');


const addDepartmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What department would you like to add?',
            validate: newDepartment => {
                if (newDepartment) {
                    return true;
                } else {
                    console.log('Please enter department name.');
                    return false;
                }
            }
        }
    ])
}

const addRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?',
            validate: newRole => {
                if (newRole) {
                    return true;
                } else {
                    console.log('Please enter new role.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log('Please enter a salary');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'To what department does this role belong?',
            choices: [2, 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
        }
    ])
    // .then((answers) => {
    // if (answers.department_id === 'Sales Lead') 
// })
}

const addEmployeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the new employee?',
            validate: first_name => {
                if (first_name) {
                    return true;
                } else {
                    console.log('Please enter first name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the new employee?',
            validate: last_name => {
                if (last_name) {
                    return true;
                } else {
                    console.log('Please enter last name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's role?",
            validate: role => {
                if (role) {
                    return true;
                } else {
                    console.log("Please enter employee's role");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'manager',
            message: 'To what manager does this employee report?',
            choices: ['name', 'somethinng', 'None']
        }
    ])
    // .then((answers) => {
    // if (answers.department_id === 'Sales Lead') 
// })
}


const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainMenu',
                message: 'What would you like to do?',
                choices: ['View all employees', 'Add an employee', 'Update an employee role', 'View all roles', 'Add a role', 'View all departments', 'Add a Department', 'Exit']
            }
        ])
        .then((answers) => {
            if (answers.mainMenu === 'View all employees') {
                db.findAllEmployees().then(data => {
                    console.log("\n \n")
                    console.table(data[0]);
                })
                promptUser()
            }
            if (answers.mainMenu === 'Add an employee') {
                console.log(answers);
                // INSERT INTO
                // what is the employee's first name?
                // what is the employee's last name?
                // what is the employee's role?
                // provided with list of roles
                // who is the employee's manager?
                // provided with list of employees
                const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
            VALUES (?,?,?,?,?)`;
                //  add above values into below params
                const params = [15, "Ronald", "Firbank", 1, 1];
                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                });
                // added "name" to the database.
            }
            if (answers.mainMenu === 'Update an employee role') {
                console.log(answers);
                // ALTER TABLE
                // ** EXAMPLE (need to check role and id values): 
                // UPDATE employee
                // SET role = 1
                // WHERE id = 3;

                // Which employee's role would you like to update?
                // list of employees
                // Which role do you wnat to assign the selected employee?
                // list of roles

            }
            if (answers.mainMenu === 'View all roles') {
                    db.findAllRoles().then(data => {
                        console.log("\n \n");
                        console.table(data[0]);
                    })
                promptUser();
            }

            if (answers.mainMenu === 'Add a Department') {
                addDepartmentPrompt()
                    .then(department => {
                        console.log(department)
                        let dept = department.newDepartment
                        console.log(dept)
                        db.addNewDepartment(dept).then(() => {
                            console.log("\n")
                            console.log(`${dept} added as a new department!`);
                            console.log("\n")
                            promptUser()
                        })
                    })
            }




            if (answers.mainMenu === 'Add a role') {
                addRolePrompt()
                    .then(rawRoles => {
                        console.log(rawRoles)
                        const role = Object.values(rawRoles);
                        console.log(role)
                         db.addNewRole(role).then(() => {
                            console.log("\n");
                            console.log(`${rawRoles.title} added as a new role!`);
                            console.log("\n");
                            promptUser()
                        })
                    })

                // ALTER TABLE
                // what is the name of the role?
                // what is the salary of the role?
                // what department does the role belong to? (list)
                // added <role> to the <department>ing department.
            }
            if (answers.mainMenu === 'View all departments') {
                db.findAllDepartments().then(data => {
                    console.log("\n \n")
                    console.table(data[0]);
                })
                promptUser();
            }
            // // another option to delete departments, roles, and employees
            // const sql = `DELETE FROM department WHERE id = ?`
            // const params = [req.params.id];
            // db.query(sql, params, (err, row) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     console.log(row);
            // }),
            // db.query(`DELETE FROM roles WHERE id = ?`, 1, (err,result) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     console.log(result);
            // }),
            // db.query(`DELETE FROM employees WHERE id = ?`, 1, (err,result) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     console.log(result);
            // })
            // *** EXAMPLE, numbers not correct
            // DELETE FROM employees
            // WHERE id = 3
            // another option to view total utilized budget of a department
            // This I don't know... how to tell when budget is utilized? 
            if (answers.mainMenu === 'Add a Department') {
                addDepartmentPrompt()
                    .then(department => {
                        let dept = department.newDepartment
                        db.addNewDepartment(dept).then(() => {
                            console.log("\n")
                            console.log(`${dept} added as a new department!`);
                            console.log("\n")
                            promptUser()
                        })
                    })
            }
            if (answers.mainMenu === 'Exit') {
                return;
            }
        })
};

promptUser();