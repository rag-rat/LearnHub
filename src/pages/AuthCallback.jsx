import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleConfirmation() {
      try {
        // Supabase implicit flow puts tokens in the URL hash
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        const expires_at = params.get("expires_at");

        if (!access_token || !refresh_token) {
          throw new Error("Authentication tokens not found.");
        }

        // Get the authenticated user's information
        const { data } = await axios.get(
          `${BASE_URL}/auth/v1/user`,
          {
            headers: {
              apikey: SUPABASE_API_KEY,
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const user = {
          access_token,
          refresh_token,
          expires_at,
          user_id: data.id,
        };

        // Store it in the exact same format as normal login
        localStorage.setItem("user", JSON.stringify(user));

        // Remove tokens from the URL and go home
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Email confirmation error:", error);

        localStorage.removeItem("user");

        navigate("/login", { replace: true });
      }
    }

    handleConfirmation();
  }, [navigate]);

  return <h2>Confirming your email...</h2>;
}

export default AuthCallback;