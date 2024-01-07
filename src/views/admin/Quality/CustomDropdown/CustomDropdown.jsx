import React, { useState } from "react";
import "./CustomDropdown.css";

const CustomDropdown = ({ selected, selectTitle, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    selected(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.value : selectTitle}
      </button>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li key={index} onClick={() => selectOption(option)}>
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
