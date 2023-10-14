import { useEffect, useState } from "react";

// Define the custom hook
const useValidateEmptyInputs = (formData) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    Object.entries(formData).forEach(([fieldName, fieldValue]) => {
      if (fieldValue === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: { message: "This Field is Required" },
        }));
      }
    });
  }, [formData]);

  return { errors };
};

export default useValidateEmptyInputs;
