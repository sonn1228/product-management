const Account = require('../../models/account.model');
const systemConfig = require('../../config/system');
const md5 = require('md5');

module.exports.login = (req, res) => {
  if (req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    return;
  }
  res.render('admin/pages/auth/login.pug')
}

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const account = await Account.findOne({
    email: email,
  })
  if (!account) {
    req.flash('error', "email not found");
    res.redirect('back');
    return;
  }
  if (password != account.password) {
    req.flash('error', "password error");
    res.redirect('back');
    return;
  }
  if (account.status == 'inactive') {
    req.flash('error', "account inactive");
    res.redirect('back');
    return;
  }
  res.cookie('token', account.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

module.exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}