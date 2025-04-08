// Chatbot knowledge base
const knowledgeBase = {
    "hello": "Hello! I'm your safety assistant. How can I help you today?",
    "hi": "Hi there! I'm here to help with safety concerns. What do you need?",
    "help": "I can help with: \n1. Safety tips\n2. Emergency contacts\n3. Location safety\n4. Reporting incidents",
    "safety tips": "Here are some safety tips:\n- Always share your live location with trusted contacts\n- Avoid walking alone at night\n- Trust your instincts\n- Have emergency numbers saved",
    "emergency numbers": "Important numbers:\n- Police: 100\n- Women's Helpline: 1091\n- Ambulance: 108",
    "report incident": "To report an incident:\n1. Go to a safe location\n2. Call emergency services\n3. Contact trusted friends/family\n4. Consider filing a police report",
    "unsafe location": "If you feel unsafe:\n1. Move to a crowded area\n2. Call emergency contacts\n3. Use the SOS button in the app\n4. Consider taking a taxi or rideshare",
    "self defense": "Basic self-defense tips:\n1. Be aware of your surroundings\n2. Carry a whistle or personal alarm\n3. Learn basic defensive moves\n4. Your voice is a powerful weapon - shout loudly if threatened",
    "default": "I'm not sure I understand. Could you rephrase that? Here are some things I can help with:\n- Safety tips\n- Emergency contacts\n- Location safety\n- Reporting incidents"
};

document.getElementById('sendChatBtn').addEventListener('click', sendMessage);
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    input.value = '';
    
    // Get bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(text, sender) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender} mb-3`;
    
    const bubble = document.createElement('div');
    bubble.className = sender === 'user' 
        ? 'inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white float-right clear-both'
        : 'inline-block px-4 py-2 rounded-lg bg-indigo-100 text-gray-800 float-left clear-both';
    
    bubble.textContent = text;
    messageDiv.appendChild(bubble);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(knowledgeBase)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    // Check for similar questions
    if (lowerMessage.includes('how are you')) {
        return "I'm a safety assistant, so I'm always ready to help! How can I assist you?";
    }
    if (lowerMessage.includes('thank')) {
        return "You're welcome! Stay safe and let me know if you need anything else.";
    }
    if (lowerMessage.includes('danger') || lowerMessage.includes('help me')) {
        return "If you're in immediate danger, please use the SOS button on the Emergency page or call emergency services right away!";
    }
    
    // Default response
    return knowledgeBase.default;
}
