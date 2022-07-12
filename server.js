const inquirer = require('inquirer');
const { removeListener } = require('./db/connection');
// const db = require('./db/connection');
const cTable = require('console.table');
const db = require('./db');
const { findAllDepartments, addEmployeeList } = require('./db');
// const { addNewDepartment, deleteRole } = require('./db');

const init = () => {
    console.log(`
     ,---------------------------------------------------.
     |                                                   |
     |   _____                 _                         |
     |  |  ___|_ __ ___  _ __ | | ___  _   _  ___  ___   |
     |  |   _|| '_ ' _  | '_  | |/    | | | |/ _ |/ _ |  |
     |  |  |__| | | | | | |_) | | (_) | |_| |  __/  __/  |
     |  |_____|_| |_| |_| ,__/|_| ___/  __, | ___| ___|  |
     |                  |_|            |___/             |
     |   __  __                                          |
     |  |  | |  | __ _ _ __   __ _   __ _  ___ _ __      |
     |  | | | | |/ _' | '_  |/ _' |/ _' |/ _ | '__|      |
     |  | |   | | (_| | | | | (_| | (_| |  __/ |         |
     |  |_|   |_| __,_|_| |_| __,_| __, | ___|_|         |   
     |                             |___/                 |
     |                                                   |
     '---------------------------------------------------' `)
    console.log('\n')
    promptUser()
}

const allEmployees = () => {
    db.findAllEmployees().then(data => {
        console.log("\n \n")
        console.table(data[0]);
    })
    promptUser()
}
const allRoles = () => {
    db.findAllRoles().then(data => {
        console.log("\n \n");
        console.table(data[0]);
    })
    promptUser();
}
const allDepartments = () => {
    db.findAllDepartments().then(data => {
        console.log("\n \n")
        console.table(data[0]);
    })
    promptUser()
}

const addDepartmentPrompt = () => {
    return inquirer
        .prompt([
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

const addRolePrompt = () => {
    db.addRole().then(departmentArray => {
        let departmentChoices = departmentArray[0].map(department => ({ name: department.name, value: department.id }))
        return inquirer
            .prompt([
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
                    choices: departmentChoices
                }
            ])
            .then(rawRoles => {
                console.log(rawRoles)
                let role = [rawRoles.title, rawRoles.salary, rawRoles.department_id];
                console.log(role)
                db.addNewRole(role).then(() => {
                    console.log("\n");
                    console.log(`${rawRoles.title} added as a new role!`);
                    console.log("\n");
                    promptUser()
                })
            })
    })
}

const addEmployeePrompt = () => {
    db.addEmployeeRole().then(roleArray => {
        let roleChoices = roleArray[0].map(role => ({ name: role.title, value: role.id }))
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
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roleChoices
            }
        ])
            .then(incompleteEmployees => {
                console.log(incompleteEmployees)
                const employee = Object.values(incompleteEmployees);
                console.log(employee)
                db.addEmployeeManager()
                    .then(managerArray => {
                        let managerChoices = managerArray[0].map(manager => ({ name: manager.manager, value: manager.id }))
                        return inquirer.prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: 'To which manager does this employee report?',
                                choices: managerChoices
                            }
                        ])
                            .then(employeeManager => {
                                let employeeManagerID = employeeManager.manager;
                                employee.push(employeeManagerID)
                            })
                            .then(employeeInput => {
                                console.log(employee)
                                db.addNewEmployee(employee).then(() => {
                                    console.log("\n \n")
                                    console.log(`New employee added!`)
                                    promptUser()
                                })
                            })
                    })
            })
    })
}

const updateEmployeePrompt = () => {
    db.addEmployeeList().then(employeeArray => {
        let employeeChoices = employeeArray[0].map(employee => ({ name: employee.employee, value: employee.id }))
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Please select employee you would like to update',
                    choices: employeeChoices
                }
            ])
            .then(incompleteEdit => {
                console.log(incompleteEdit)
                const update = Object.values(incompleteEdit);
                console.log(update)
                db.addEmployeeRole()
                    .then(roleArray => {
                        let roleChoices = roleArray[0].map(role => ({ name: role.title, value: role.id }))
                        return inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'role',
                                    message: 'What is their new role?',
                                    choices: roleChoices
                                }
                            ])
                            .then(employeeNewRole => {
                                let employeeRole = employeeNewRole.role;
                                console.log(employeeRole)
                                update.unshift(employeeRole)
                                console.log(update)
                                // update.push(employeeRole)
                            })
                            .then(updateFinished => {
                                console.log(update)
                                db.updateEmployee(update).then(() => {                                console.log("\n \n")
                                console.log(`Employee updated!`)
                                promptUser()
                            })
                        })
                    })
            })
        })
    }

const promptUser = () => {
            return inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'mainMenu',
                        message: 'What would you like to do?',
                        choices: [
                            'View all employees',
                            'Add an employee',
                            'Update an employee role',
                            'View all roles',
                            'Add a role',
                            'View all departments',
                            'Add a Department',
                            'Exit']
                    }
                ])
                .then((answers) => {
                    if (answers.mainMenu === 'View all employees') {
                        allEmployees()
                    }
                    if (answers.mainMenu === 'Add an employee') {
                        addEmployeePrompt()
                    }
                    if (answers.mainMenu === 'Update an employee role') {
                        updateEmployeePrompt()
                    }
                    if (answers.mainMenu === 'View all roles') {
                        allRoles()
                    }
                    if (answers.mainMenu === 'Add a role') {
                        addRolePrompt()
                    }
                    if (answers.mainMenu === 'View all departments') {
                        allDepartments()
                    }
                    if (answers.mainMenu === 'Add a Department') {
                        addDepartmentPrompt()
                    }
                    if (answers.mainMenu === 'Exit') {
                        return;
                    }
                })
        };

        init();