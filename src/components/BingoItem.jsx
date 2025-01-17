import React from "react";

function BingoItem(props) {
  const { children, marked, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`relative  text-center flex items-center justify-center aspect-square transition-all border-solid border-8 border-white ${
        marked ? "bg-red-300" : "bg-glass"
      }`}
    >
      {children}
    </div>
  );
}

export default BingoItem;
