
// [GET] /chat/:roomChatId
module.exports.index = async (req, res) => {

  _io.on('connection', (socket) => {
    console.log(socket.id);
  })

  res.render("client/pages/chat/index.pug", {
    pageTitle: "Chat",
  });
};