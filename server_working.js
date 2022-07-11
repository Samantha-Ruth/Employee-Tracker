
// const inquirer = require('inquirer');
// // const { removeListener } = require('./db/connection');
// // const db = require('./db/connection');
// const cTable = require('console.table');
// const db = require('./db');
// const { addNewDepartment, deleteRole } = require('./db');


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

// const promptDepartmentOptions = () => {
//     return inquirer.prompt([
//         {
//             type: 'confirm',
//             name: 'departmentOptions',
//             message: 'Do you want to add, delete, or edit a department?',

//             type: confirm
//             name: 'addDepartment',
//             message: 'Do you want to add a department?',


//             type:
//             name: 'editDepartment',
//             message: 'Do you want to edit a department?',

//             when: 
//             type: 'input',
            
//             type: 
//             name: 'deleteDepartment',
//             message: 'Do  you want to delete a department?'
//             choices: ['Add a department', 'Delete a department', 'Edit a department', 'Return to main menu']
//         }
//     ])
// }

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
            type: 'input',
            name: 'department_id',
            message: 'To what department does this role belong? Please enter the corresponding number: 1. Engineering, 2. Finance, 3. Legal, 4. Sales',
            // validate: value => {
            //     const pass = value.match(/1||2||3||4/i);
            //     if (pass) {
            //         return true;
            //     } else {
            //         console.log('Please enter corresponding number');
            //         return false;
            //     }
            // }
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
            message: "What is the employee's role? Please enter corresponding number: 1. Sales Lead, 2. Salesperson, 3. Lead Engineer, 4. Software Engineer, 5. Account Manager, 6. Accountant, 7. Legal Team Lead, 8. Lawyer",
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
            type: 'input',
            name: 'manager',
            message: 'To what manager does this employee report? Please enter corresponding number: 1. John Doe, 2. Mike Chan, 3. Ashley Rodriquez, 4. Kevin Tupik, 5. Kunal Singh, 6. Malia Brown',
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
                    addEmployeePrompt()
                        .then(rawEmployees => {
                            console.log(rawEmployees)
                            const employee = Object.values(rawEmployees);
                            console.log(employee)
                             db.addNewEmployee(employee).then(() => {
                                console.log("\n");
                                console.log(`${rawEmployees.first_name} added as a new employee!`);
                                console.log("\n");
                                promptUser()
                            })
                        })
                    }
    
                    // ALTER TABLE
                    // what is the name of the role?
                    // what is the salary of the role?
                    // what department does the role belong to? (list)
                    // added <role> to the <department>ing department.

                // INSERT INTO
                // what is the employee's first name?
                // what is the employee's last name?
                // what is the employee's role?
                // provided with list of roles
                // who is the employee's manager?
                // provided with list of employees
            
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
                promptDepartmentOptions();

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