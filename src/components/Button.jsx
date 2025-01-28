import React from "react";

function Button(props) {
  const { children, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="bg-purple text-white text-sm sm:text-[20px] w-full p-2 rounded-[54px] justify-center hover:bg-purple-dark transition-all"
    >
      {children}
    </button>
  );
}

export default Button;
