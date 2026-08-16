import { useState } from "react";
import styles from "./CheckoutForm.module.css";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({
  razorpayOrderId,
  amount,
  currency,
  keyId,
}) {
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsProcessing(true);
      setMessage(null);

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        order_id: razorpayOrderId,

        name: "LS LearnHub",
        description: "Course Purchase",

        handler: function (response) {
          //   console.log("Payment response:", response);

          setMessage(
            "Payment successful! Your subscription will be activated shortly.",
          );

          setIsProcessing(false);

          navigate("/thankyou");
        },

        modal: {
          ondismiss: function () {
            setMessage("Payment cancelled.");
            setIsProcessing(false);
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log("Payment failed:", response.error);

        setMessage(response.error?.description || "Payment failed.");

        setIsProcessing(false);
      });

      razorpay.open();
    } catch (error) {
      console.error(error);

      setMessage(
        error.message || "Something went wrong while starting payment.",
      );

      setIsProcessing(false);
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className={styles.paymentForm}
    >
      <div className={styles.checkoutCard}>
        <h2>Complete Your Purchase</h2>

        <p>You're one step away from starting your course.</p>

        <button
          type="submit"
          disabled={isProcessing}
          id="submit"
          className={styles.payButton}
        >
          {isProcessing ? "Processing..." : "Pay now"}
        </button>

        {message && (
          <div id="payment-message" className={styles.message}>
            {message}
          </div>
        )}
      </div>
    </form>
  );
}
