"use client";
import React, { useEffect, useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

export default function Pagination({ pages, setCurrentPage }) {
  // set num of pages
  const numOfPages = [];
  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  // current Button state
  const [currentButton, setCurrentButton] = useState(1);
  // arr of buttons state
  const [arrOfButtons, setArrOfButtons] = useState([]);

  useEffect(() => {
    let tempNumOfPages = [...arrOfButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numOfPages.length < 6) {
      tempNumOfPages = numOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumOfPages = [1, 2, 3, 4, dotsInitial, numOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numOfPages.slice(0, 4);
      tempNumOfPages = [...sliced, dotsInitial, numOfPages.length];
    } else if (currentButton > 4 && currentButton < numOfPages.length - 2) {
      const sliced1 = numOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numOfPages.slice(currentButton, currentButton + 1);

      tempNumOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numOfPages.length,
      ];
    } else if (currentButton > numOfPages.length - 3) {
      const sliced = numOfPages.slice(numOfPages.length - 4);
      tempNumOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfButtons[arrOfButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfButtons[3] - 2);
    }

    setCurrentPage(currentButton);
    setArrOfButtons(tempNumOfPages);

    return () => {
      setCurrentPage(1);
      setArrOfButtons(1);
    };
  }, [currentButton, pages]);

  const prevButton = () => {
    setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1));
  };
  const nextButton = () => {
    setCurrentButton((prev) => (prev >= numOfPages.length ? prev : prev + 1));
  };

  return (
    <div className="flex items-center gap-1">
      <button
        className={`${
          currentButton === 1 ? "pointer-events-none opacity-50" : ""
        } p-2 border border-gray-400 rounded-md font-medium w-10 h-10 hover:bg-gray-300`}
        onClick={prevButton}
      >
        <GrPrevious />
      </button>

      {arrOfButtons.map((item, index) => (
        <button
          className={`${
            currentButton === item ? "bg-[#06a4ee] text-white" : ""
          } px-[12px] py-2 border border-gray-400 rounded-md font-medium flex gap-2 hover:bg-gray-300`}
          key={index}
          onClick={() => setCurrentButton(item)}
        >
          {item}
        </button>
      ))}

      <button
        className={`${
          currentButton === numOfPages.length
            ? "pointer-events-none opacity-50"
            : ""
        } p-2 border border-gray-400 rounded-md font-medium w-10 h-10 hover:bg-gray-300`}
        onClick={nextButton}
      >
        <GrNext />
      </button>
    </div>
  );
}
