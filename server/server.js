import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

import stripe from "./configs/stripe.js";  
import Booking from "./models/Booking.js";

import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

import adminRoutes from "./routes/admin/adminRoutes.js";

// Initialize Express app
const app = express()

// Connect Database
await connectDB()

/*
 * STRIPE WEBHOOK (MUST BE FIRST)
 */
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
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
          paidAt: new Date(),
        }
      );
    }

    console.log("Booking updated");

    res.json({ received: true });
  }
);

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> res.send("Server is running"))
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)
app.use("/api/payments", paymentRouter);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
