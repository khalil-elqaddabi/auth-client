import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("Compte créé avec succès");
      navigate("/profile");
    } catch (error) {
      setMessage("Échec de création du compte");
      console.log(error.response?.data);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="title">Register</h1>
        <p className="subtitle">Crée ton compte pour continuer</p>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrer votre nom"
            />
          </div>

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
              placeholder="Créer un mot de passe"
            />
          </div>

          <button className="btn" type="submit">
            Créer un compte
          </button>
        </form>

        <div className="auth-footer">
          Tu as déjà un compte ? <Link to="/login"><span>Se connecter</span></Link>
        </div>
      </div>
    </div>
  );
}