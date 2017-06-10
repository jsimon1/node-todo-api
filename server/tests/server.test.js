const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 123
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then((then) => {
    return done();
  }).catch((err) => {
    done(err);
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((err) => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
// toHexString converts an id to a string
describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done);
  });
  it('should return 404 when not found', (done) => {
    var randomID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${randomID}`)
      .expect(404)
      .end(done);
  });

  // Remember, arrow functions dont have access to the natural this, so use old-school function syntax
  // when in Mocha since context might be important
  it('should return 404 for non-object ids', function(done) {
    request(app)
    .get(`/todos/593a323360853a1460c4f69da`)
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete and return todo doc', (done) => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(todos[0]._id.toHexString()).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((err) => done(err));
      });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/593bd698e29ea2351004d719`)
      .expect(404)
      .end(done);
  });

  it('should reutrn 404 if id is invalid', (done) => {
    request(app)
      .delete(`/todos/593b1698e29ea2351004d71aaa`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var id = todos[0]._id.toHexString();
    request(app)
      .patch(`/todos/${id}`)
      .set('Content-Type', 'application/json')
      .send({ text: 'Updated first todo' , completed: true })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('Updated first todo');
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var id = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${id}`)
      .set('Content-Type', 'application/json')
      .send({ completed: false})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[1].text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);

  });
});
