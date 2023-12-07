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
      <div className={styles.boxHead}>
        <h2>{formHead}</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.boxForm}>
        {fields.map((field) => {
          if (field.type === "select") {
            return (
              <select
                key={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options.map((option) => (
                  <option
                    key={option?.id ? option.id : option}
                    value={option?.id ? option.id : option}
                  >
                    {option?.id ? option.name : option}
                  </option>
                ))}
              </select>
            );
          }
          return (
            <div key={field.name}>
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button type="submit">Save Data</button>
      </form>
    </div>
  );
};

export default FormBox;
