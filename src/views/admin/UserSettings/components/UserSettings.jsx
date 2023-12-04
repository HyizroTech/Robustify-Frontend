import React, { useContext, useEffect, useState } from "react";

// Components
import GeneralTable from "../../../../components/GeneralTable";
import CreateUser from "./CreateUser";

// Constant Variables
import { UserSettingsColumns } from "../../../../constants/tableColumns.const";

// Services
import { UserSettingsServices } from "../services/users.service";

// Contexts
import { UserContext } from "../../../../contexts";
import { useModal } from "../../../../contexts";

const UserSettings = () => {
  const { currentUser } = useContext(UserContext);
  const [employees, setEmployees] = useState([]);

  const { showModal } = useModal();

  useEffect(() => {
    // fetch data and update the state here
    const getEmployees = async () => {
      try {
        const employeesList = await UserSettingsServices.list(
          currentUser?.department
        );
        setEmployees(employeesList);
      } catch (e) {
        console.error(e);
      }
    };
    getEmployees();
  }, [currentUser?.department]);

  const handleEdit = (row) => {
    console.log(row);
    // Your edit logic here
  };

  const handleDelete = (row) => {
    console.log(row);
    // Your delete logic here
  };

  const handleOpenModal = () => {
    showModal(<CreateUser />);
  };

  const columns = [
    ...UserSettingsColumns,
    {
      id: "actions",
      label: "Actions",
      minWidth: 150,
      actions: [
        { label: "Edit", handler: handleEdit },
        { label: "Delete", handler: handleDelete },
      ],
    },
  ];

  return (
    <div>
      <h2>User Settings</h2>
      <GeneralTable columns={columns} rows={employees} />
      <button onClick={handleOpenModal}>Open Modal</button>
    </div>
  );
};

export default UserSettings;
