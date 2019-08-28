const models = require('../models');

const insertManyWithRemove = async (modelName, data) => {
  const model = models[modelName];
  if (!model) return;

  await model.collection.remove();
  return model.collection.insertMany(data);
};

module.exports = {
  insertManyWithRemove
};
