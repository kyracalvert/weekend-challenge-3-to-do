const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
    task: {type: String},
    date: {type: String},
    due_date: {type: String},
    notes: {type: String},
    complete: {type: Boolean, default: false},
});

const mongoURI = "mongodb://localhost:27017/taskapp";
const Task = mongoose.model('tasks', TaskSchema);

mongoose.connect(mongoURI, {useNewUrlParser: true});

mongoose.connection.on('open',() => {
    console.log('connected to Mongo');
});
mongoose.connection.on('error', (error) => {
    console.log('error connecting to Mongo', error);
});

// Configure body-parser for Angular and jQuery
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // This line is required for Angular

// Static files
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port:', PORT);
    
})

// POST
app.post('/task', (req, res) => {
    console.log('POST to /task req.body =', req.body);
    let taskFromClient = req.body;
    const taskToAdd = new Task(taskFromClient);
    taskToAdd.save().then(() => {
      console.log('Task added:', taskToAdd);
      res.sendStatus(201);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
  });
  