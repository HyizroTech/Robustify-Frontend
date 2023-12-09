import React, { useEffect, useState } from "react";
import FormBox from "../../../../components/FormBox";

import styles from "./PlaceOrder.module.css";

import { OperationsServices } from "../services/operations.service";

import { Items } from "../../../../constants";
const PlaceOrder = () => {
  const [customerData, setCustomerData] = useState({});
  const [orderData, setOrderData] = useState({});
  const [otherOrderData, setOtherOrderData] = useState({});
  const [designEmployees, setDesignEmployees] = useState([]);
  // Define your form fields for each form

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

  const handleCustomerSubmit = (data) => {
    setCustomerData(data);
  };

  const handleOrderSubmit = (data) => {
    setOrderData(data);
  };

  const handleOtherOrderSubmit = (data) => {
    setOtherOrderData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrderData = {
      contactInfo: customerData,
      ...orderData,
      ...otherOrderData,
    };

    try {
      const response = await OperationsServices.createNewOrder(newOrderData);
      console.log(response);
    } catch (error) {
      console.error(error?.response?.data);
    }
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
        <FormBox
          formHead="Other"
          fields={otherOrderFields}
          onSubmit={handleOtherOrderSubmit}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PlaceOrder;
