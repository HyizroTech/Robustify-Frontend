import React, { useState } from "react";
import { Departments, Roles } from "../../../../constants";
import { useModal } from "../../../../contexts/modal.context";
import { UserSettingsServices } from "../services";
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

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    department: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserSettingsServices.create(inputs);
      console.log(response);
    } catch (error) {
      console.error(error?.response?.data);
    }
  };

  return (
    <div>
      <div>
        <h2>Create New User</h2>
        <button onClick={hideModal}>Close</button>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              variant="outlined"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={inputs.department}
                label="Department"
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
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
              <Select
                name="role"
                value={inputs.role}
                label="Role"
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
              >
                {Roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default CreateUser;
