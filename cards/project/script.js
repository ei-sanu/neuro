// Chatbot knowledge base
const knowledgeBase = {
    "acne": {
        keywords: ["acne", "pimple", "blackhead", "whitehead"],
        response: "Acne is a skin condition that occurs when hair follicles become clogged with oil and dead skin cells. Common treatments include benzoyl peroxide, salicylic acid, and maintaining good skin hygiene."
    },
    "eczema": {
        keywords: ["eczema", "atopic", "dermatitis", "itchy", "dry skin"],
        response: "Eczema is a chronic inflammatory skin condition causing dry, itchy patches. Treatment includes moisturizing, avoiding triggers, and sometimes using topical corticosteroids."
    },
    "psoriasis": {
        keywords: ["psoriasis", "scales", "plaques"],
        response: "Psoriasis is an autoimmune condition causing rapid skin cell growth, leading to thick, scaly patches. Treatment options include topical treatments, phototherapy, and biologics."
    },
    "skin cancer": {
        keywords: ["cancer", "melanoma", "basal", "squamous", "mole"],
        response: "If you're concerned about skin cancer, look for the ABCDE signs: Asymmetry, Border irregularity, Color variation, Diameter >6mm, and Evolution. Please consult a dermatologist for proper evaluation."
    },
    "prevention": {
        keywords: ["prevent", "protection", "sunscreen", "avoid"],
        response: "Key prevention tips: Use sunscreen daily (SPF 30+), avoid excessive sun exposure, maintain good skin hygiene, stay hydrated, eat a balanced diet, and perform regular skin checks."
    },
    "general": {
        keywords: ["skin disease", "condition", "problem", "help"],
        response: "Skin diseases can have various causes including genetics, infections, allergens, and environmental factors. It's important to consult a healthcare provider for proper diagnosis and treatment."
    }
};

// Chat functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const minimizeButton = document.getElementById('minimize-chat');
    let isChatMinimized = false;

    // Initial bot message
    addMessage("Hi! I'm your Skin Health Assistant. How can I help you today?", 'bot');

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            const response = generateResponse(message);
            setTimeout(() => addMessage(response, 'bot'), 500);
            userInput.value = '';
        }
    }

    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Generate response based on user input
    function generateResponse(input) {
        input = input.toLowerCase();
        
        // Check each topic in knowledge base
        for (const topic in knowledgeBase) {
            const keywords = knowledgeBase[topic].keywords;
            if (keywords.some(keyword => input.includes(keyword))) {
                return knowledgeBase[topic].response;
            }
        }

        // Default response if no keywords match
        return "I'm not sure about that specific condition. Please ask about common skin conditions like acne, eczema, psoriasis, or skin cancer prevention.";
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    minimizeButton.addEventListener('click', () => {
        const chatContainer = document.getElementById('chatbot');
        const messages = document.querySelector('.chat-messages');
        const input = document.querySelector('.chat-input');
        
        if (isChatMinimized) {
            messages.style.display = 'block';
            input.style.display = 'flex';
            minimizeButton.textContent = '−';
        } else {
            messages.style.display = 'none';
            input.style.display = 'none';
            minimizeButton.textContent = '+';
        }
        
        isChatMinimized = !isChatMinimized;
    });
});