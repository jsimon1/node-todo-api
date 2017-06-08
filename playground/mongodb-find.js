const {MongoClient, ObjectID} = require('mongodb');

// Object destructuring
// var user = {name: 'Jeremy', age: 25};
// var {name} = user;
// var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  // Instead of if else, you can return for the error to handle it at the beginning, and have it end there
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // MongoDB query
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  db.collection('Users').find().toArray().then((users) => {
    console.log('Users:');
    console.log(JSON.stringify(users, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users', err);
  });
});
