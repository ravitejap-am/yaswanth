import React, { useState } from "react";
import Style from "./dropDown.madule.css";

function Dropdown({ options, onSelect, style, placeholder }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className={Style.dropdownContainer}>
      <select
        className="dropdown-header"
        value={selectedOption ? selectedOption.value : ""}
        onChange={(e) => {
          const selectedValue = e.target.value;
          const selectedOption = options.find(
            (option) => option.value === selectedValue
          );
          handleSelect(selectedOption);
        }}
        style={style}
      >
        <option value="" disabled style={{ marginLeft: "-20px" }}>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {/* {option.label ? placeholder : null} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
