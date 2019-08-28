const mongoose = require('mongoose');
const config = require('../config/config.json');

const connectionString = config.database.connection;
let _connection = null;
mongoose.Promise = global.Promise;

const connection = async () => {
  if (!_connection) {
    _connection = await mongoose.connect(connectionString, {
      useMongoClient: true,
      autoReconnect: true
    });
  }

  return _connection;
};

module.exports = connection;