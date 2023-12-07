import React, { useEffect, useState } from "react";
import GeneralTable from "../../../../components/GeneralTable";

import { EmployeeListColumns } from "../../../../constants/tableColumns.const";
import { OperationsServices } from "../services/operations.service";
import { Select, InputLabel, MenuItem, Box, FormControl } from "@mui/material";

// import styles from "./Utilization.module.css";

const Utilization = () => {
  const [employeesUtil, setEmployeesUtil] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [utilizationFilter, setUtilizationFilter] = useState("");

  useEffect(() => {
    const getEmployeesUtil = async () => {
      try {
        const employeeUtil = await OperationsServices.listUsersWithUtil();
        setEmployeesUtil(employeeUtil);
        setFilteredEmployees(employeeUtil);
      } catch (error) {
        console.error(error);
      }
    };
    getEmployeesUtil();
  }, []);

  useEffect(() => {
    let filtered = employeesUtil;

    if (departmentFilter && departmentFilter !== "All") {
      filtered = filtered.filter(
        (user) => user.department === departmentFilter
      );
    } else if (departmentFilter === "All") {
      filtered = employeesUtil;
    }

    if (utilizationFilter) {
      const [min, max] = utilizationFilter.split("-").map(Number);
      filtered = filtered.filter(
        (user) => user.utilization >= min && user.utilization <= max
      );
    }

    setFilteredEmployees(filtered);
  }, [departmentFilter, utilizationFilter, employeesUtil]);

  const utilizationRanges = [
    "0-10",
    "11-20",
    "21-30",
    "31-40",
    "41-50",
    "51-60",
    "61-70",
    "71-80",
    "81-90",
    "91-100",
  ];

  return (
    <div>
      <h2>Utilization</h2>
      <Box sx={{ maxWidth: 400, display: "flex", alignItems: "center" }}>
        <FormControl fullWidth>
          <InputLabel id="department-filter-label">Department</InputLabel>
          <Select
            labelId="department-filter-label"
            id="department-filter"
            value={departmentFilter}
            label="Department"
            onChange={(event) => setDepartmentFilter(event.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
            <MenuItem value="Montage">Montage</MenuItem>
            <MenuItem value="Printing">Printing</MenuItem>
            <MenuItem value="Cutting">Cutting</MenuItem>
            <MenuItem value="Delivery">Delivery</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="utilization-filter-label">Utilization</InputLabel>
          <Select
            labelId="utilization-filter-label"
            id="utilization-filter"
            value={utilizationFilter}
            label="Utilization"
            onChange={(event) => setUtilizationFilter(event.target.value)}
          >
            {utilizationRanges.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <GeneralTable columns={EmployeeListColumns} rows={filteredEmployees} />
    </div>
  );
};

export default Utilization;
