import categoryMiddleware from '../../middleware/client/category.middleware.js';
import homeRoutes from './home.route.js';
import productsRoutes from './products.route.js';
import searchRoutes from './search.route.js';
import cartRoutes from './cart.route.js';
import checkoutRoutes from './checkout.route.js';
import userRoutes from './user.route.js';
import cartMiddleware from '../../middleware/client/cart.middleware.js';
import userMiddleware from '../../middleware/client/user.middleware.js';
import settingMiddleware from '../../middleware/client/setting.middleware.js';

const clientRoutes = (app) => {
  app.use(cartMiddleware.cart);
  app.use(userMiddleware);
  app.use(settingMiddleware);
  app.use(categoryMiddleware.category);
  app.use('/', homeRoutes);
  app.use('/', productsRoutes);
  app.use('/search', searchRoutes);
  app.use('/cart', cartRoutes);
  app.use('/checkout', checkoutRoutes);
  app.use('/user', userRoutes);
};

export default clientRoutes;