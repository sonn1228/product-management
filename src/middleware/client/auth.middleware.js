import User from "../../models/user.model.js";
export default class authMiddleware {

  requireAuth = async (req, res, next) => {
    if (!req.cookies.tokenUser) {
      res.redirect(`/user/login`);
      return;
    }

    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
      status: "active"
    });

    if (!user) {
      res.clearCookie("tokenUser");
      res.redirect(`/user/login`);
      return;
    }

    next();
  };
}