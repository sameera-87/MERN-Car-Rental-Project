import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const PaymentModal = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const {
    axios,
    setShowPayment,
    activeBookingId,
    setPaymentSuccessTick
    } = useAppContext();

  const [paying, setPaying] = React.useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setPaying(true);

    try {
      const { data } = await axios.post(
        "/api/payments/create-intent",
        { bookingId: activeBookingId }
      );

      const cardElement = elements.getElement(CardNumberElement);

      const result = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: { card: cardElement }
        }
      );

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        setShowPayment(false);
        setPaymentSuccessTick(prev => prev + 1);   // 🔥 notify parent
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div
      onClick={() => setShowPayment(false)}
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handlePayment}
        className="bg-white p-6 rounded-lg w-[360px] shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Pay with Card
        </h2>

        {/* Card Number */}
        <div className="mb-3">
        <label className="block text-sm mb-1 text-gray-600">
            Card Number
        </label>
        <div className="border p-3 rounded">
            <CardNumberElement
            options={{
                style: {
                base: {
                    fontSize: "14px",
                    color: "#32325d"
                }
                }
            }}
            />
        </div>
        </div>

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
            <label className="block text-sm mb-1 text-gray-600">
            Expiry Date
            </label>
            <div className="border p-3 rounded">
            <CardExpiryElement
                options={{
                style: {
                    base: {
                    fontSize: "14px",
                    color: "#32325d"
                    }
                }
                }}
            />
            </div>
        </div>

        <div>
            <label className="block text-sm mb-1 text-gray-600">
            CVC
            </label>
            <div className="border p-3 rounded">
            <CardCvcElement
                options={{
                style: {
                    base: {
                    fontSize: "14px",
                    color: "#32325d"
                    }
                }
                }}
            />
            </div>
        </div>
        </div>

        <button
          disabled={paying}
          className={`w-full py-2 rounded text-white transition
            ${paying ? "bg-gray-400" : "bg-primary hover:bg-primary/90"}
          `}
        >
          {paying ? "Processing..." : "Confirm Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentModal;
