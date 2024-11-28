import md5 from 'md5';
import User from '../../models/user.model.js';
import Cart from '../../models/cart.model.js';
import ForgotPassword from '../../models/forgot-password.model.js';
import sendEmailHelper from '../../helpers/sendEmail.helper.js';

class UserController {

  // [GET] /user/register
  register = (req, res) => {
    res.render('client/pages/user/register.ejs', {
      pageTitle: 'Đăng ký tài khoản',
    });
  };

  // [POST] /user/register
  registerPost = async (req, res) => {
    const { email, password } = req.body;
    console.log("Email: ", email);
    console.log("password: ", password);

    const existUser = await User.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (existUser) {
      req.flash('error', 'Email đã tồn tại!');
      res.redirect('back');
      return;
    }

    const userInfo = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      tokenUser: generateHelper.generateRandomString(30),
    };

    const user = new User(userInfo);
    await user.save();

    res.cookie('tokenUser', user.tokenUser);
    res.redirect('/');
  };

  // [GET] /user/login
  login = (req, res) => {
    res.render('client/pages/user/login.ejs', {
      pageTitle: 'Đăng nhập tài khoản',
    });
  };

  // [POST] /user/login
  loginPost = async (req, res) => {
    const { email, password } = req.body;

    console.log("email: ", email);
    console.log("password: ", password);


    const user = await User.findOne({
      email,
      deleted: false,
    });

    if (!user) {
      req.flash('error', 'Email không tồn tại!');
      res.redirect('back');
      return;
    }

    if (md5(password) !== user.password) {
      req.flash('error', 'Sai mật khẩu!');
      res.redirect('back');
      return;
    }

    if (user.status !== 'active') {
      req.flash('error', 'Tài khoản đang bị khóa!');
      res.redirect('back');
      return;
    }

    await Cart.updateOne(
      {
        _id: req.cookies.cartId,
      },
      {
        user_id: user.id,
      }
    );

    res.cookie('tokenUser', user.tokenUser);

    await User.updateOne(
      {
        _id: user.id,
      },
      {
        statusOnline: 'online',
      }
    );

    req.flash('success', 'Login successfully!');
    res.redirect('/');
  };

  // [GET] /user/logout
  logout = async (req, res) => {
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne(
      {
        tokenUser,
      },
      {
        statusOnline: 'offline',
      }
    );

    res.clearCookie('tokenUser');
    req.flash('success', 'Log out successfully!');
    res.redirect('/');
  };

  // [GET] /user/password/forgot
  forgotPassword = (req, res) => {
    res.render('client/pages/user/forgot-password.ejs', {
      pageTitle: 'Lấy lại mật khẩu',
    });
  };

  // [POST] /user/password/forgot
  forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
      email,
      deleted: false,
    });

    if (!user) {
      req.flash('error', 'Email không tồn tại!');
      res.redirect('back');
      return;
    }

    const otp = generateHelper.generateRandomNumber(6);

    // Việc 1: Tạo mã OTP và lưu vào trong database
    const objectForgotPassword = {
      email,
      otp,
      expireAt: Date.now() + 3 * 60 * 1000,
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Việc 2: Gửi mã OTP qua email
    const subject = 'Lấy lại mật khẩu.';
    const text = `Mã OTP xác thực tài khoản của bạn là: ${otp}. Mã OTP có hiệu lực trong vòng 3 phút. Vui lòng không cung cấp mã OTP này với bất kỳ ai.`;
    sendEmailHelper.sendEmail(email, subject, text);

    res.redirect(`/user/password/otp?email=${email}`);
  };

  // [GET] /user/password/otp
  otpPassword = (req, res) => {
    const email = req.query.email;

    res.render('client/pages/user/otp-password.ejs', {
      pageTitle: 'Nhập mã OTP',
      email,
    });
  }
}
export default new UserController();