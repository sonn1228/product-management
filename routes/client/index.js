const categoryMiddleware = require('../../middleware/client/category.middleware');
const homeRoutes = require('./home.route');
const productsRoutes = require('./products.route');
const searchRoutes = require('./search.route');
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");

const cartMiddleware = require("../../middleware/client/cart.middleware");

module.exports = (app) => {
  app.use(cartMiddleware.cart);

  app.use(categoryMiddleware.category);
  app.use('/', homeRoutes);
  app.use('/products', productsRoutes);
  app.use('/search', searchRoutes);
  app.use('/cart', cartRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/user", userRoutes);

}