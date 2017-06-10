const {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Only difference is if you need to query by more then the ID
// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findByIdAndRemove('593b1207a79a5439fa90aadf').then((todo) => {
//   console.log(todo);
// });
