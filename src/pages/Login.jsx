import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("Connexion réussie");
      navigate("/profile");
    } catch (error) {
      setMessage("Email ou mot de passe incorrect");
      console.log(error.response?.data);
    }
  };
  const handleGoogleLogin = () => {
  window.location.href = "http://127.0.0.1:8000/api/auth/google/redirect";
};
const handleGithubLogin = () => {
  window.location.href = "http://127.0.0.1:8000/api/auth/github/redirect";
};

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="title">Login</h1>
        <p className="subtitle">Connecte-toi pour accéder à ton compte</p>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrer votre email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrer votre mot de passe"
            />
          </div>

          <button className="btn" type="submit">
            Se connecter
          </button>
          <button className="btn1" type="button" onClick={handleGoogleLogin}>
  Continuer avec Google
</button>
<button className="btn" type="button" onClick={handleGithubLogin}>
  Continuer avec GitHub
</button>
        </form>

        <div className="auth-footer">
          Tu n'as pas de compte ? <Link to="/register"><span>S'inscrire</span></Link>
        </div>
      </div>
    </div>
  );
}