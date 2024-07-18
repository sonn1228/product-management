"use strict";

// [GET] /chat/:roomChatId
module.exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _io.on('connection', function (socket) {
            console.log(socket.id);
          });

          res.render("client/pages/chat/index.pug", {
            pageTitle: "Chat"
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};