const mongoose = require('mongoose');
const connect = require('./connection');
const { insertManyWithRemove } = require('./inserts');

const performMockInsert = () => Promise.all([
  insertManyWithRemove('Users', require('./mocks/users')),
  insertManyWithRemove('Counters', require('./mocks/counters')),
  insertManyWithRemove('Comments', require('./mocks/comments')),
  insertManyWithRemove('Photos', require('./mocks/photos'))
]);

connect()
  .then(performMockInsert)
  .then(() => {
    console.log('All queries done');

    mongoose.connection.close();
  })
  .catch(err => {
    mongoose.connection.close();
    console.log(err);
  });
