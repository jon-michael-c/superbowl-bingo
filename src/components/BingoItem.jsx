import React from "react";

function BingoItem(props) {
  const { children, marked, onClick, freespace } = props;

  return (
    <button
      onClick={onClick}
      disabled={freespace}
      className={`relative overflow-hidden whitespace-break-spaces cursor-pointer text-[13px] sm:text-[14px] text-midnight text-center flex items-center justify-center aspect-[3/4] sm:aspect-square transition-all border-solid border-[0.5px] border-black disabled:pointer-events-none ${
        marked ? "bg-yellow" : ""
      } ${freespace ? "font-semibold" : ""}`}
    >
      {children}
    </button>
  );
}

export default BingoItem;
