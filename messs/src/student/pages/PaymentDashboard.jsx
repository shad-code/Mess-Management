import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "../../apis/paymentApi";

const PaymentDashboard = () => {
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  // Load Razorpay SDK
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setSdkReady(true);
      script.onerror = () => {
        alert("Failed to load Razorpay SDK. Please try again.");
      };
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const handlePayment = async () => {
    if (!sdkReady) {
      alert("Razorpay SDK not loaded yet. Please wait...");
      return;
    }

    try {
      const amount = 2250 * 100; // amount in paise

      const order = await createOrder(2250).unwrap(); // Pass rupees to backend

      const options = {
        key: "rzp_test_v4iB0iTeCmUnSB", // Razorpay Test Key
        amount: order.amount,
        currency: order.currency,
        name: "Hostel Mess Management",
        description: "Mess Dues Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const result = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            alert("Payment successful and verified!");
            navigate("/student/profile");
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Student Name", // TODO: Replace with actual user data
          email: "student@example.com",
        },
        theme: {
          color: "#0d9488",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Something went wrong while initiating the payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <h1 className="text-4xl font-bold mb-4">Welcome to Payment Dashboard</h1>
        <p className="text-teal-400 text-xl mb-6">Rs. 2250 are due.</p>

        <button
          onClick={handlePayment}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded mb-4"
        >
          Pay Now
        </button>

        <button
          onClick={() => navigate("/student/profile")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default PaymentDashboard;
