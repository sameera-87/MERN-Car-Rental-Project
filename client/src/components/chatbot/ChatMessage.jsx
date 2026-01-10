const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
          isUser
            ? "bg-teal-700 text-white rounded-br-none"
            : "bg-white text-gray-800 shadow rounded-bl-none"
        }`}
      >
        {message.text}

        {/* Render cars */}
        {message.cars && (
          <div className="mt-2 space-y-2">
            {message.cars.map(car => (
              <div key={car._id} className="border p-2 rounded-lg">
                <p className="font-medium">{car.brand} {car.model}</p>
                <p className="text-xs text-gray-500">{car.city} • {car.type}</p>
              </div>
            ))}
          </div>
        )}

        {/* Render bookings */}
        {message.bookings && (
          <div className="mt-2 space-y-2">
            {message.bookings.map(b => (
              <div key={b._id} className="border p-2 rounded-lg">
                <p className="font-medium">{b.car?.model}</p>
                <p className="text-xs text-gray-500">
                  {b.pickupDate} → {b.returnDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
