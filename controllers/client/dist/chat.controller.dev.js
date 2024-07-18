"use strict";

var User = require('../../models/user.model');

var Chat = require('../../models/chat.model'); // [GET] /chat/:roomChatId


module.exports.index = function _callee2(req, res) {
  var userId, chats, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chat, infoUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = res.locals.user.id;

          _io.once('connection', function (socket) {
            socket.on('CLIENT_SEND_MESSAGE', function _callee(content) {
              var chat;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      chat = new Chat({
                        user_id: userId,
                        content: content
                      });
                      _context.next = 3;
                      return regeneratorRuntime.awrap(chat.save());

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          });

          _context2.next = 4;
          return regeneratorRuntime.awrap(Chat.find({
            deleted: false
          }));

        case 4:
          chats = _context2.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 8;
          _iterator = chats[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 19;
            break;
          }

          chat = _step.value;
          _context2.next = 14;
          return regeneratorRuntime.awrap(User.findOne({
            _id: chat.user_id
          }).select('fullName'));

        case 14:
          infoUser = _context2.sent;
          chat.infoUser = infoUser;

        case 16:
          _iteratorNormalCompletion = true;
          _context2.next = 10;
          break;

        case 19:
          _context2.next = 25;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 25:
          _context2.prev = 25;
          _context2.prev = 26;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 28:
          _context2.prev = 28;

          if (!_didIteratorError) {
            _context2.next = 31;
            break;
          }

          throw _iteratorError;

        case 31:
          return _context2.finish(28);

        case 32:
          return _context2.finish(25);

        case 33:
          res.render("client/pages/chat/index.pug", {
            pageTitle: "Chat",
            chats: chats
          });

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[8, 21, 25, 33], [26,, 28, 32]]);
};