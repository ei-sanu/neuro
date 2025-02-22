const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

document.documentElement.setAttribute('data-theme', 
    localStorage.getItem('theme') || 'light'
);

function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeIcon.textContent = currentTheme === 'light' ? '💡' : '🔮';
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    clockElement.textContent = `${date} ${time}`;
}

setInterval(updateClock, 1000);
updateClock();

const API_KEY = "AIzaSyDdxS5w-Rqua9jEqnPB9B79HsNhUcsGKvw";
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synthesis = window.speechSynthesis;
let isListening = false;

recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;

function toggleVoiceInput() {
    const micButton = document.getElementById('mic-button');
    
    if (!isListening) {
        recognition.start();
        isListening = true;
        micButton.classList.add('listening');
    } else {
        recognition.stop();
        isListening = false;
        micButton.classList.remove('listening');
    }
}

function speakResponse(text) {
    synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    synthesis.speak(utterance);
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    const messageToSend = userMessage;
    userInput.value = "";

    displayMessage(messageToSend, "user");

    const botResponse = await getAIResponse(messageToSend);
    displayMessage(botResponse, "bot");
}

function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (sender === "bot") {
        speakResponse(message);
    }
}

async function getAIResponse(message) {
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
    } catch (error) {
        return "Error connecting to AI.";
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    await sendMessage();
};

recognition.onend = () => {
    isListening = false;
    document.getElementById('mic-button').classList.remove('listening');
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isListening = false;
    document.getElementById('mic-button').classList.remove('listening');
};
function toggleMenu() {
    var nav = document.getElementById("nav-menu");
    nav.classList.toggle("active");
}