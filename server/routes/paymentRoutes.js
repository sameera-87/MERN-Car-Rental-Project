import express from "express";
import stripe from "../configs/stripe.js";
import Booking from "../models/Booking.js";

const paymentRouter = express.Router();

/**
 * Create payment intent for a booking
 */
paymentRouter.post("/create-intent", async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({ message: "Booking already paid" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.price * 100, // cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        bookingId: booking._id.toString(),
        carId: booking.car.toString(),
      },
    });

    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default paymentRouter;
