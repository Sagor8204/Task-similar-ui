"use client";
import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import Pagination from "./Pagination";
import { transcations } from "./transactionsData";
import TransactionTop from "./TransactionTop";
import TransactonTableThead from "./TransactonTableThead";

// format date like (07 oct 24) mean day, month and year
const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

// sorted transactionData to show assending wise
const initialSortedDate = [...transcations].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

export default function Transactions() {
  const [transactionsData, setTransactionData] = useState(
    initialSortedDate || []
  );
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [transactionPerPage] = useState(10);
  const [sortedOrder, setSortedOrder] = useState(true);
  const [selectDate, setSelectDate] = useState("");
  const [date, setDate] = useState(
    `12 months (${formatDate(
      new Date(new Date().setDate(new Date().getDate() - 365))
    )} - ${formatDate(new Date())})`
  );

  // calculate the pages for pagination
  const totalPages = Math.ceil(transactionsData.length / transactionPerPage);

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

  // convert to date object
  const convetToDateObject = (dateString) => {
    return new Date(dateString);
  };

  // filter data by 12 months , 30 days , 7 days and 24 hours
  const filterDataByRange = (range) => {
    const currentDate = new Date();
    let startDate;

    const filteredArray = initialSortedDate.filter((item) => {
      const itemDate = convetToDateObject(item.date);

      // Calculate start date based on the selected range
      switch (range) {
        case "12 months":
          startDate = new Date();
          startDate.setDate(currentDate.getDate() - 365);
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
    setCurrentpage(1);
    setDate(`${range} (${formatDate(startDate)} - ${formatDate(currentDate)})`);
  };

  // filter transaction by selectedDate mean a specific date
  const filterByDate = (date) => {
    const filteredArray = transcations.filter((item) => item.date === date);
    setTransactionData(filteredArray);
    setDate(`1 day (${formatDate(date)})`);
    setSelectDate("");
    setCurrentpage(1);
  };

  // handle the selectDate for state change
  const handleDateChange = (event) => {
    const currentDate = event.target.value;
    setSelectDate(currentDate);
    filterByDate(currentDate);
  };

  // totalpages for paginatin and indexof first item and last item of transaction
  const indexOfLastTransaction = currentPage * transactionPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;

  return (
    <div>
      <TransactionTop
        date={date}
        filterDataByRange={filterDataByRange}
        selectDate={selectDate}
        handleDateChange={handleDateChange}
      />

      <div className="h-[552px] overflow-x-scroll lg:overflow-x-hidden mb-3 overflow-y-hidden">
        <table className="transacion_table min-w-[1050px] w-full border border-gray-300">
          <TransactonTableThead
            sortedData={sortedData}
            sortedOrder={sortedOrder}
            isAllChecked={isAllChecked}
            setIsAllChecked={setIsAllChecked}
          />
          <tbody className="relative">
            {transactionsData.length > 0 ? (
              transactionsData
                .slice(indexOfFirstTransaction, indexOfLastTransaction)
                .map((data, index) => (
                  <Transaction
                    data={data}
                    key={index}
                    isAllChecked={isAllChecked}
                  />
                ))
            ) : (
              <div className="absolute not_found top-20 font-semibold text-gray-500">
                <h2>Sorry! There is no Transaction in {date}</h2>
              </div>
            )}
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
