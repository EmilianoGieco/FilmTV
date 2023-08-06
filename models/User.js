//1.guardar al usuario en la DB
//2.buscar al ususario que se quiere loguear por su email
//3.buscar al usuario por su ID
//4.editar la informacion de un usuario
//5.eliminar a un usuario de la BD

//CRUD...create/read/update/delete
const fs = require("fs");

const User = {
    fileName: "./data/users.json",

    getData: function () {
        return fs.readFileSync(this.fileName, "utf-8");
    },

    create: function (userData) {

    }
}

/*const { Console } = require("console");
const fs = require("fs");

const user = {
    fileName: "./data/users.json",
    getData: function(){
        return JSON.parse (fs.readFileSync(this.fileName, "utf-8"));
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop ();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
         
    },

    findAll: function(){
        return this.getData();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find( oneUser => oneUser.id === id )
        return userFound 
    }, 
    
    //preguntar como hacer para que traiga mas de un users//

    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find( oneUser => oneUser[field] === text )
        return userFound 
    
    },

    create : function (userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData 
        }
        allUsers.push(userData);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
        return true;

    },
}


console.log(user.create({ name: "juana", emanil: "juana@dh.com"}));*/