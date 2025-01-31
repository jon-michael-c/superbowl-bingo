import Lottie from "lottie-react";
import React, { useState } from "react";
import Confettie from "./Confettie";
import Button from "./Button";
import { Logo } from "./Logo";

function Bingo(props) {
  const { bingo } = props;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-midnight bingo  ${
        bingo ? "active" : ""
      }`}
    >
      <div className="rounded-full flex justify-center items-center h-full w-full">
        <div className="grid gap-2 text-center text-white">
          <h1 className="text-[70px] sm:text-[150px] text-center text-white uppercase leading-[1] font-Breve">
            Bingo!
          </h1>
          <p className="text-[28px] sm:text-[40px]">Congrats!</p>
          <p className="sm:text-[28px] mb-4">From Team Leibowitz</p>
          <div className="w-fit mx-auto">
            <Button onClick={() => window.location.reload()}>Play Again</Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Logo fill="#FFF" />
      </div>
      <div className="absolute top-0 left-0 w-[130%] sm:w-full h-full z-[-1]">
        {bingo && <Confettie />}
      </div>
    </div>
  );
}

export default Bingo;
