const inquirer = require('inquirer');

// const teamMembers = [];

const promptUser = () => {
    return inquirer
    .prompt([
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'View all employees by department', 'Add a Department', 'View total utilized department by budget', 'Add a role', 'Add an employee', 'Update an employee role' ]
    }
    ])
    .then((answers) => {
        if (answers.mainMenu === 'View all departments') {
            console.log(answers);
        }
        if (answers.mainMenu === 'View all roles') {
            console.log(answers);
        }
        if (answers.mainMenu === 'View all employees') {
            console.log(answers); 
        }
        if (answers.mainMenu === 'View all employees by department') {
            console.log(answers);  
        }
        if (answers.mainMenu === 'Add a Department') {
            console.log(answers); 
        }
        if (answers.mainMenu === 'View total utilized department by budget') {
            console.log(answers); 
        }
        if (answers.mainMenu === 'Add a role') {
            console.log(answers); 
        }
        if (answers.mainMenu === 'Add an employee') {
            console.log(answers); 
        }
        if (answers.mainMenu === 'Update an employee role') {
            console.log(answers); 
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