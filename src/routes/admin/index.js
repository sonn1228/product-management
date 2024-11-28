import settingRoutes from './setting.route.js';
import dashboardRoutes from './dashboard.route.js';
import productRoutes from './product.route.js';
import accountRoutes from './account.route.js';
import authRoutes from './auth.route.js';
import recycleRoutes from './recycle.route.js';
import myAccountRoutes from './my-account.route.js';
import productCategoryRoutes from './products-category.route.js';
import systemConfig from '../../config/system.js';
import authController from '../../controllers/admin/auth.controller.js';
import middleware from '../../middleware/admin/auth.middleware.js';

const adminRoutes = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.get(`${PATH_ADMIN}`, authController.login);

  app.use(`${PATH_ADMIN}/dashboard`, middleware.requireAuth, dashboardRoutes);
  app.use(`${PATH_ADMIN}/products`, middleware.requireAuth, productRoutes);
  app.use(`${PATH_ADMIN}/products-category`, middleware.requireAuth, productCategoryRoutes);
  app.use(`${PATH_ADMIN}/accounts`, middleware.requireAuth, accountRoutes);
  app.use(`${PATH_ADMIN}/my-account`, middleware.requireAuth, myAccountRoutes);
  app.use(`${PATH_ADMIN}/auth`, authRoutes);
  app.use(`${PATH_ADMIN}/recycles`, middleware.requireAuth, recycleRoutes);
  app.use(`${PATH_ADMIN}/settings`, middleware.requireAuth, settingRoutes);
};

export default adminRoutes;