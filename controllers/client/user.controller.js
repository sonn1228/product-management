const md5 = require("md5");
const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");

const generateHelper = require("../../helpers/generate.helper");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register.pug", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existUser = await User.findOne({
    email: req.body.email,
    deleted: false
  });

  if (existUser) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("back");
    return;
  }

  const userInfo = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    tokenUser: generateHelper.generateRandomString(30)
  };

  const user = new User(userInfo);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login.pug", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  if (md5(password) != user.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if (user.status != "active") {
    req.flash("error", "Tài khoản đang bị khóa!");
    res.redirect("back");
    return;
  }

  await Cart.updateOne({
    _id: req.cookies.cartId
  }, {
    user_id: user.id
  });

  res.cookie("tokenUser", user.tokenUser);

  await User.updateOne({
    _id: user.id
  }, {
    statusOnline: "online"
  });

  // _io.once('connection', (socket) => {
  //   socket.broadcast.emit("SERVER_RETURN_STATUS_ONLINE", {
  //     userId: user.id,
  //     statusOnline: "online"
  //   })
  // })
  req.flash('success', 'login successfully!');

  res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne({
    tokenUser: tokenUser
  }, {
    statusOnline: "offline"
  });


  res.clearCookie("tokenUser");
  req.flash('success', 'Log out successfully!');
  res.redirect("/");
};

