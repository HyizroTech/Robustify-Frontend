import React, { useState } from "react";
import { Departments, Roles } from "../../../../constants";
import { useModal } from "../../../../contexts/modal.context";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const CreateUser = () => {
  const { hideModal } = useModal();
  
  const handleClick = () => {
    console.log("Clicked");
  };

  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  // Handle change for Select fields
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <div onClick={handleClick}>
      <div>
        <h2>Create New User</h2>
        <button onClick={hideModal}>Close</button>
      </div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Username" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={handleDepartmentChange}
              >
                {Departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={role} label="Role" onChange={handleRoleChange}>
                {Roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default CreateUser;
