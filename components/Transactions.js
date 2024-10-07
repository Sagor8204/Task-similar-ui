"use client";
import { useState, useEffect } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import Transaction from "./Transaction";
import Pagination from "./Pagination";
import { transcations } from "./transactionsData";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const initialSortedDate = [...transcations].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

export default function Transactions() {
  const [transactionsData, setTransactionData] = useState(
    initialSortedDate || []
  );
  const [currentPage, setCurrentpage] = useState(1);
  const [transcatonPerPage] = useState(10);
  const [totalPages, setTotalpages] = useState(
    Math.ceil(transactionsData.length / transcatonPerPage)
  );
  const [sortedOrder, setSortedOrder] = useState(true);
  const [selectDate, setSelectDate] = useState();
  const [date, setDate] = useState(
    `12 months (${formatDate(
      new Date(new Date().setDate(new Date().getDate() - 365))
    )} - ${formatDate(new Date())})`
  );

  // sorting functon
  const sortedData = () => {
    setSortedOrder(!sortedOrder);
    if (sortedOrder) {
      return transactionsData.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }
    return transactionsData.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const convetToDateObject = (dateString) => {
    return new Date(dateString);
  };
  // startDate = new Date(new Date().setDate(currentDate.getDate() - 365));

  const filterDataByRange = (range) => {
    const currentDate = new Date();
    let startDate;

    const filteredArray = transcations.filter((item) => {
      const itemDate = convetToDateObject(item.date);

      // Calculate start date based on the selected range
      switch (range) {
        case "12 months":
          startDate = new Date();
          startDate.setFullYear(currentDate.getFullYear() - 1);
          break;
        case "30 days":
          startDate = new Date();
          startDate.setDate(currentDate.getDate() - 30);
          break;
        case "7 days":
          startDate = new Date();
          startDate.setDate(currentDate.getDate() - 7);
          break;
        case "24 hours":
          startDate = new Date();
          startDate.setHours(currentDate.getHours() - 24);
          break;
        default:
          return false;
      }

      return itemDate >= startDate && itemDate <= currentDate;
    });

    const sortedFilteredArray = filteredArray.sort((a, b) => {
      const dateA = convetToDateObject(a.date);
      const dateB = convetToDateObject(b.date);
      return dateB - dateA; // Sort descending (newest first)
    });

    setTransactionData(sortedFilteredArray);
    setDate(`${range} (${formatDate(startDate)} - ${formatDate(currentDate)})`);
  };

  const filterByDate = (date) => {
    const filteredArray = transcations.filter((item) => item.date === date);
    setTransactionData(filteredArray);
  };

  const handleDateChange = (event) => {
    const currentDate = event.target.value;
    setSelectDate(currentDate);
    filterByDate(currentDate);
  };

  const indexOfLastTransaction = currentPage * transcatonPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transcatonPerPage;

  useEffect(() => {
    setTotalpages(Math.ceil(transactionsData.length / transcatonPerPage));
  }, [transactionsData, transcatonPerPage]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center font-semibold gap-3">
          <h1 className="text-xl font-bold">Recent Transaction</h1>
          <span className="text-sm text-gray-500 mt-1">
            {selectDate ? selectDate : date}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => filterDataByRange("12 months")}
            className="border border-gray-300 px-3 py-2 text-sm rounded-md font-semibold"
          >
            12 months
          </button>
          <button
            onClick={() => filterDataByRange("30 days")}
            className="border border-gray-300 px-3 py-2 text-sm rounded-md font-semibold"
          >
            30 days
          </button>
          <button
            onClick={() => filterDataByRange("7 days")}
            className="border border-gray-300 px-3 py-2 text-sm rounded-md font-semibold"
          >
            7 days
          </button>
          <button
            onClick={() => filterDataByRange("24 hours")}
            className="border border-gray-300 px-3 py-2 text-sm rounded-md font-semibold"
          >
            24 hours
          </button>
          <label htmlFor="date" className="date-input-wrapper">
            <input
              id="date"
              value={selectDate}
              onChange={handleDateChange}
              className="date outline-none"
              type="date"
              placeholder="Select dates"
            />
          </label>
        </div>
      </div>

      <div className="h-[552px] border border-gray-300 rounded-md">
        <table className="transacion_table w-full">
          <thead className="text-[12px] text-gray-500">
            <tr className="border-b border-gray-300">
              <th className="flex items-center gap-2">
                <input type="checkbox" />
                <div
                  onClick={sortedData}
                  className="flex items-center cursor-pointer"
                >
                  <span>Date</span>
                  {sortedOrder ? (
                    <IoIosArrowRoundDown className="text-xl" />
                  ) : (
                    <IoIosArrowRoundUp className="text-xl" />
                  )}
                </div>
              </th>
              <th>Marchant Name</th>
              <th>Description</th>
              <th>Txn ID</th>
              <th>Transcation Type</th>
              <th>Amount</th>
              <th>Account</th>
              <th>Status</th>
              <th>Categories</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData
              .slice(indexOfFirstTransaction, indexOfLastTransaction)
              .map((data, index) => (
                <Transaction data={data} key={index} />
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="font-semibold">
          Page {currentPage} of {totalPages}
        </div>

        <Pagination pages={totalPages} setCurrentPage={setCurrentpage} />
      </div>
    </div>
  );
}
