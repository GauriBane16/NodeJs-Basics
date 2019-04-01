var express=require('express');
var app=express();
var PORT=process.env.PORT || 3000;
var bodyParser=require('body-parser');
var todoNextId=1;

var todos=[];

app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send("TODO api...!!!");
})

app.get('/todolist',function(req,res){
    if(todos.length==0)
      res.status(200).send("No data");
    else
      res.json(todos);  
})

app.get('/todoById/:id',function(req,res){
    var todoId=parseInt(req.params.id,10);
    var todoTupple=todos.find(x => x.id===todoId);
    if(todoTupple)
      res.send(todoTupple);
    else
      res.status(200).send("No todo found for id="+todoId)  ;
})

app.post('/addTodo',function(req,res){
    var body=req.body;
    console.log("Body",body);
    if(body){
        body.completed=false;
        body.id=todoNextId++;
        todos.push(body);
      
        // res.json(body);
         res.send({message:"Added successfully"});
    }else{
        res.status(400).send({message:"There is no todo to add"});
    }
})



app.listen(PORT,function(){
    console.log("Express server running on "+PORT);
});