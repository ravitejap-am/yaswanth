import React from "react";

function CancelButton({ onClick, style, text, onMouseOver, onMouseOut }) {
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
        ...style,
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {text}
    </button>
  );
}

export default CancelButton;
