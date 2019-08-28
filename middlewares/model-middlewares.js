const _checkModel = (model, res) => {
  if (!model) {
    res.status(500).end();
  }
};

const checkId = (req, res, next) => {
  if (!req.params.id) {
    res.status(400).end('id is required');
    return;
  }

  next();
};

const getById = (req, res) => {
  const id = req.params.id;
  const model = req.model;
  _checkModel(model, res);

  req.model
    .findOne({ id }, req.exludingFields || {})
    .then(model => res.json(model))
    .catch(err => {
      console.log(err);
      res.status(400).end(`Failed load ${req.model.modelName} with id ${id}`);
    });
};

const insertModel = (req, res) =>  {
  const model = req.model;
  _checkModel(model, res);

  const error = model.validateSync();
  if (error) {
    res.status(400).send(error);
  }

  model
    .save()
    .then(model => res.json({
      id: model.id
    }))
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const deleteModel = (req, res) => {
  const id = req.params.id;
  const model = req.model;
  _checkModel(model, res);

  model
    .findOne({ id })
    .remove()
    .exec()
    .then(() => {
      res.json({
        status: 'success'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).end(`Failed to delete ${model.modelName} with id ${id}`);
    });
};

module.exports = {
  insertModelMiddleware: insertModel,
  getByIdMiddleware: getById,
  checkIdMiddleware: checkId,
  deleteModelMiddleware: deleteModel
};
