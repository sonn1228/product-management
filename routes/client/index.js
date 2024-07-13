const categoryMiddleware = require('../../middleware/client/category.middleware');
const homeRoutes = require('./home.route');
const productsRoutes = require('./products.route');


module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use('/', homeRoutes);
  app.use('/products', productsRoutes);
}