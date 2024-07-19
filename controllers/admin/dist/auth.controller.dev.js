"use strict";

var Account = require('../../models/account.model');

var systemConfig = require('../../config/system');

var md5 = require('md5');

module.exports.login = function (req, res) {
  console.log(req.cookies);

  if (req.cookies.token) {
    res.redirect("".concat(systemConfig.prefixAdmin, "/dashboard"));
    return;
  }

  res.render('admin/pages/auth/login.pug');
};

module.exports.loginPost = function _callee(req, res) {
  var email, password, account;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          password = md5(req.body.password);
          _context.next = 4;
          return regeneratorRuntime.awrap(Account.findOne({
            email: email
          }));

        case 4:
          account = _context.sent;

          if (account) {
            _context.next = 9;
            break;
          }

          req.flash('error', "email not found");
          res.redirect('back');
          return _context.abrupt("return");

        case 9:
          if (!(password != account.password)) {
            _context.next = 13;
            break;
          }

          req.flash('error', "password error");
          res.redirect('back');
          return _context.abrupt("return");

        case 13:
          if (!(account.status == 'inactive')) {
            _context.next = 17;
            break;
          }

          req.flash('error', "account inactive");
          res.redirect('back');
          return _context.abrupt("return");

        case 17:
          res.cookie('token', account.token);
          res.redirect("".concat(systemConfig.prefixAdmin, "/dashboard"));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.logout = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.clearCookie('token');
          res.redirect("".concat(systemConfig.prefixAdmin));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};