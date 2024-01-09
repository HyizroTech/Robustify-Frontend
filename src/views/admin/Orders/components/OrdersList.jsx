import React, { useEffect, useState } from "react";

// Services
import { OrdersServices } from "../services/orders.service";

// Components
import GeneralTable from "../../../../components/GeneralTable";
import {
  Select,
  InputLabel,
  MenuItem,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// Constant
import { OrderListColumns } from "../../../../constants/tableColumns.const";

// Styles
import styles from "./OrdersList.module.css"

const InProgressOptions = [
  "Design",
  "Montage",
  "Printing",
  "Cutting",
  "Delivery",
];

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersList = await OrdersServices.list();
        setOrders(ordersList);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

  const handleFilterChange = (value, filterType) => {
    if (filterType === "select") {
      setFilter(value);
    } else {
      setFilter(filter === value ? "" : value);
    }
  };

  const getFilteredOrders = () => {
    if (!filter) return orders;
    return orders.filter((order) => {
      return order.status === filter;
    });
  };

  return (
    <div className={styles.ordersListWrapper}>
      <h2>Orders</h2>
      <Box
        sx={{
          minWidth: 800,
          display: "flex",
          alignItems: "center",
          gap: "4rem"
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="notStarted"
              value="Not Started"
              checked={filter === "Not Started"}
              onChange={() => handleFilterChange("Not Started", "checkbox")}
            />
          }
          label="Not Started"
        />
        <FormControl fullWidth>
          <InputLabel id="department-filter-label">Department</InputLabel>
          <Select
            labelId="department-filter-label"
            id="department-filter"
            label="Department"
            displayEmpty
            value={InProgressOptions.includes(filter) ? filter : ""}
            onChange={(e) => handleFilterChange(e.target.value, "select")}
          >
            <MenuItem value={null}>None</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
            <MenuItem value="Montage">Montage</MenuItem>
            <MenuItem value="Printing">Printing</MenuItem>
            <MenuItem value="Cutting">Cutting</MenuItem>
            <MenuItem value="Delivery">Delivery</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              name="inTransit"
              value="In Transit"
              checked={filter === "In Transit"}
              onChange={() => handleFilterChange("In Transit", "checkbox")}
            />
          }
          label="In Transit"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="completed"
              value="Completed"
              checked={filter === "Completed"}
              onChange={() => handleFilterChange("Completed", "checkbox")}
            />
          }
          label="Completed"
        />
      </Box>
      <GeneralTable columns={OrderListColumns} rows={getFilteredOrders()} />
    </div>
  );
};

export default OrdersList;
