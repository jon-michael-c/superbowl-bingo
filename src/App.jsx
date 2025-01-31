import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import "./css/bingo.scss";
import BingoCard from "./components/BingoCard";

function App() {
  return (
    <>
      <div className="">
        <BingoCard />
      </div>
    </>
  );
}

export default App;
