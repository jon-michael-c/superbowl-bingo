import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import "./css/bingo.scss";
import BingoCard from "./components/BingoCard";

function App() {
  return (
    <>
      <div className="">
        <h1 className="uppercase text-4xl text-white font-bold text-center">
          Bingo
        </h1>
        <BingoCard />
      </div>
    </>
  );
}

export default App;
