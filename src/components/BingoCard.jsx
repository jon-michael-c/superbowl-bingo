import React, { useState, useEffect, useRef } from "react";
import BingoItem from "./BingoItem";
import BingoItems from "../utils/bingoItems";
import Bingo from "./Bingo";
import { Logo } from "./Logo";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faDownload,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas"; // For saving the card as an image
import Popup from "./Popup";
import { Title } from "./Title";

function BingoCard() {
  const [items, setItems] = useState([]);
  const [marked, setMarked] = useState(Array(25).fill(false));
  const [bingo, setBingo] = useState(false);
  const [htplay, setHtplay] = useState(false);
  const [shPop, setShPop] = useState(false);
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
      return updated;
    });
  }, []);

  // Function to shuffle the bingo items
  const handleShuffle = (arg) => {
    const shuffle = () => {
      const bingoItems = new BingoItems();
      bingoItems.shuffle();
      setItems(bingoItems.items.slice(0, 25));
      setMarked(Array(25).fill(false)); // Reset marked cells
      setMarked((prevMarked) => {
        const updated = [...prevMarked];
        return updated;
      });
      // Reset bingo state
      setBingo(false);
    };

    if (!isMarked() || arg) {
      shuffle();
      setShPop(false);
    } else {
      setShPop(true);
    }
  };

  const isMarked = () => {
    let indices = marked.reduce(function (r, v, i) {
      return r.concat(v === true ? i : []);
    }, []);
    return indices.length > 1;
  };

  // Function to save the bingo card as an image
  const handleSaveAsImage = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "bingo-card.png";
        link.href = canvas.toDataURL();
        link.target = "_blank";
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
        <Title />
        <div className="px-[24px] sm:px-0">
          <Button
            onClick={() => {
              setHtplay(true);
            }}
          >
            How to Play
          </Button>
        </div>
        <div
          className="aspect-[3/4] sm:aspect-square w-full h-auto bg-white my-3 sm:my-8"
          ref={cardRef} // Attach ref to the bingo card
        >
          <div className="grid grid-cols-5 overflow-hidden">
            {items.map((item, index) =>
              index != 12 ? (
                <BingoItem
                  onClick={handleMark(index)}
                  marked={marked[index]}
                  key={index}
                  freespace={index === 12}
                >
                  {item}
                </BingoItem>
              ) : (
                <BingoItem
                  onClick={handleMark(index)}
                  marked={marked[index]}
                  key={index}
                  freespace={index === 12}
                >
                  <img src="/free.webp" />
                </BingoItem>
              )
            )}
          </div>
        </div>
        <div className="lg:absolute lg:right-0 lg:bottom-0 lg:-mx-64 lg:my-0 mb-4">
          <div className="w-full lg:w-[200px] justify-center flex gap-3 lg:flex-col">
            <div className="w-fit sm:w-full">
              <Button onClick={() => handleShuffle(false)}>
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
      <div className="w-full mx-auto max-w-[300px] flex justify-center items-center">
        <Logo fill="#FFB55E" />
      </div>
      <Bingo bingo={bingo} />
      <Popup isActive={htplay} onClose={() => setHtplay(false)}>
        <p className="text-purple text-2xl font-bold mb-4">How to Play</p>
        <p className="font-semibold text-xl">Play in your browser</p>
        <ol className="list-decimal list-outside ml-5 [&>li]:my-2">
          <li>Mark squares: Click once to mark, click again to unmark.</li>
          <li>
            New card: Refresh the page or hit the "Shuffle" button for a fresh
            card.
          </li>
          <li>
            Play with friends: Hit the “Copy URL” button and send it to your
            friends—they'll get their own unique card!
          </li>
        </ol>
        <p className="font-semibold text-xl mt-4">Play offline</p>
        <ol className="list-decimal list-outside ml-5 [&>li]:my-2">
          <li>
            Download your card: Click the "Save as Image" button to save it.
          </li>
          <li>
            Print or mark digitally: Open the file to print, or use it on your
            device.
          </li>
          <li>
            Make more cards: Click the "Shuffle" button or refresh the page for
            a new card, download, and repeat as needed!
          </li>
        </ol>
      </Popup>
      <Popup isActive={shPop} onClose={() => setShPop(false)}>
        <p className="text-purple text-2xl font-bold mb-1">
          Wait! Are you sure you want to shuffle?
        </p>
        <p>You’ll lose your progress and generate a new card.</p>
        <p>
          If you just want to clear your card, click the marked squares to
          unmark them instead
        </p>
        <div className="flex gap-2 mt-4">
          <Button onClick={() => setShPop(false)}>Keep Playing</Button>
          <Button onClick={() => handleShuffle(true)}>Shuffle</Button>
        </div>
      </Popup>
    </>
  );
}

export default BingoCard;
