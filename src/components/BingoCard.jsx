import React, { useState, useEffect, useRef } from "react";
import BingoItem from "./BingoItem";
import BingoItems from "../utils/bingoItems";
import Bingo from "./Bingo";
import Confettie from "./Confettie";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faDownload,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas"; // For saving the card as an image
import Popup from "./Popup";

function BingoCard() {
  const [items, setItems] = useState([]);
  const [marked, setMarked] = useState(Array(25).fill(false));
  const [bingo, setBingo] = useState(false);
  const [htplay, setHtplay] = useState(false);
  const cardRef = useRef(null); // Ref for the bingo card element

  // Function to handle marking/unmarking a bingo item
  const handleMark = (index) => () => {
    setMarked((prevMarked) => {
      const updated = [...prevMarked];
      updated[index] = !updated[index];
      return updated;
    });
  };

  // Function to check for a bingo
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

  // Effect to check for bingo whenever the marked state changes
  useEffect(() => {
    if (checkBingo()) {
      setBingo(true);
    }
  }, [marked]);

  // Effect to initialize the bingo card on mount
  useEffect(() => {
    const bingoItems = new BingoItems();
    bingoItems.shuffle();
    setItems(bingoItems.items.slice(0, 25));
    setMarked((prevMarked) => {
      const updated = [...prevMarked];
      updated[12] = true; // Set the center cell as marked (free space)
      return updated;
    });
  }, []);

  // Function to shuffle the bingo items
  const handleShuffle = () => {
    const bingoItems = new BingoItems();
    bingoItems.shuffle();
    setItems(bingoItems.items.slice(0, 25));
    setMarked(Array(25).fill(false)); // Reset marked cells
    setMarked((prevMarked) => {
      const updated = [...prevMarked];
      updated[12] = true; // Set the center cell as marked (free space)
      return updated;
    });
    setBingo(false); // Reset bingo state
  };

  // Function to save the bingo card as an image
  const handleSaveAsImage = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "bingo-card.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  // Function to copy the current URL to the clipboard
  const handleCopyURL = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copied to clipboard!"))
      .catch(() => alert("Failed to copy URL."));
  };

  return (
    <>
      <div className="w-full max-w-[600px] mx-auto relative">
        <div>
          <Button
            onClick={() => {
              setHtplay(true);
            }}
          >
            How to Play
          </Button>
        </div>
        <div
          className="aspect-[3/4] sm:aspect-square w-full h-auto bg-white my-8"
          ref={cardRef} // Attach ref to the bingo card
        >
          <div className="grid grid-cols-5 overflow-hidden">
            {items.map((item, index) => (
              <BingoItem
                onClick={handleMark(index)}
                marked={marked[index]}
                key={index}
                freespace={index === 12}
              >
                {item}
              </BingoItem>
            ))}
          </div>
        </div>
        <div className="lg:absolute lg:right-0 lg:bottom-0 lg:-mx-64">
          <div className="w-full lg:w-[200px] justify-center flex gap-3 lg:flex-col">
            <div className="w-fit sm:w-full">
              <Button onClick={handleShuffle}>
                <FontAwesomeIcon icon={faShuffle} /> Shuffle
              </Button>
            </div>
            <div className="w-fit sm:w-full">
              <Button onClick={handleSaveAsImage}>
                <FontAwesomeIcon icon={faDownload} /> Save as Image
              </Button>
            </div>
            <div className="w-fit sm:w-full">
              <Button onClick={handleCopyURL}>
                <FontAwesomeIcon icon={faCopy} /> Copy URL
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Bingo bingo={bingo} />
      <Popup isActive={htplay} onClose={() => setHtplay(false)}>
        <p className="text-purple text-xl font-bold mb-4">How to Play</p>
        <p className="font-semibold text-xl">Play in your browser</p>
        <ol>
          <li> Mark squares: Click once to mark, double-click to unmark.</li>
          <li>
            New card: Refresh the page or hit the "Shuffle" button for a fresh
            card.
          </li>
          <li>
            Play with friends: Hit the “Share” button to copy this page's URL
            and send it to your friends—they'll get their own unique card!
          </li>
        </ol>
      </Popup>
    </>
  );
}

export default BingoCard;
