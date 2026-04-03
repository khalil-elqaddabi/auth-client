import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const userData = response.data.user;
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setMessage("Profile loaded");
      } catch (error) {
        setMessage("Failed to load profile");
        console.log(error.response?.data);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await api.put(
        "/me",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setUser((prev) => ({ ...prev, name, email }));
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage("Profile update failed");
      console.log(error.response?.data);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await api.put(
        "/me/password",
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
      setMessage("Password updated successfully");
    } catch (error) {
      setMessage("Password update failed");
      console.log(error.response?.data);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await api.delete("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="page-container">
      <div className="card profile-card">
        <div className="profile-header">
          <h1 className="title">Profile</h1>
          <p className="subtitle">Gère les informations de ton compte</p>
        </div>

        {message && <div className="message">{message}</div>}

        {user && (
          <div className="profile-box">
            <p><strong>Nom :</strong> {user.name}</p>
            <p><strong>Email :</strong> {user.email}</p>
          </div>
        )}

        <div className="section">
          <h2 className="section-title">Update Profile</h2>

          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label className="form-label">Nom</label>
              <input
                className="form-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="btn" type="submit">
              Update Profile
            </button>
          </form>
        </div>

        <div className="section">
          <h2 className="section-title">Change Password</h2>

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                className="form-input"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                className="form-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                className="form-input"
                type="password"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              />
            </div>

            <button className="btn" type="submit">
              Change Password
            </button>
          </form>
        </div>

        <div className="actions-row">
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>

          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}