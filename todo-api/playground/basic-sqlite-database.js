var Sequelize=require('sequelize');
var sequelize=new Sequelize(undefined,undefined,undefined,{
    dialect:'sqlite',
    storage:'basic-sqlite-database.sqlite'
});

var Todo=sequelize.define('todo',{
    description:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            // notEmpty:true
            len:[1,256]
        }
    },
    completed:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
})
//sequelize.sync({force:true}).then(function (){ --> to drop previous table & sync again
sequelize.sync({force:true}).then(function (){
    console.log("Everything is synced");
    Todo.create({
        description:"Meet mom for lunch",
        // completed:false
    }).then(function(todo){
        return Todo.create({
            description:"Clean home"
        })
    }).then(function(todo){
          console.log("Finished");
        console.log("todo",todo);
    })
    .catch(function (e){
        console.log(e);
    })
})