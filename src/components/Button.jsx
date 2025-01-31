import React from "react";

function Button(props) {
  const { children, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="bg-purple text-white whitespace-nowrap text-sm sm:text-[20px] w-full py-1 px-4 sm:py-3 sm:px-4 rounded-[54px] justify-center hover:bg-purple-dark transition-all"
    >
      {children}
    </button>
  );
}

export default Button;
