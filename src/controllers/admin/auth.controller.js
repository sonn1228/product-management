import Account from '../../models/account.model.js';
import systemConfig from '../../config/system.js';
import md5 from 'md5';

class AuthController {

  // [GET] /admin/login
  login = (req, res) => {
    if (req.cookies.token) {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
      return;
    }
    res.render('admin/pages/auth/login.ejs', {
      layout: 'admin/layouts/default.ejs',
    });
  }

  // [POST] /admin/login
  loginPost = async (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    const account = await Account.findOne({ email });

    if (!account) {
      req.flash('error', "Email not found");
      res.redirect('back');
      return;
    }
    if (password !== account.password) {
      req.flash('error', "Password error");
      res.redirect('back');
      return;
    }
    if (account.status === 'inactive') {
      req.flash('error', "Account inactive");
      res.redirect('back');
      return;
    }
    res.cookie('token', account.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  }

  // [GET] /admin/logout
  logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect(`${systemConfig.prefixAdmin}`);
  }

}

export default new AuthController();