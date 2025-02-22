// Chatbot knowledge base
const knowledgeBase = {
    heart: "The heart is a muscular organ that pumps blood throughout the body.",
    circulation: "The circulatory system delivers oxygen-rich blood from the lungs to the body and returns oxygen-poor blood to the lungs.",
    vessels: "Blood vessels include arteries (carry blood away from heart), veins (return blood to heart), and capillaries (exchange between blood and tissues).",
    prevention: "Prevention includes regular exercise, healthy diet, avoiding smoking, and managing stress.",
    symptoms: "Common symptoms include chest pain, shortness of breath, fatigue, and irregular heartbeats.",
    risk: "Risk factors include smoking, poor diet, inactivity, obesity, and family history.",
    treatment: "Treatments may include lifestyle changes, medications, and surgical procedures when necessary."
};

// Chat elements
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

// Toggle chat window
chatToggle.addEventListener('click', () => {
    chatWindow.classList.remove('hidden');
    chatToggle.classList.add('hidden');
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
    chatToggle.classList.remove('hidden');
});

// Send message function
function sendMessageToBot() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage('user', message);
    messageInput.value = '';

    // Generate and add bot response
    const response = generateResponse(message.toLowerCase());
    setTimeout(() => {
        addMessage('bot', response);
    }, 500);
}

// Add message to chat
function addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `<span class="message-content">${text}</span>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate response based on input
function generateResponse(input) {
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
        if (input.includes(keyword)) {
            return response;
        }
    }
    return "I can help you with information about heart anatomy, circulation, blood vessels, prevention, symptoms, risk factors, and treatments. What would you like to know?";
}

// Event listeners
sendMessage.addEventListener('click', sendMessageToBot);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessageToBot();
    }
});