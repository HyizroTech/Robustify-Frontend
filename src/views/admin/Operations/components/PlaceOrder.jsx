// PlaceOrder.js
import React, { useState } from "react";
import FormBox from "../../../../components/FormBox";

import styles from "./PlaceOrder.module.css";

const PlaceOrder = () => {
  const [customerData, setCustomerData] = useState({});
  const [orderData, setOrderData] = useState({});
  // Define your form fields for each form
  const customerFields = [
    { name: "customerName", label: "Customer Name" },
    { name: "address", label: "Address" },
    // ... other fields
  ];

  const orderFields = [
    { name: "sizeWidth", label: "Size In Width" },
    { name: "sizeHeight", label: "Size In Height" },
    // ... other fields
  ];

  const handleCustomerSubmit = (data) => {
    setCustomerData(data);
  };

  const handleOrderSubmit = (data) => {
    setOrderData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customerData);
    console.log(orderData);
  };

  // Render the generic form with the field configurations
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <FormBox
          formHead="Customer Info"
          fields={customerFields}
          onSubmit={handleCustomerSubmit}
        />
        <FormBox
          formHead="Order Info"
          fields={orderFields}
          onSubmit={handleOrderSubmit}
        />
        {/* You can add more GenericForm instances with different fields and submission handlers */}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PlaceOrder;
