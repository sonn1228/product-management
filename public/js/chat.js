var socket = io();
const formSendData = document.querySelector('.chat .inner-form');
if (formSendData) {
  formSendData.addEventListener('submit', (e) => {
    e.preventDefault();

    const content = e.target.elements.content.value;
    if (content) {
      socket.emit('CLIENT_SEND_MESSAGE', content);
      e.target.elements.content.value = '';
      socket.on("SERVER_RETURN_MESSAGE", (data) => {
        console.log(data);
        const myId = document.querySelector('[my-id]').getAttribute('my-id');

        const body = document.querySelector('.chat .inner-body');
        console.log(body);
        const div = document.createElement("div");

        let htmlFullName = "";
        if (myId == data.user_id) {
          div.classList.add('inner-outgoing');
        }
        else {
          div.classList.add('inner-incoming');
          htmlFullName = `<div class="inner-name">${data.fullName}</div>`
        }
        div.innerHTML = `
          ${htmlFullName}
          <div class="inner-content">${data.content}</div>
        `
        body.appendChild(div);
      })

    }
  })
}

