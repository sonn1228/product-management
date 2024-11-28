import User from "../../models/user.model.js";
const infoUser = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
      status: "active"
    }).select('-password');

    if (user) {
      res.locals.user = user;
    }
  }

  next();
}
export default infoUser;