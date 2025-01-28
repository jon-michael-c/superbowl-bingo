import Lottie from "lottie-react";
import React, { useState } from "react";
import Confettie from "./Confettie";
import Button from "./Button";

function Bingo(props) {
  const { bingo } = props;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-midnight bingo transition-all ${
        bingo ? "active" : ""
      }`}
    >
      <div className="rounded-full flex justify-center items-center h-full w-full">
        <div className="grid gap-2 text-center text-white">
          <h1 className="text-[150px] text-center text-white font-bold p-4">
            Bingo!
          </h1>
          <p>Congrats!</p>
          <p>From Team Leibowitz</p>
          <Button onClick={() => window.location.reload()}>Play Again</Button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        {bingo && <Confettie />}
      </div>
    </div>
  );
}

export default Bingo;
