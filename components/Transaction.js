"use client";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${year} ${monthNames[month - 1]} ${day}`;
};

export default function Transaction({
  data,
  selectedItems,
  handleChange,
  index,
}) {
  return (
    <tr className="text-sm font-medium border-b border-gray-300">
      <td>
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={selectedItems[index]}
            onChange={() => handleChange(index)}
          />
          <div>
            <h3>{formatDate(data.date)}</h3>
            <span className="text-[12px] text-gray-500">{data.deadline}</span>
          </div>
        </div>
      </td>
      <td>
        <div className="text-gray-500">{data.merchantName}</div>
      </td>
      <td>
        <div>
          <h3 className="font-medium">{data.description}</h3>
          <span className="text-purple-500 text-[12px]">{data.some}</span>
        </div>
      </td>
      <td>
        <h2 className="font-semibold">{data.txnId}</h2>
      </td>
      <td>
        <div
          className={`flex items-center gap-1 text-[13px] capitalize border rounded-full px-2 py-[2px] w-fit mx-auto ${
            data.transactionType === "Income"
              ? "text-green-600 border-green-600"
              : data.transactionType === "Expanse"
              ? "text-yellow-600 border-yellow-600"
              : "text-blue-600 border-blue-600"
          }`}
        >
          <FaCheck />
          {data.transactionType}
        </div>
      </td>
      <td>
        <h2 className="font-semibold">{data.amount}</h2>
      </td>
      <td>
        <h2 className="font-semibold text-center">{data.account}</h2>
      </td>
      <td>
        <span
          className={`text-[12px] border capitalize rounded-full px-2 py-[2px] ${
            data.status === "Completed"
              ? "text-green-600 border-green-600"
              : "text-yellow-600 border-yellow-600"
          }`}
        >
          {data.status}
        </span>
      </td>
      <td>
        <div className="flex gap-1">
          {data.categories.map((cate) => (
            <span
              className="text-[12px] border border-gray-300 rounded-md px-1 py-[2px]"
              key={cate}
            >
              {cate}
            </span>
          ))}
        </div>
      </td>
      <td>
        <button className="cursor-pointer p-[6px] rounded-full hover:bg-gray-200 transition-all duration-300">
          <HiOutlineDotsVertical className="text-gray-600 text-lg" />
        </button>
      </td>
    </tr>
  );
}
