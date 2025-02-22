import React, { useState } from 'react';
import { Heart, MessageCircle, X } from 'lucide-react';

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

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'bot', text: string }[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user' as const, text: message };
    setChatHistory(prev => [...prev, userMessage]);

    // Simple keyword-based response system
    const response = generateResponse(message.toLowerCase());
    const botMessage = { type: 'bot' as const, text: response };
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, botMessage]);
    }, 500);

    setMessage('');
  };

  const generateResponse = (input: string) => {
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (input.includes(keyword)) {
        return response;
      }
    }
    return "I can help you with information about heart anatomy, circulation, blood vessels, prevention, symptoms, risk factors, and treatments. What would you like to know?";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white py-6">
        <div className="container mx-auto px-4 flex items-center">
          <Heart className="w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold">Cardiovascular Health Center</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Understanding Your Cardiovascular System</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">The Heart</h3>
              <p className="text-gray-700">
                The heart is a muscular organ that pumps blood throughout the body. It consists of four chambers:
                two atria (upper chambers) and two ventricles (lower chambers).
              </p>
              <img 
                src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=800&q=80" 
                alt="Heart Illustration" 
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Blood Circulation</h3>
              <p className="text-gray-700">
                The circulatory system consists of blood vessels (arteries, veins, and capillaries) that transport
                oxygen, nutrients, and waste throughout the body.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" 
                alt="Blood Vessels" 
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Prevention & Maintenance</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Regular exercise (150 minutes of moderate activity weekly)</li>
              <li>Healthy diet rich in fruits, vegetables, and whole grains</li>
              <li>Regular blood pressure and cholesterol monitoring</li>
              <li>Stress management and adequate sleep</li>
              <li>Avoiding smoking and limiting alcohol consumption</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Chatbot */}
      <div className={`fixed bottom-4 right-4 ${isChatOpen ? 'w-80' : 'w-auto'}`}>
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-xl">
            <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Cardiovascular Health Assistant</h3>
              <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96 p-4 overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    chat.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      chat.type === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {chat.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about cardiovascular health..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-red-600"
                />
                <button
                  onClick={handleSend}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;