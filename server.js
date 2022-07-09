const inquirer = require('inquirer');
// const { removeListener } = require('./db/connection');
// const db = require('./db/connection');
const cTable = require('console.table');
const db = require('./db');
const { addNewDepartment } = require('./db');

const departmentAdd = [];


const viewAllRoles = () => {
    db.findAllRoles().then(data => {
        console.table(data[0]);
    })
}

const viewAllEmployees = () => {
    db.findAllEmployees().then(data => {
        console.table(data[0]);
    })
}

const viewAllDepartments = () => {
    db.findAllDepartments().then(data => {
        console.table(data[0]);
    })
}

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

const addDepartment  = () => {

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
            viewAllEmployees()
            // ADD EMPLOYEEPROMPT()
            // View all employees by department
                // SELECT * employees JOIN ROLE and DEPARTMENT, then SORT
            // View all employees by manager
                // SELECT * employees, SORT by manager ID, but also join manager name from within table
            promptUser()
                //     {
                //         type: 'confirm',
                //         name: 'updatedEmployee',
                //         message: 'What would you to update an employee role?',
                //         choices: ['View all employees', 'Add an employee', 'Update an employee role', 'View all roles', 'Add a role', 'View all departments', 'Add a Department', 'Exit']
                //     }
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
            db.query(sql, params, (err,result) => {
                if(err){
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
            viewAllRoles();
                promptUser();
            // JOIN department ID with actual DEPARTMENT NAME Need to link department id with department name
            // table with ID, Role Title, department, and salary
        }

        if (answers.mainMenu === 'Add a role') {
            console.log(answers); 
            // ALTER TABLE
            // what is the name of the role?
            // what is the salary of the role?
            // what department does the role belong to? (list)
            // added <role> to the <department>ing department.
        }
        if (answers.mainMenu === 'View all departments') {
            viewAllDepartments();
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
                console.log(dept)
                db.addNewDepartment(dept).then(() => {
                promptUser()
                })
            })
            // message: "Added <new department> to the database"
            // promptUser()
//             console.log(answers); 
//             -- INSERT INTO department (id, name)
// --              VALUES (15, 'Customer Service');
        }
        if (answers.mainMenu === 'Exit') {
            return;
        }
        // }
        // if (answers.newTeamMember === 'Intern') {
        //     promptIntern()
        // }
        // if (answers.newTeamMember === "I don't want to add any more team members") {
        //     console.log(teamMembers);
        //     writeFile(generateHtml(teamMembers));

        //     // managerName = (teamMembers[0].managerName);
        //     // console.log(managerName);
        })
};

promptUser();