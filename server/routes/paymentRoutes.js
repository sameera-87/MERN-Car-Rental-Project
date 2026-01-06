import express from "express";
import stripe from "../config/stripe.js";
import Booking from "../models/Booking.js";
import bodyParser from "body-parser";

const router = express.Router();

/**
 * Create payment intent for a booking
 */
router.post("/create-intent", async (req, res) => {
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
            currency: "lkr", // use "usd" in test mode if needed
            metadata: {
                bookingId: booking._id.toString(),
                carId: booking.car.toString()
            }
        });

        booking.paymentIntentId = paymentIntent.id;
        await booking.save();

        res.json({
            clientSecret: paymentIntent.client_secret
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;

      await Booking.findOneAndUpdate(
        { paymentIntentId: intent.id },
        {
          paymentStatus: "paid",
          status: "confirmed",
          paidAt: new Date()
        }
      );
    }

    res.json({ received: true });
  }
);

export default router;
