import React from "react";

function BingoItem(props) {
  const { children, marked, onClick, freespace } = props;

  return (
    <button
      onClick={onClick}
      className={`relative hyphens-auto overflow-hidden whitespace-break-spaces cursor-pointer text-[13px] sm:text-[14px] text-midnight text-center flex items-center justify-center aspect-[3/4] sm:aspect-square transition-all border-solid border-[0.5px] border-black disabled:pointer-events-none  ${
        freespace ? "bg-opacity-0 font-semibold" : ""
      }`}
    >
      <div className="w-[90%]">
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-auto aspect-square sm:w-full sm:h-full z-[0] opacity-0 object-cover"
          src="/mark.webp"
          style={marked ? { opacity: "100%" } : {}}
        />
        {children}
      </div>
    </button>
  );
}

export default BingoItem;
