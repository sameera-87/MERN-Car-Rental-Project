import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useAppContext } from '../../context/AppContext';

const Chatbot = () => {
  
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 How can I help you today?" }

  ]);


  const { user } = useAppContext();

  // Do not render chatbot if user is not logged in
  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-teal-700 hover:bg-teal-800 text-white p-4 rounded-full shadow-xl"
      >
        <MessageCircle />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-teal-700 text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold">Car Rental Assistant</h3>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
          </div>

          {/* Input */}
          <ChatInput setMessages={setMessages} />
        </div>
      )}
    </>
  );
};

export default Chatbot;
