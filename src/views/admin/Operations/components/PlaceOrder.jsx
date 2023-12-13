import React, { useEffect, useState } from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

import styles from "./PlaceOrder.module.css";

import { OperationsServices } from "../services/operations.service";

import { Items } from "../../../../constants";
const PlaceOrder = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
  });
  const [orderData, setOrderData] = useState({
    sizeInWidth: "",
    sizeInHeight: "",
    quantity: "",
    paperType: "",
  });
  const [otherOrderData, setOtherOrderData] = useState({
    assignToId: "",
    deadline: "",
    consumption: "",
    cost: "",
  });
  const [designEmployees, setDesignEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getDesignEmployees = async () => {
      try {
        const employees = await OperationsServices.listDesignEmployees();
        setDesignEmployees(employees);
      } catch (error) {
        console.error(error);
      }
    };
    getDesignEmployees();
  }, []);

  // Define your form fields for each form
  const customerFields = [
    { name: "name", placeholder: "Customer Name" },
    { name: "location", placeholder: "Address" },
    { name: "phone", placeholder: "Phone Number" },
    { name: "email", placeholder: "Email Address", type: "email" },
  ];

  const orderFields = [
    { name: "sizeInWidth", placeholder: "Size In Width", type: "number" },
    { name: "sizeInHeight", placeholder: "Size In Height", type: "number" },
    { name: "quantity", placeholder: "Quantity", type: "number" },
    {
      name: "paperType",
      placeholder: "Paper Type",
      type: "select",
      options: Object.values(Items.paper.types).map((type) => type.name),
    },
  ];

  const otherOrderFields = [
    {
      name: "assignToId",
      placeholder: "Assign To",
      type: "select",
      options: designEmployees,
    },
    { name: "deadline", type: "date" },
    { name: "consumption", placeholder: "Consumption", type: "number" },
    { name: "cost", placeholder: "Cost", type: "number" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const isEmpty =
      Object.values(customerData).some((value) => value === "") ||
      Object.values(orderData).some((value) => value === "") ||
      Object.values(otherOrderData).some((value) => value === "");

    if (isEmpty) {
      setErrorMessage("Please fill in all the fields.");
    } else {
      const newOrderData = {
        contactInfo: customerData,
        ...orderData,
        ...otherOrderData,
      };
      try {
        await OperationsServices.createNewOrder(newOrderData);
      } catch (error) {
        console.error(error?.response?.data);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Place New Order</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
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
            <h3>Order Info</h3>
            <div className={styles.boxInput}>
              {orderFields.map((field) => {
                if (field.type === "select") {
                  return (
                    <FormControl fullWidth key={field.name}>
                      <InputLabel>{field.placeholder}</InputLabel>
                      <Select
                        name={field.name}
                        displayEmpty
                        label={field.placeholder}
                        value={orderData[field.name]}
                        variant="outlined"
                        onChange={(e) =>
                          setOrderData({
                            ...orderData,
                            [e.target.name]: e.target.value,
                          })
                        }
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
                    variant="outlined"
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.box}>
            <h3>Order Info</h3>
            <div className={styles.boxInput}>
              {otherOrderFields.map((field) => {
                if (field.type === "select") {
                  return (
                    <FormControl fullWidth key={field.name}>
                      <InputLabel>{field.placeholder}</InputLabel>
                      <Select
                        name={field.name}
                        displayEmpty
                        value={otherOrderData[field.name]}
                        label={field.placeholder}
                        variant="outlined"
                        onChange={(e) =>
                          setOtherOrderData({
                            ...otherOrderData,
                            [e.target.name]: e.target.value,
                          })
                        }
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
                    variant="outlined"
                    onChange={(e) =>
                      setOtherOrderData({
                        ...otherOrderData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                );
              })}
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

export default PlaceOrder;
