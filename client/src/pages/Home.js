import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div className="home-container">
      <div className="home-background-overlay"></div>
      <div className="home-form-wrapper">
        <div className="home-form-box">
          <div className="home-form-inner-box" style={{ textAlign: "center" }}>
            {user && (
              <>
                <h2 className="home-greeting">{t("home.welcome")}, {user.username}!</h2>
                <p className="home-location">{t("home.location")}: {user.location}</p>

              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
