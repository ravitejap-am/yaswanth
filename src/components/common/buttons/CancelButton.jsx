import React from "react";

function CancelButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        color: "rgb(51, 65, 85)",
        backgroundColor: "transparent",
        width: "130px",
        height: "50px",
        borderRadius: "30px",
        border: "1px solid rgb(218, 218, 218)",
        cursor: "pointer",
        outline: "none",
        fontWeight: "400",
        fontSize: "1rem",
        fontFamily: "Montserrat, Arial, sans-serif",
        lineHeight: "1.5",
        transition: "background-color 0.3s, border-color 0.3s",
      }}
      onMouseOver={(e) => {
        e.target.style.borderColor = "#5f94f5";
      }}
      onMouseOut={(e) => {
        e.target.style.borderColor = "rgb(218, 218, 218)";
      }}
    >
      Cancel
    </button>
  );
}

export default CancelButton;
