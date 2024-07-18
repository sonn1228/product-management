"use strict";

var socket = io();
var formSendData = document.querySelector('.chat .inner-form');

if (formSendData) {
  formSendData.addEventListener('submit', function (e) {
    e.preventDefault();
    var content = e.target.elements.content.value;

    if (content) {
      socket.emit('CLIENT_SEND_MESSAGE', content);
      e.target.elements.content.value = '';
      socket.on("SERVER_RETURN_MESSAGE", function (data) {
        console.log(data);
        var myId = document.querySelector('[my-id]').getAttribute('my-id');
        var body = document.querySelector('.chat .inner-body');
        console.log(body);
        var div = document.createElement("div");
        var htmlFullName = "";

        if (myId == data.user_id) {
          div.classList.add('inner-outgoing');
        } else {
          div.classList.add('inner-incoming');
          htmlFullName = "<div class=\"inner-name\">".concat(data.fullName, "</div>");
        }

        div.innerHTML = "\n          ".concat(htmlFullName, "\n          <div class=\"inner-content\">").concat(data.content, "</div>\n        ");
        body.appendChild(div);
      });
    }
  });
}