import { useState } from "react";
import { Send } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const ChatInput = ({ setMessages }) => {
  const [text, setText] = useState("");
  const { axios } = useAppContext();

  const sendMessage = async () => {
    if (!text.trim()) return;

    // Show user message instantly
    setMessages(prev => [...prev, { sender: "user", text }]);
    setText("");

    try {
      const { data } = await axios.post("/api/user/chatbot-message", {
        message: text,
      });

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          cars: data.cars,
          bookings: data.bookings
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Try again." }
      ]);
    }
  };

  return (
    <div className="p-3 border-t flex items-center gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Ask me about cars, bookings..."
        className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
      />
      <button
        onClick={sendMessage}
        className="bg-teal-700 hover:bg-teal-800 text-white p-2 rounded-xl"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
