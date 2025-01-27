import Lottie from "lottie-react";
import React, { useState } from "react";

function Bingo(props) {
  const { bingo } = props;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-yellow-400 bingo transition-all ${
        bingo ? "active" : ""
      }`}
    >
      <div className="rounded-full flex justify-center items-center h-full w-full">
        <h1 className="text-4xl text-center text-white font-bold p-4">
          Bingo!
        </h1>
      </div>
    </div>
  );
}

export default Bingo;
