var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// Bodyparser used as Express middleware to parse the request body
app.use(bodyParser.json());

// CRUD - Create, Read, Update, Delete

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    // Use objects instead of arrays for future proofing (can bundle {todos: todos, extrathing: extra})
    res.send({todos});
  }, (err) => {
    res.send(err);
  });
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = {app};
