import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var todoList = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {todoList: todoList});
});

app.post("/todo", (req, res) => {
    var todo = req.body.task;
    todoList.push(todo);
    console.log(todoList);
    res.redirect("/")
});

app.post("/checkTodo", (req, res) => {
    
    var completedTaskIndices = req.body.completeTodo;
    if(!Array.isArray(completedTaskIndices))
        completedTaskIndices = [completedTaskIndices]

    var completedTask = completedTaskIndices.map(index => todoList[index]);

    if(completedTask !== undefined){
        completedTask.forEach(task => {
            todoList = todoList.filter((completed) => completed !== task);
        });
    
        console.log("This is a test:", todoList);
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});