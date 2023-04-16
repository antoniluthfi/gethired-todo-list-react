import React, { useEffect, useState } from "react";

export default function Button({
  children,
  textColor = "#ffffff",
  backgroundColor = "#16abf8",
  backgroundColorHover = "#1792cf",
  onClick,
  dataCy,
  disabled
}) {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (backgroundColor) {
      setBgColor(backgroundColor);
    }
  }, [backgroundColor]);

  const handleMouseEnter = () => {
    setBgColor(backgroundColorHover);
  };

  const handleMouseLeave = () => {
    setBgColor(backgroundColor);
  };

  return (
    <button
      data-cy={dataCy}
      className="custom-button"
      style={{
        color: textColor,
        backgroundColor: bgColor,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
