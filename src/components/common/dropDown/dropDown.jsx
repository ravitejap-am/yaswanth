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

  console.log('====================================');
  console.log(style );
  console.log('====================================');
  return (
    <div >
      <select
        // id="select"
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
        <option value="" labelColor="black" disabled >
          <div style={{ paddingLeft: "10px", color: "black" }}>
            {" "}
            {placeholder || "Select an option"}
          </div>
        </option>
          {options.map((option) => (
            <option style={{color:"black"}} key={option.value} value={option.value}>
          
            {option.label}
            
              
            </option>
          ))}
      </select>

      {isOpen && (
        <div>
          {options.map((option) => (
            <div
              key={option.value}
              style={{ color: "black" }}
              onClick={() => handleSelect(option)}
            >
              <div>{option.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
