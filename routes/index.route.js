import destinationRoutes from './destination.route.js';

export default (app) => {
  app.use('/destinations', destinationRoutes);
};
