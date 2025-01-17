import React, { useState, useEffect } from "react";
import BingoItem from "./BingoItem";
import BingoItems from "../utils/bingoItems";

function BingoCard() {
  const [items, setItems] = useState([]);
  const [marked, setMarked] = useState(Array(25).fill(false));

  const handleMark = (index) => () => {
    // Toggle the 'marked' state for the clicked index
    setMarked((prevMarked) => {
      const updated = [...prevMarked];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const checkBingo = () => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (
        marked[i * 5] &&
        marked[i * 5 + 1] &&
        marked[i * 5 + 2] &&
        marked[i * 5 + 3] &&
        marked[i * 5 + 4]
      ) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
      if (
        marked[i] &&
        marked[i + 5] &&
        marked[i + 10] &&
        marked[i + 15] &&
        marked[i + 20]
      ) {
        return true;
      }
    }

    // Check diagonals
    if (marked[0] && marked[6] && marked[12] && marked[18] && marked[24]) {
      return true;
    }

    if (marked[4] && marked[8] && marked[12] && marked[16] && marked[20]) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (checkBingo()) {
      alert("Bingo!");
    }
  }, [marked]);

  useEffect(() => {
    // Generate items once on mount
    const bingoItems = new BingoItems();
    bingoItems.shuffle();

    // Take the first 25 items for the bingo card
    setItems(bingoItems.items.slice(0, 25));

    // Set free space
    setMarked((prevMarked) => {
      const updated = [...prevMarked];
      updated[12] = true;
      return updated;
    });

    // No dependencies -> this runs only once
  }, []);

  return (
    <div className="p-4 aspect-square w-[70%] h-auto bg-glass my-8 mx-auto ">
      <div className="grid grid-cols-5 border-4 border-white border-solid   overflow-hidden">
        {items.map((item, index) => (
          <BingoItem
            onClick={handleMark(index)}
            marked={marked[index]}
            key={index}
          >
            {item}
          </BingoItem>
        ))}
      </div>
    </div>
  );
}

export default BingoCard;
