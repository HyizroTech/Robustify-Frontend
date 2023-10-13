import React from "react";

// Images
import Logo from "../../../assets/Application-Logo.png";

// Components
import LoginForm from "./LoginForm";

// Styles
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginIntro}>
        <img src={Logo} alt="logo" />
        <h1>Robustify</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
