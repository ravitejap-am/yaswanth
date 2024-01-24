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

  const placeholderStyle = {
    color: "var(--Neutral-600, #475569)",
    paddingLeft: "10px",
    fontFamily: "Into Lato",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "24px",
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
        style={{ ...style, marginLeft: "" }}
      >
        <option value="" disabled style={placeholderStyle}>
          {placeholder || "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isOpen && (
        <div className={Style["dropdown-list"]}>
          {options.map((option) => (
            <div
              key={option.value}
              className={Style["dropdown-item"]}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
