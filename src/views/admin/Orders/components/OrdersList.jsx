import React, { useEffect, useState } from "react";

// Services
import { OrdersServices } from "../services/orders.service";

// Componentns
import GeneralTable from "../../../../components/GeneralTable";

import { OrderListColumns } from "../../../../constants/tableColumns.const";
import {
  Select,
  InputLabel,
  MenuItem,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

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
    <div>
      <h2>Orders</h2>
      <Box
        sx={{
          maxWidth: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "spaceBetween",
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
              value="In Tranist"
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
