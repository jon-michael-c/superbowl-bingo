import React from "react";
import mark from "../assets/mark.webp";

function BingoItem(props) {
  const { children, marked, onClick, freespace } = props;

  return (
    <button
      onClick={onClick}
      disabled={freespace}
      className={`relative overflow-hidden whitespace-break-spaces cursor-pointer text-[13px] sm:text-[14px] text-midnight text-center flex items-center justify-center aspect-[3/4] sm:aspect-square transition-all border-solid border-[0.5px] border-black disabled:pointer-events-none  ${
        freespace ? "bg-opacity-0 font-semibold" : ""
      }`}
    >
      <img
        className="absolute top-0 left-0 w-full h-full z-[0] opacity-0 object-cover"
        src="/mark.webp"
        style={marked && !freespace ? { opacity: "100%" } : {}}
      />
      {children}
    </button>
  );
}

export default BingoItem;
