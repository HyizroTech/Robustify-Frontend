import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import styles from "./styles/FormBox.module.css";

const FormBox = ({ formHead, fields, onSubmit }) => {
  const [error, setError] = useState("");

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
    setError("");

    const isEmpty = Object.values(formData).some((value) => value === "");

    if (isEmpty) {
      setError("Please fill in all the fields.");
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className={styles.box}>
      <h2>{formHead}</h2>
      <form onSubmit={handleSubmit} className={styles.boxForm}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {fields.map((field) => {
          if (field.type === "select") {
            return (
              <FormControl fullWidth key={field.name}>
                <InputLabel>{field.placeholder}</InputLabel>
                <Select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  displayEmpty
                  label={field.placeholder}
                >
                  {field.options.map((option) => (
                    <MenuItem
                      key={option?.id ? option.id : option}
                      value={option?.id ? option.id : option}
                    >
                      {option?.id ? option.name : option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
          return (
            <TextField
              fullWidth
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              label={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          );
        })}
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Save Data
        </Button>
      </form>
    </div>
  );
};

export default FormBox;
