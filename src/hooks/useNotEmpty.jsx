import { useState } from "react";

// Define the custom hook
function useNotEmpty(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue.trim() === "") {
      setError("This field cannot be empty");
    } else {
      setError(null);
    }
  };

  return {
    value,
    onChange: handleChange,
    error,
    isValid: error === null,
  };
}

export default useNotEmpty;
