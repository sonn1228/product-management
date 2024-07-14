const categoryMiddleware = require('../../middleware/client/category.middleware');
const homeRoutes = require('./home.route');
const productsRoutes = require('./products.route');
const searchRoutes = require('./search.route');


module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use('/', homeRoutes);
  app.use('/products', productsRoutes);
  app.use('/search', searchRoutes);
}