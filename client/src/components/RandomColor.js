import React, { useState, useEffect } from "react";

const RandomColors = () => {
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 156 + 50); // Red: 50-205
    const g = Math.floor(Math.random() * 156 + 50); // Green: 50-205
    const b = Math.floor(Math.random() * 156 + 50); // Blue: 50-205
    return `rgb(${r}, ${g}, ${b})`;
  };

  const generateColorsArray = (count) => {
    return Array.from({ length: count }, () => generateRandomColor());
  };

  const colors = [
    "#b790cc", "#45ad9a", "#6f6aba", "#7c96c2",
    "#3fc6a8", "#85a244", "#645694", "#7b9b61",
    "#b17e74", "#3a73cc", "#7c656e", "#75b24d",
    "#5b82c0", "#898792", "#67a252", "#b3a74f"
  ]
  

//   useEffect(() => {
//     setColors(generateColorsArray(16)); // Generate 15 random colors on mount
//   }, []);
console.log(colors)
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
          title={color} // Tooltip to show color code
        ></div>
      ))}
    </div>
  );
};

export default RandomColors;
