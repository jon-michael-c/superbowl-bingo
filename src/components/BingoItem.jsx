import React from "react";

function BingoItem(props) {
  const { children, marked, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer text-[12px] sm:text-md text-midnight text-center flex items-center justify-center aspect-[3/4] sm:aspect-square transition-all border-solid border-[0.5px] border-black ${
        marked ? "bg-yellow" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default BingoItem;
