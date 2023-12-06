import React, { useState } from "react";

import styles from "./styles/FormBox.module.css";

const FormBox = ({ formHead, fields, onSubmit }) => {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };
  return (
    <div className={styles.box}>
      <h2>{formHead}</h2>
      <form onSubmit={handleSubmit} className={styles.boxForm}>
        {fields.map((field) => (
          <label key={field.name}>
            {field.label}
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormBox;
