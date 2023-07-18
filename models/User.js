const { Console } = require("console");
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


console.log(user.create({ name: "juana", emanil: "juana@dh.com"}));