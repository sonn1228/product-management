const categoryMiddleware = require('../../middleware/client/category.middleware');
const homeRoutes = require('./home.route');
const productsRoutes = require('./products.route');
const searchRoutes = require('./search.route');
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
const chatRoutes = require("./chat.route");
const authMiddleware = require('../../middleware/client/auth.middleware')

const cartMiddleware = require("../../middleware/client/cart.middleware");
const userMiddleware = require('../../middleware/client/user.middleware');
const settingMiddleware = require('../../middleware/client/setting.middleware');
module.exports = (app) => {
  app.use(cartMiddleware.cart);
  app.use(userMiddleware.infoUser);
  app.use(settingMiddleware.settingsGeneral);

  app.use(categoryMiddleware.category);
  app.use('/', homeRoutes);
  app.use('/products', productsRoutes);
  app.use('/search', searchRoutes);
  app.use('/cart', cartRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/user", userRoutes);
  app.use("/chat", authMiddleware.requireAuth, chatRoutes);

}