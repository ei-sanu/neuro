import React, { useState } from 'react';
import { MessageCircle, X, Send, Settings as Lungs } from 'lucide-react';

// Chatbot knowledge base
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
  },
  // Add more conditions...
};

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I can help you learn about respiratory issues. What would you like to know?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);

    // Simple response logic
    const response = generateResponse(inputMessage.toLowerCase());
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 500);

    setInputMessage('');
  };

  const generateResponse = (input: string) => {
    if (input.includes('asthma')) {
      return `Asthma is ${knowledgeBase.asthma.description} Common symptoms include: ${knowledgeBase.asthma.symptoms.join(', ')}. Treatment options: ${knowledgeBase.asthma.treatment}`;
    }
    if (input.includes('copd')) {
      return `COPD is ${knowledgeBase.copd.description} Common symptoms include: ${knowledgeBase.copd.symptoms.join(', ')}. Treatment options: ${knowledgeBase.copd.treatment}`;
    }
    return "I can provide information about various respiratory conditions like asthma, COPD, pneumonia, and more. What would you like to know about?";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <Lungs size={32} />
            <h1 className="text-3xl font-bold">Respiratory Health Center</h1>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 py-4">
            {['overview', 'conditions', 'prevention', 'treatment'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-md ${
                  activeSection === section
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {activeSection === 'overview' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Understanding Respiratory Health</h2>
              <p className="text-gray-700 mb-4">
                Respiratory diseases affect millions of people worldwide, impacting their ability to breathe
                and their overall quality of life. Understanding these conditions is crucial for prevention
                and proper management.
              </p>
              <img
                src="https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80"
                alt="Medical professional examining lungs"
                className="rounded-lg shadow-lg mb-6"
              />
            </section>
          )}

          {activeSection === 'conditions' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Common Respiratory Conditions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(knowledgeBase).map(([condition, info]) => (
                  <div key={condition} className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">{condition.toUpperCase()}</h3>
                    <p className="text-gray-700 mb-2">{info.description}</p>
                    <h4 className="font-semibold mt-2">Symptoms:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {info.symptoms.map((symptom) => (
                        <li key={symptom}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'prevention' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Prevention Tips</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">✓</div>
                    <div>
                      <h3 className="font-semibold">Quit Smoking</h3>
                      <p className="text-gray-700">The single most important step to prevent respiratory diseases.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">✓</div>
                    <div>
                      <h3 className="font-semibold">Regular Exercise</h3>
                      <p className="text-gray-700">Helps improve lung function and overall respiratory health.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          )}

          {activeSection === 'treatment' && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Treatment Options</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 mb-4">
                  Treatment varies depending on the specific condition and its severity. Common approaches include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Medications (inhalers, bronchodilators, steroids)</li>
                  <li>Oxygen therapy</li>
                  <li>Pulmonary rehabilitation</li>
                  <li>Lifestyle modifications</li>
                </ul>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Chatbot */}
      <div className={`fixed bottom-4 right-4 ${isChatOpen ? 'w-80' : 'w-auto'}`}>
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle />
          </button>
        )}

        {isChatOpen && (
          <div className="bg-white rounded-lg shadow-xl">
            <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Respiratory Health Assistant</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about respiratory health..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                  <Send size={20} />
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