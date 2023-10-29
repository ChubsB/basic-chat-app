const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const BASE_URL = "http://localhost:3000/chat";

let loggedInUser = null;

// Fetch all messages from the server and display them
function fetchMessages() {
    fetch(BASE_URL + "/messages")
        .then(response => response.json())
        .then(data => {
            messagesDiv.innerHTML = data.map(msg => `<p>${msg.username}: ${msg.message}</p>`).join("");
        })
        .catch(err => {
            console.error("Error fetching messages:", err);
        });
}

// Send a new message to the server
function sendMessage() {
    if (!loggedInUser) {
        alert("You must be logged in to send messages.");
        return;
    }

    const message = messageInput.value;
    if (message.trim() === "") return;

    fetch(BASE_URL + "/messages", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, username: loggedInUser })
    })
    .then(() => {
        messageInput.value = "";
        fetchMessages();
    })
    .catch(err => {
        console.error("Error sending message:", err);
    });
}

loginBtn.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Logged in successfully") {
            alert("Logged in!");
            loggedInUser = username;
            // You can add code here to hide the login form and show the chat.
        } else {
            alert("Invalid credentials. Please try again.");
        }
    })
    .catch(err => {
        console.error("Error logging in:", err);
    });
});

sendBtn.addEventListener("click", sendMessage);

// Fetch messages initially and then every 2 seconds
fetchMessages();
setInterval(fetchMessages, 2000);
