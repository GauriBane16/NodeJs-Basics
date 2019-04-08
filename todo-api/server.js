var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('underscore');
var todoNextId = 1;

var todos = [];

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("TODO api...!!!");
})

// /todolist?completed=true&q=work
app.get('/todolist', function (req, res) {
  var queryParams=req.query;
  console.log("queryParams",queryParams);
  var filteredTodos=todos;
  console.log("todos",todos);
   if(queryParams.hasOwnProperty('completed') && queryParams.completed==='true')
      filteredTodos=_.where(filteredTodos,{completed:true});
   else if(queryParams.hasOwnProperty('completed') && queryParams.completed==='false')
      filteredTodos=_.where(filteredTodos,{completed:false});
  if(queryParams.hasOwnProperty('q')){
      filteredTodos = _.filter(filteredTodos, function(todo){ return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) !==-1; });
    }
   
  if (filteredTodos.length == 0)
    res.status(404).send("No data");
  else
    res.json(filteredTodos);

})

//Get todo by id
app.get('/todoById/:id', function (req, res) {
  var todoId = parseInt(req.params.id, 10);
  // var todoTupple=todos.find(x => x.id===todoId);
  var todoTupple = _.findWhere(todos, { id: todoId });
  if (!todoTupple)
      return res.status(404).send("No todo found for id=" + todoId);
  res.send(todoTupple);
})

//Add new todo
app.post('/addTodo', function (req, res) {
  var body = _.pick(req.body, 'description');
  var todoTupple = _.findWhere(todos, { description: body.description.trim() });
  console.log("Body", body);
  if (!_.isString(body.description) || body.description.trim().length === 0)
    return res.status(400).send({ message: "Bad Request" });
  // var validData=_.pick(req.body,'description')  
  if(todoTupple)
     return res.send("This todo is already existed.");
  body.description = body.description.trim()
  body.completed = false;
  body.id = todoNextId++;
  todos.push(body);

  // res.json(body);
  res.send({ message: "Added successfully" });
 
})

//Delete todo by id
app.delete('/delete/:id',function(req,res){
  var todoId=parseInt(req.params.id,10);
  if(!todoId)
  return res.status(400).send("Bad request");
   // var todoTupple=todos[todos.findIndex(x => x.id===todoId)]
  var todoTupple = _.findWhere(todos, { id: todoId });
  // var todoIdIndex=_.indexOf(todos,todoTupple);
  // todos.splice(todoIdIndex,1);
  if(!todoTupple)
    return res.status(404).json({error:"No todo found with that id"});
   todos=_.without(todos,todoTupple);
  res.send({message:'todo is deleted successfully'})
})

//Update todo by id

app.put('/update/:id',function (req,res){
  var body = _.pick(req.body, 'description','completed');
  var todoId=parseInt(req.params.id,10);
  if(!todoId)
    return res.status(400).send("Bad request");
  var todoTupple = _.findWhere(todos, { id: todoId });  
  if(!todoTupple)
     return res.status(404).send("No todo found with that id");

  if ((!body.hasOwnProperty('description') || !_.isString(body.description) || body.description.trim().length === 0) && (!body.hasOwnProperty('completed') || !_.isBoolean(body.completed)))
    return res.status(400).send({ message: "Bad Request" });

    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length!==0)
       body.description=body.description.trim();  
    _.extend(todoTupple,body);
  //todoTupple.description=body.description.trim();
    return res.send({ message: "Todo is updated" ,data:todoTupple});
})

//Update todo status by id

app.put('/updateStatus/:id',function (req,res){
  var body = _.pick(req.body, 'completed');
  var todoId=parseInt(req.params.id,10);
  if(!todoId)
    return res.status(400).send("Bad request");
  var todoTupple = _.findWhere(todos, { id: todoId });  
  if(!todoTupple)
     return res.status(404).send("No todo found with that id");
  if (!body.hasOwnProperty('completed') || !_.isBoolean(body.completed))
    return res.status(400).send({ message: "Bad Request" });
    body.completed=body.completed;  
    _.extend(todoTupple,body);
  //todoTupple.description=body.description.trim();
    return res.send({ message: "Todo is updated" ,data:todoTupple});
})

app.listen(PORT, function () {
  console.log("Express server running on " + PORT);
});