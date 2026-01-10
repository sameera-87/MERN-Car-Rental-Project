import { analyzeMessage } from "../services/geminiService.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

export const chatHandler = async (req, res) => {
  try {
    const { message, context } = req.body;
    const user = req.user;

    const analysis = await analyzeMessage(message, context);

    switch (analysis.intent) {
      case "GREETING":
        return res.json({
          reply: "Hello! 👋 How can I help you today?",
          context
        });

      case "FIND_CAR":
        return await handleFindCar(analysis, res);

      case "MY_BOOKINGS":
        if (!user)
          return res.json({ reply: "Please login to view your bookings." });

        return await handleMyBookings(user, res);

      case "FAQ":
        return res.json({
          reply: "You need a valid driving license and NIC or passport."
        });

      default:
        return res.json({
          reply: "Sorry, I didn't understand that. Can you rephrase?"
        });
    }
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ reply: "Something went wrong. Try again." });
  }
};

const handleFindCar = async (analysis, res) => {
  const { city, carType } = analysis.entities;

  if (!city) {
    return res.json({ reply: "Which city are you looking for?" });
  }

  const query = { city };

  if (carType) query.type = carType;

  const cars = await Car.find(query).limit(5);

  if (cars.length === 0) {
    return res.json({ reply: "No cars available at the moment." });
  }

  return res.json({
    reply: `I found ${cars.length} cars available in ${city}.`,
    cars
  });
};

const handleMyBookings = async (user, res) => {
  const bookings = await Booking.find({ user: user._id })
    .populate("car")
    .sort({ createdAt: -1 });

  if (bookings.length === 0) {
    return res.json({ reply: "You have no bookings." });
  }

  return res.json({
    reply: `You have ${bookings.length} bookings.`,
    bookings
  });
};
