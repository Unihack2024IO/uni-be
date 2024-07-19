import destinationRoutes from './destination.route.js';
import activityRoutes from './activity.route.js';

export default (app) => {
  app.use('/destinations', destinationRoutes);

  app.use('/activities', activityRoutes);
};
