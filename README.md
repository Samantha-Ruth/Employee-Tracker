# Employee-Tracker

## Description

This project uses a combination of node, inquirer package, npm console.table, SQL, mysql2, to create an accessible database.

This project was a great introductionto SQL.  I practiced creating schemas and seed files, as well as learning the SQL language, using join to create database tables and other queries to edit and delete the data.  I also worked with npm inquirer again, as well as learned about creating a connection to the server using constructors.  

Screen Shot of Command Line:
![Screenshot of Application](https://user-images.githubusercontent.com/64170123/178384580-7d8837a6-875f-437a-86da-308b57351e3d.jpg)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Links](#links)
* [Questions](#questions)

## Installation

If the user already has node installed on their device, they can download this project and run "npm init" and then "npm install --save inquirer@^8.0.0 (** please note: newer versions of inquirer will not work properly with this program!), and then npm install console.table --save.  After this, install --save mysql2. In order to protect passwords, the user will also wan to "install dotenv" as well. 

In order to access the mysql2 shell,  the user needs to create a .env file with the following, replacing <username> and <user password> with the users own username and password: 
  
DB_NAME=ecommerce_db

DB_USER= < username >

DB_PASSWORD= < user password >


To ensure the user is connected to the correct database, navigate to the root folder of the project, and then open the mysql2 shell and enter "source db/schema.sql".  Then enter "source db/seeds.sql" to seed the database file. Exit the mysql2 shell by entering "exit" into the command line.

Finally, connect the server by entering "npm start" into the command line.

## Usage

The user will be presented with a list of options regarding an employee database.  They can view all departments, roles, and employees, as well as add departments, roles, and employees.  The user gets access to the database using the console line and can adjust data as desired.  

Image of employee table":
![Screenshot of Employees](https://user-images.githubusercontent.com/64170123/178384602-b23ed9db-53fc-4b43-bddb-ff2b0be9d63b.jpg)


Image of roles table:
![Screenshot of Roles](https://user-images.githubusercontent.com/64170123/178384607-947f2266-b47b-4e36-9501-3afddf20a915.jpg)

Image of department table:
![Screen shot of department](https://user-images.githubusercontent.com/64170123/178384619-b45b8c5f-d782-419e-8d42-2880d87f9c9f.jpg)




## Links


Link to video of project: https://drive.google.com/file/d/15iPjD0eDP5efbM6klVUt2U8oNl0m97Pz/view


The url of the Git repository is here: https://github.com/Samantha-Ruth/Employee-Tracker


## Questions

If you have any questions about the repo, open an issue or you can find more of my work at (https://gitHub.com/Samantha-Ruth).


