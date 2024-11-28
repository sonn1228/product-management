import systemConfig from '../../config/system.js';
import Account from '../../models/account.model.js';
class AuthMiddleware {

  requireAuth = async (req, res, next) => {
    if (req.cookies.token) {
      const user = await Account.findOne({
        token: req.cookies.token
      }).select("-password");
      if (!user) {
        res.redirect(`${systemConfig.prefixAdmin}`);
        return;
      }
      res.locals.user = user;
    }
    else {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    }
    next();
  }
}
export default new AuthMiddleware();