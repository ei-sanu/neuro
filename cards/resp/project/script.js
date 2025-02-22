// Knowledge base for the chatbot
const knowledgeBase = {
  asthma: {
    description: "A chronic condition where airways become inflamed and narrow.",
    symptoms: ["Shortness of breath", "Wheezing", "Chest tightness", "Coughing"],
    treatment: "Inhalers, lifestyle changes, avoiding triggers"
  },
  copd: {
    description: "A progressive lung disease making breathing difficult.",
    symptoms: ["Chronic cough", "Sputum production", "Shortness of breath", "Wheezing"],
    treatment: "Medications, oxygen therapy, pulmonary rehabilitation"
  }
};

// Initialize Lucide icons
lucide.createIcons();

// Navigation functionality
document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and sections
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked button and corresponding section
    button.classList.add('active');
    const sectionId = button.dataset.section;
    document.getElementById(sectionId).classList.add('active');
  });
});

// Chatbot functionality
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendMessage = document.getElementById('send-message');

// Toggle chat window
chatToggle.addEventListener('click', () => {
  chatWindow.classList.remove('hidden');
  if (chatMessages.children.length === 0) {
    addMessage('Hello! I can help you learn about respiratory issues. What would you like to know?', 'bot');
  }
});

closeChat.addEventListener('click', () => {
  chatWindow.classList.add('hidden');
});

// Send message functionality
function sendMessageHandler() {
  const message = messageInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  const response = generateResponse(message.toLowerCase());
  setTimeout(() => addMessage(response, 'bot'), 500);
  messageInput.value = '';
}

sendMessage.addEventListener('click', sendMessageHandler);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessageHandler();
  }
});

// Add message to chat
function addMessage(text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  
  const content = document.createElement('div');
  content.className = 'message-content';
  content.textContent = text;
  
  messageDiv.appendChild(content);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate response based on input
function generateResponse(input) {
  if (input.includes('asthma')) {
    return `Asthma is ${knowledgeBase.asthma.description} Common symptoms include: ${knowledgeBase.asthma.symptoms.join(', ')}. Treatment options: ${knowledgeBase.asthma.treatment}`;
  }
  if (input.includes('copd')) {
    return `COPD is ${knowledgeBase.copd.description} Common symptoms include: ${knowledgeBase.copd.symptoms.join(', ')}. Treatment options: ${knowledgeBase.copd.treatment}`;
  }
  return "I can provide information about various respiratory conditions like asthma, COPD, pneumonia, and more. What would you like to know about?";
}