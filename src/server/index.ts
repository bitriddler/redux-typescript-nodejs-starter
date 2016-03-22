import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';
import {Mongoose} from 'mongoose';
import {configureMongoose} from 'server/config/mongoose-config';
import {configureModels} from 'server/config/models-config';
import {configureKernel} from 'server/config/kernel-config';
import {configureRouter} from 'server/config/router-config';
import {ErrorHandler} from 'server/controllers/error-handler';

export const port = 3000;

export var mongoose: Mongoose;
export var kernel;
export var router;

/**
 * Create http server with the given middlewares
 * This way we can allow injecting middlewares e.g. 'webpack hot middleware'
 * @param {[any]} middlewares = Middlwares to inject
 */
export function serve(middlewares = []) {

  var app = new (<any>Express)();

  for(let i = 0; i < middlewares.length; i++) {
    app.use(middlewares[i]);
  }

  app.use(bodyParser.json());

  // Configuration
  mongoose = configureMongoose();
  kernel = configureKernel();
  const errorHandler = new ErrorHandler();

  // Configure models
  configureModels(mongoose);

  // Configure router
  router = configureRouter(kernel.controllers);

  app.use(router);
  //
  app.use(errorHandler.logErrors.bind(errorHandler));
  app.use(errorHandler.response.bind(errorHandler));

  app.get('/*', function(req, res, next) {
    return res.sendFile(path.join(__dirname, 'src/client/index.html'));
  });

  var server = http.createServer(app);

  server.listen(port, () => console.log(`Server is listening on port ${port}`));

  return server;
}
