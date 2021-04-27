const socket = io('http://localhost:3000');
const form = document.getElementById('send-container');
const input = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

const pseudo = window.prompt("What's your pseudonym ?");

socket.on('chat-connection', data => {
    item = document.createElement('h3');
    item.textContent = data;
    item.classList.add('info-connection');
    messageContainer.appendChild(item);
})

socket.on('chat-message', data => {
    item = document.createElement('li');
    item.textContent = `${data[0]} : ${data[1]}`;
    item.classList.add('reveived-messsage');
    messageContainer.appendChild(item);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-message', [pseudo, input.value]);
        item = document.createElement('li');
        item.textContent = `You : ${input.value}`;
        item.classList.add('send-message');
        messageContainer.appendChild(item);
        input.value = '';
    }
})