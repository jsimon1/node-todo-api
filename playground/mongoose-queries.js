const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userID = '5939e52dfb3828e9609b3bb5';

if (!ObjectID.isValid(userID)) {
  console.log('User ID is not valid');
}

User.findById(userID).then((user) => {
  if (!user) {
    return console.log('No user record with ID');
  }
  console.log('User:', user);
}, (err) => {
  console.log(err);
});

// var id = '5939e238fcf5f825346cfd4';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Mongo ID not valid');
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// })
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('No records with ID');
//   }
//   console.log('Todo by ID', todo);
// }).catch((err) => {
//   console.log(err);
// });
