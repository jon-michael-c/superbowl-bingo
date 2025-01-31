import React from "react";

function Popup(props) {
  const { children, onClose, isActive } = props;

  const popStyles = {
    visibility: "visible",
    opacity: 1,
    transform: "scale(1)",
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-md invisible opacity-0 transition-all `}
      style={isActive ? popStyles : {}} // Add inline styles
    >
      <div
        className={`relative bg-white text-midnight w-[93%] max-w-[600px] mx-auto my-auto p-8 border border-solid border-midnight scale-[0.001] transition-transform duration-[0.4s] ease-[cubic-bezier(.47,1.64,.41,.8)]`}
        style={isActive ? { transform: "scale(1)" } : {}} // Add inline styles
      >
        <button
          className="absolute top-0 right-4 w-fit h-fit text-[1.75rem] text-midnight"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
