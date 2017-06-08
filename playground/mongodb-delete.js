const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  // Instead of if else, you can return for the error to handle it at the beginning, and have it end there
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany, deleteOne, findOneAndDelete
  // db.collection('Users').deleteMany({name: 'Jeremy Simon'}).then((res) => {
  //   console.log(res);
  // });
  //
  // db.collection('Users').deleteOne({name: 'Jeremy Simon'}).then((res) => {
  //   console.log(res);
  // });

  db.collection('Users').findOneAndDelete({name: 'Jeremy Simon'}).then((res) => {
    console.log(res);
  });

  db.close();

});
