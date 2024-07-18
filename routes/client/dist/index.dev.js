"use strict";

var categoryMiddleware = require('../../middleware/client/category.middleware');

var homeRoutes = require('./home.route');

var productsRoutes = require('./products.route');

var searchRoutes = require('./search.route');

var cartRoutes = require("./cart.route");

var checkoutRoutes = require("./checkout.route");

var userRoutes = require("./user.route");

var chatRoutes = require("./chat.route");

var authMiddleware = require('../../middleware/client/auth.middleware');

var cartMiddleware = require("../../middleware/client/cart.middleware");

var userMiddleware = require('../../middleware/client/user.middleware');

var settingMiddleware = require('../../middleware/client/setting.middleware');

module.exports = function (app) {
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
};