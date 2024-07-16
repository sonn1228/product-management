const settingRoutes = require("./setting.route");
const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const roleRoutes = require('./role.route');
const accountRoutes = require('./account.route');
const authRoutes = require('./auth.route');
const recycleRoutes = require('./recycle.route');
const myAccountRoutes = require('./my-account.route');

const productCategoryRoutes = require('./products-category.route');
const systemConfig = require('../../config/system');


// middleware
const middleware = require('../../middleware/admin/auth.middleware');
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`${PATH_ADMIN}/dashboard`, middleware.requireAuth, dashboardRoutes);
  app.use(`${PATH_ADMIN}/products`, middleware.requireAuth, productRoutes);
  app.use(`${PATH_ADMIN}/products-category`, middleware.requireAuth, productCategoryRoutes);
  app.use(`${PATH_ADMIN}/products`, middleware.requireAuth, productRoutes);
  app.use(`${PATH_ADMIN}/roles`, middleware.requireAuth, roleRoutes);
  app.use(`${PATH_ADMIN}/accounts`, middleware.requireAuth, accountRoutes);
  app.use(`${PATH_ADMIN}/my-account`, middleware.requireAuth, myAccountRoutes);

  app.use(`${PATH_ADMIN}/auth`, authRoutes);


  app.use(`${PATH_ADMIN}/recycles`, middleware.requireAuth, recycleRoutes);
  app.use(PATH_ADMIN + "/settings", middleware.requireAuth, settingRoutes);
}