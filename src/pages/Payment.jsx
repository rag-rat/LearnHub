import CheckoutForm from "./CheckoutForm";
import { getUser } from "../utils/getUser";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";
import { useLoaderData } from "react-router-dom";
import { requireAuth } from "../utils/requireAuth";
import isTokenExpired from "../utils/isTokenExpired";
import refreshToken from "../utils/refreshToken";
import axios from "axios";
import styles from "./Payment.module.css";

export async function paymentLoader({ request, params }) {
  const pathname = new URL(request.url).pathname;

  await requireAuth({ redirectTo: pathname });

  let { access_token, expires_at } = await getUser();

  if (isTokenExpired(expires_at)) {
    console.log("Token Expired :(");
    access_token = await refreshToken();
  }

  try {
    const { data } = await axios.post(
      `${BASE_URL}/functions/v1/create-razorpay-payment`,
      {
        course_id: params.courseID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          apikey: SUPABASE_API_KEY,
        },
      },
    );

    return {
      error: null,
      razorpayOrderId: data.razorpayOrderId,
      amount: data.amount,
      currency: data.currency,
      keyId: data.keyId,
    };
  } catch (error) {
    return {
      error: error?.response?.data?.error || error.message,
    };
  }
}

function Payment() {
  const { error, razorpayOrderId, amount, currency, keyId } = useLoaderData();

  if (error) {
    <div className={styles.errorPage}>
      <h1>Unable to start payment</h1>
      <p>{error}</p>
    </div>;
  }

  return (
    <>
      <main className={styles.paymentPage}>
        <div className={styles.heading}>
          <h1>Complete Your Payment</h1>

          <p>You're one step away from starting your course.</p>
        </div>

        {razorpayOrderId && (
          <CheckoutForm
            razorpayOrderId={razorpayOrderId}
            amount={amount}
            currency={currency}
            keyId={keyId}
          />
        )}
      </main>
    </>
  );
}

export default Payment;
