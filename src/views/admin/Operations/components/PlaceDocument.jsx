import React, { useState, useEffect } from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import { Items } from "../../../../constants";

import styles from "./Operations.module.css";

const PlaceDocument = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
  });

  const [itemInfo, setItemInfo] = useState({
    item: "",
    itemSize: "",
    itemType: "",
    quantity: "",
  });

  const [purchaseInfo, setPurchaseInfo] = useState({
    cost: "",
    purchaseDate: "",
    arrivalDate: "",
  });

  // Define your form fields for each form
  const customerFields = [
    { name: "name", placeholder: "Customer Name" },
    { name: "location", placeholder: "Address" },
    { name: "phone", placeholder: "Phone Number" },
    { name: "email", placeholder: "Email Address", type: "email" },
  ];
  return (
    <div className={styles.container}>
      <h2>Purchase New Document</h2>
      <form className={styles.formContainer}>
        <div className={styles.formsWrapper}>
          <div className={styles.box}>
            <h3>Customer Info</h3>
            <div className={styles.boxInput}>
              {customerFields.map((field) => (
                <TextField
                  fullWidth
                  key={field.name}
                  type={field.type || "text"}
                  name={field.name}
                  label={field.placeholder}
                  variant="outlined"
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              ))}
            </div>
          </div>
          <div className={styles.box}>
            <h3>Item Info</h3>
            <div className={styles.boxInput}>
              <FormControl fullWidth>
                <InputLabel>Item</InputLabel>
                <Select
                  name="item"
                  displayEmpty
                  label="Item"
                  value={itemInfo["item"]}
                  variant="outlined"
                  onChange={(e) =>
                    setItemInfo({
                      ...itemInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  {Object.values(Items).map((item) => (
                    <MenuItem
                      key={`item-${item.id}-${item.name}`}
                      value={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="text"
                name="itemSize"
                label="Item Size"
                variant="outlined"
              />
            </div>
          </div>
        </div>
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PlaceDocument;
