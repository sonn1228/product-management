const User = require('../../models/user.model');
const Chat = require('../../models/chat.model');
// [GET] /chat/:roomChatId
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  _io.once('connection', (socket) => {
    socket.on('CLIENT_SEND_MESSAGE', async (content) => {
      const chat = new Chat({
        user_id: userId,
        content: content
      });
      await chat.save();

      socket.emit("SERVER_RETURN_MESSAGE", {
        user_id: userId,
        fullName: fullName,
        content: content
      })
    })
  })

  const chats = await Chat.find({
    deleted: false
  })

  for (let chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id
    }).select('fullName')
    chat.infoUser = infoUser;
  }

  res.render("client/pages/chat/index.pug", {
    pageTitle: "Chat",
    chats: chats
  });
};