const socket = io('http://localhost:3000');
const form = document.getElementById('send-container');
const input = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

socket.on('chat-connection', data => {
    console.log(data)
})

socket.on('chat-message', data => {
    item = document.createElement('li');
    item.textContent = data;
    item.classList.add('reveived-messsage');
    messageContainer.appendChild(item);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-message', input.value);
        item = document.createElement('li');
        item.textContent = input.value;
        item.classList.add('send-message');
        messageContainer.appendChild(item);
        input.value = '';
    }
})