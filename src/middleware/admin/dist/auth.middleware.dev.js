"use strict";

var systemConfig = require('../../config/system');

var Account = require('../../models/account.model');

var Role = require('../../models/role.model');

module.exports.requireAuth = function _callee(req, res, next) {
  var user, role;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.token) {
            _context.next = 14;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Account.findOne({
            token: req.cookies.token
          }).select("-password"));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          res.redirect("".concat(systemConfig.prefixAdmin));
          return _context.abrupt("return");

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Role.findOne({
            _id: user.role_id
          }));

        case 9:
          role = _context.sent;
          res.locals.user = user;
          res.locals.role = role;
          _context.next = 16;
          break;

        case 14:
          res.redirect("".concat(systemConfig.prefixAdmin, "/auth/login"));
          return _context.abrupt("return");

        case 16:
          next();

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};