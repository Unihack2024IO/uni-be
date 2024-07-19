import destinationRoutes from './destination.route.js';
import activityRoutes from './activity.route.js';
import stopRoutes from './stop.route.js';
import userRoutes from './user.route.js';

export default (app) => {
  app.use('/destinations', destinationRoutes);

  app.use('/activities', activityRoutes);

  app.use('/stops', stopRoutes);

  app.use('/users', userRoutes);
};
