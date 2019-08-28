import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

const swaggerUI = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];
const swaggerJSON = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
};

export default {
  swaggerUI,
  swaggerJSON
};
