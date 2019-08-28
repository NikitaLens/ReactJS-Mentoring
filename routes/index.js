import express from 'express';
import mung from 'express-mung';
import * as controllers from '../controllers';
import { isLoggedIn } from '../middlewares/auth';

const secureRoute = new express.Router();
const publicRoute = new express.Router();
const allRoute = new express.Router();

// secureRoute.use(isLoggedIn);
require('./userRoutes')(publicRoute, secureRoute);
require('./photoRoutes')(secureRoute);
require('./comments')(secureRoute);
require('./search')(allRoute);

const _getRemote = (req) => {
  const remoteAdr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return `${remoteAdr}`;
};

const resLog = mung.json((body, req) => {
  const remote = _getRemote(req);
  const request = {
    params: req.params,
    query:  req.query,
  };

  const newBody = JSON.stringify(body);
  console.log(`\n${new Date(Date.now())} ${remote} ---- REQUEST ${req.method} ${req.originalUrl} | meta ${JSON.stringify(request)}`);
  console.log(`${remote} ---- RESPONSE ${req.method} ${req.originalUrl} | body: ${newBody}`);

  return body;
});

// allRoute.use((req, res, next) => {
//   const remote = _getRemote(req);
//   const newBody = JSON.stringify(req.body);
//   console.log(`\n${remote} ---- REQUEST ${req.method} ${req.originalUrl} | body ${newBody}`);
//   next();
// });
allRoute.use(resLog);
allRoute.use('/', publicRoute);
allRoute.use('/api', secureRoute);
allRoute.get('/swagger.json', controllers.swaggerJSON);
allRoute.use('/swagger-ui', controllers.swaggerUI);

export default allRoute;
