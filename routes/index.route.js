import destinationRoutes from './destination.route.js';
import activityRoutes from './activity.route.js';
import stopRoutes from './stop.route.js';
import userRoutes from './user.route.js';
import reviewRoutes from './review.route.js';
import historyRoutes from './history.route.js';
import responseRoutes from './response.route.js';
import adviser from './adviser.route.js';

export default (app) => {
  app.use('/destinations', destinationRoutes);

  app.use('/activities', activityRoutes);

  app.use('/stops', stopRoutes);

  app.use('/users', userRoutes);

  app.use('/reviews', reviewRoutes);

  app.use('/history', historyRoutes);

  app.use('/response', responseRoutes);

  app.use('/adviser', adviser);
};
