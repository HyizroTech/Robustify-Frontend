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
  const { setLoggedInId } = useContext(UserContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { errors } = useValidateEmptyInputs(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const logInId = await LoginService.login(
          inputs.username,
          inputs.password
        );
        setLoggedInId(logInId);
        navigate("/");
      } catch (e) {
        setError("Invalid Credentials");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please Enter Required Fields");
    }
  };

  return (
    <div className={styles.loginFormWrapper}>
      <div className={styles.loginFormHead}>
        <p>Please enter your Log-In credentials </p>
      </div>
      {error && <p>{error}</p>}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formInput}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="example@email.com"
            value={inputs.username}
            onChange={(e) =>
              setInputs({ ...inputs, [e.target.name]: e.target.value })
            }
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className={styles.formInput}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="**********"
            value={inputs.password}
            onChange={(e) =>
              setInputs({ ...inputs, [e.target.name]: e.target.value })
            }
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
