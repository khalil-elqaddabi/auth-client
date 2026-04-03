import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h1>Connexion en cours...</h1>
    </div>
  );
}