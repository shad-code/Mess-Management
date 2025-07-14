import React, { useState, useEffect } from "react";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "../../apis/paymentApi";

const PaymentComponent = () => {
  const [amount, setAmount] = useState("");
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async () => {
    const numericAmount = Number(amount);

    if (!numericAmount || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const response = await createOrder(Number(amount));
      const order = response?.data;

      if (!order) {
        throw new Error("Order creation failed");
      }

      const options = {
        key: "rzp_test_v4iB0iTeCmUnSB", // Razorpay test/public key
        amount: order.amount, // In paise
        currency: order.currency,
        name: "Hostel Mess",
        description: "Mess Payment",
        order_id: order.id,
        handler: async function (response) {
          alert("Payment Successful! ID: " + response.razorpay_payment_id);
          try {
            await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert("Payment verified!");
          } catch (err) {
            console.error("Verification failed", err);
            alert("Payment verification failed!");
          }
        },
        theme: {
          color: "#1e40af",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Failed to initiate payment. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Mess Payment Portal</h2>

      <input
        type="number"
        placeholder="Enter amount (in ₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 px-4 py-2 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={handlePayment}
        className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;
