import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AuthForm.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, [isLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, phone, location } = formData;
    const users = JSON.parse(localStorage.getItem("farmerUsers")) || [];

    if (isLogin) {
      const found = users.find((u) => u.username === username && u.phone === phone);
      if (found) {
        localStorage.setItem("loggedInUser", JSON.stringify(found));
        navigate("/home");
      } else {
        setMessage(t("auth.invalidCredentials"));
      }
    } else {
      if (!username || !phone || !location) {
        setMessage(t("auth.fillAllFields"));
        return;
      }

      if (!validatePhone(phone)) {
        setMessage(t("auth.invalidPhone"));
        return;
      }

      const userExists = users.find(
        (u) => u.username === username || u.phone === phone
      );

      if (userExists) {
        setMessage(t("auth.userExists"));
        return;
      }

      const newUser = { username, phone, location };
      localStorage.setItem("farmerUsers", JSON.stringify([...users, newUser]));
      setMessage(t("auth.registerSuccess"));
      setIsLogin(true);
      setFormData({ username: "", phone: "", location: "" });
    }
  };

  return (
    <div className="home-container">
      <div className="home-background-overlay"></div>
      <h2 className="home-heading">
        {isLogin ? t("auth.loginForm") : t("auth.signupForm")}
      </h2>

      <div className="home-form-wrapper">
        <div className="home-form-box">
          <div className="home-form-inner-box">
            <div className="toggle-buttons">
              <button
                className={`toggle-btn ${isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                {t("auth.login")}
              </button>
              <button
                className={`toggle-btn ${!isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                {t("auth.signup")}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="home-label">{t("auth.username")}</label>
                <input
                  type="text"
                  name="username"
                  placeholder={t("auth.usernamePlaceholder")}
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {isLogin ? (
                <div>
                  <label htmlFor="phone" className="home-label">{t("auth.phone")}</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t("auth.phonePlaceholder")}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="location" className="home-label">{t("auth.location")}</label>
                    <input
                      type="text"
                      name="location"
                      placeholder={t("auth.locationPlaceholder")}
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="home-label">{t("auth.phone")}</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t("auth.phonePlaceholder")}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}

              <button type="submit">{isLogin ? t("auth.login") : t("auth.signup")}</button>
            </form>
            {message && <p className="home-success-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
