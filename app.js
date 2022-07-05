const inquirer = require('inquirer');

// const teamMembers = [];

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
            console.log(answers);
            // table of id, first_name, last_name, title (role), department, salary, and manager
            // View all employees by department
            // View all employees by manager
        }
        if (answers.mainMenu === 'Add an employee') {
            console.log(answers); 
            // what is the employee's first name?
            // what is the employee's last name?
            // what is the employee's role?
                // provided with list of roles
            // who is the employee's manager?
                // provided with list of employees
            // added "name" to the database.
        }
        if (answers.mainMenu === 'Update an employee role') {
            console.log(answers); 
            // Which employee's role would you like to update?
            // list of employees
            // Which role do you wnat to assign the selected employee?
            // list of roles

        }
        if (answers.mainMenu === 'View all roles') {
            console.log(answers);
            // table with ID, Role Title, department, and salary
            // Update managers

        }
        if (answers.mainMenu === 'Add a role') {
            console.log(answers); 
            // what is the name of the role?
            // what is the salary of the role?
            // what department does the role belong to? (list)
            // added <role> to the <department>ing department.
        }
        if (answers.mainMenu === 'View all departments') {
            console.log(answers);
            // table with ID, and name of roles (Engineering, Finance, Legal, Sales)
            // another option to delete departments, roles, and employees
            // another option to view total utilized budget of a department
        }
        if (answers.mainMenu === 'Add a Department') {
            console.log(answers); 
            // what is the name of the department?
            // added <department name> to the database
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
        //     return
        })
};

promptUser();