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
    }
  });
}