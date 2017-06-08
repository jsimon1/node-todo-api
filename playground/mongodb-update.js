const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  // Instead of if else, you can return for the error to handle it at the beginning, and have it end there
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

// $set is a MongoDB operator, necessary within the update code, returnOriginal is an option set to false so we return the updated object
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5938d8e562126c5354624c10')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });

  db.collection('Users').findOneAndUpdate({
    name: 'Austin Smith'
  }, {
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });

  db.close();

});
