import React, { useState } from "react";

// Styles
import styles from "./LoginForm.module.css";
import useValidateEmptyInputs from "../../../hooks/useValidateEmptyInputs";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { errors } = useValidateEmptyInputs(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(errors);
    if (Object.keys(errors).length === 0) {
      console.log(inputs.username);
      console.log(inputs.password);
    } else {
      console.log(errors);
    }
  };

  return (
    <div className={styles.loginFormWrapper}>
      <div className={styles.loginFormHead}>
        <p>Please enter your Log-In credentials </p>
      </div>
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
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
