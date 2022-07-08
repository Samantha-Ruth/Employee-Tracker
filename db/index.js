const connect = require("./connection");

class Queries {
    constructor (connection) { 
        this.connection = connection
    }
    findAllRoles () { 
        console.log("Query hit!!!");
        return this.connection.promise().query(`SELECT * FROM role;`)
    }
    findAllEmployees () {
        console.log("Employee Query hit!!!");

    }
    findAllDepartments() {
        console.log("Department Query hit!!!");

    }
    

}

module.exports = new Queries(connect);

