import React, { useState } from "react";
import { OperationsServices } from "../services/operations.service";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
    itemName: "",
    itemSize: "",
    itemType: "",
  });

  const [purchaseInfo, setPurchaseInfo] = useState({
    quantity: "",
    cost: "",
    purchaseDate: "",
    arrivalDate: "",
  });

  const [itemTypes, setItemTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Define your form fields for each Box
  const customerFields = [
    { name: "name", placeholder: "Customer Name" },
    { name: "location", placeholder: "Address" },
    { name: "phone", placeholder: "Phone Number" },
    { name: "email", placeholder: "Email Address", type: "email" },
  ];

  const purchaseFields = [
    { name: "quantity", placeholder: "Quantity", type: "number" },
    { name: "cost", placeholder: "Cost", type: "number" },
    { name: "purchaseDate", placeholder: "Purchase Date", type: "date" },
    { name: "arrivalDate", placeholder: "Arrival Date", type: "date" },
  ];

  const handleItemChange = (e) => {
    const selectedItemName = e.target.value;
    const selectedItem = Object.values(Items).find(
      (item) => item.name === selectedItemName
    );
    const size = selectedItem ? selectedItem.size : "";
    const itemTypes =
      selectedItem.name !== "Varnish"
        ? Object.values(selectedItem.types).map((type) => type.name)
        : [];

    setItemTypes(itemTypes);

    setItemInfo({
      ...itemInfo,
      itemSize: size,
      [e.target.name]: selectedItemName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const isEmpty =
      Object.values(customerData).some((value) => value === "") ||
      Object.values(itemInfo).some((value) => value === "") ||
      Object.values(purchaseInfo).some((value) => value === "");

    if (isEmpty) {
      setErrorMessage("Please fill in all the fields.");
    } else {
      const purchaseData = {
        contactInfo: customerData,
        item: itemInfo,
        ...purchaseInfo,
      };

      try {
        await OperationsServices.createNewPurchase(purchaseData);
      } catch (error) {
        console.error(error?.response?.data);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Purchase New Document</h2>
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
            <h3>Item Info</h3>
            <div className={styles.boxInput}>
              <FormControl fullWidth>
                <InputLabel>Item</InputLabel>
                <Select
                  name="itemName"
                  displayEmpty
                  label="Item"
                  value={itemInfo["itemName"]}
                  variant="outlined"
                  onChange={handleItemChange}
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
                value={itemInfo.itemSize}
                disabled
              />
              {itemTypes.length > 0 && (
                <FormControl fullWidth>
                  <InputLabel>Item Type</InputLabel>
                  <Select
                    name="itemType"
                    displayEmpty
                    label="Item Type"
                    value={itemInfo["itemType"]}
                    variant="outlined"
                    onChange={(e) =>
                      setItemInfo({
                        ...itemInfo,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    {itemTypes.map((item, index) => (
                      <MenuItem key={`item-${index}-${item}`} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
          </div>
          <div className={styles.box}>
            <h3>Purchase Info</h3>
            <div className={styles.boxInput}>
              {purchaseFields.map((field) => {
                if (field.type === "date") {
                  return (
                    <LocalizationProvider
                      dateAdapter={AdapterMoment}
                      key={field.name}
                    >
                      <DateField
                        name={field.name}
                        label={field.placeholder}
                        onChange={(momentDate) =>
                          setPurchaseInfo({
                            ...purchaseInfo,
                            [field.name]: momentDate.format("YYYY-MM-DD"),
                          })
                        }
                      />
                    </LocalizationProvider>
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
                      setPurchaseInfo({
                        ...purchaseInfo,
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

export default PlaceDocument;
