import React from "react";

export const Title = () => {
  return (
    <>
      <div className="flex gap-2 items-center justify-center">
        <img
          className="w-[23%] max-w-[75px] h-auto sm:max-w-[20%] sm:h-full sm:w-auto"
          src="/stamp.webp"
          alt="stamp"
        />
        <div className="sm:flex sm:gap-0">
          <p className="text-yellow text-[25px] sm:text-[35px] leading-[1] sm:leading-[1.35] uppercase tracking-widest">
            Super
            <br className="hidden sm:block" />
            Bowl
          </p>
          <p className="font-Breve text-yellow text-[45px] leading-[1] tracking-widest  sm:text-[100px]">
            BINGO
          </p>
        </div>
      </div>
    </>
  );
};
