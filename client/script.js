const socket = io();

const loginPage = document.getElementById('loginPage');
const chatPage = document.getElementById('chat');
const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');

let username = null;
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message && username) {
        socket.emit('chat message', { username, text: message }); // Send object with username and text
        messageInput.value = '';
    } else if (!username) {
        alert("Please log in before sending messages.");
    }
});
socket.on('chat message', (data) => {
    console.log(data); // Debugging

    const li = document.createElement('li');
    li.textContent = `${data.username || 'Anonymous'}: ${data.text || ''}`;

    // Add styling for sender and receiver
    if (data.username === username) {
        li.classList.add('my-message');
    } else {
        li.classList.add('other-message');
    }

    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll down
});
document.getElementById('chatLink').addEventListener('click', (e) => {
    e.preventDefault();
    if (username) {
        chatPage.style.display = 'block';
        loginPage.style.display = 'none';
    } else {
        alert("Please log in first!");
    }
});
document.getElementById('loginLink').addEventListener('click', (e) => {
    e.preventDefault();
    loginPage.style.display = 'block';
    chatPage.style.display = 'none';
});
document.getElementById('loginBtn').addEventListener('click', () => {
    const enteredUsername = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (enteredUsername && password) {
        username = enteredUsername; // Save username
        loginPage.style.display = 'none';
        chatPage.style.display = 'block';
    } else {
        alert("Please enter both username and password!");
    }
});