const connect = require("./connection");

class Queries {
    constructor(connection) {
        this.connection = connection
    }
    findAllRoles() {
        console.log("Query hit!!!");
        return this.connection
        .promise()
        .query(`SELECT role.id, role.title, department.name AS department, role.salary
        FROM role 
        LEFT JOIN department ON role.department_id = department.id;`)
    }
    findAllEmployees() {
        return this.connection
            .promise()
            .query
            (`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ',manager.last_name) AS manager
            FROM employee 
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id;`)
    }
    findAllDepartments() {
        console.log("Department Query hit!!!");
        return this.connection.promise().query(`SELECT * FROM department;`)
    }
    addNewDepartment (departmentAdd) {
        // console.log("Adding Department!");
        return this.connection
        .promise()
        .query
        (`INSERT INTO department (name)
        VALUES (?);`, departmentAdd)
    }
    addRole (departmentArray) {
        return this.connection
        .promise()
        .query
        (`SELECT * FROM department`, (departmentArray))
    }
    addNewRole (role) {
        return this.connection
        .promise()
        .query
        (`INSERT INTO role (title, salary, department_id)
        VALUES (?,?,?);`, role)
    }
    addNewEmployee (employee) {
        return this.connection
        .promise()
        .query
        (`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?);`, employee)
    }

    
    deleteDepartment() {
        console.log("Delete Department Query hit!!!");
        return this.connection.promise().query(`DELETE FROM department WHERE id = ?`)
    }
    deleteRole() {
        return this.connection.promise().query(`DELETE FROM role WHERE id = ?`)

    }
    deleteEmployee() {
        return this.connection.promise().query(`DELETE FROM employee WHERE id = ?`)

    }

}

module.exports = new Queries(connect);

