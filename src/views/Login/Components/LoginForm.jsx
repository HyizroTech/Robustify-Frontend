import React, { useContext, useState } from "react";

// Contexts
import { UserContext } from "../../../contexts";

// Services
import { LoginService } from "../service/login.service";

// Styles
import styles from "./LoginForm.module.css";
import useValidateEmptyInputs from "../../../hooks/useValidateEmptyInputs";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUserRole } = useContext(UserContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { errors } = useValidateEmptyInputs(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      try {
        const logInRole = await LoginService.login(
          inputs.username,
          inputs.password
        );
        setUserRole(logInRole);
        navigate("/" + logInRole.toLowerCase());
      } catch (e) {
        setError("Invalid Credentials");
      }
    } else {
      setError("Please Enter Required Fields");
    }
  };

  return (
    <div className={styles.loginFormWrapper}>
      <div className={styles.loginFormHead}>
        <h2>LOGIN</h2>
        <h3>To Continue</h3>
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div className={styles.formInput}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username *"
            value={inputs.username}
            onChange={(e) =>
              setInputs({ ...inputs, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className={styles.formInput}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password *"
            value={inputs.password}
            onChange={(e) =>
              setInputs({ ...inputs, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
