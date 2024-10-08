import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";

export default function TransactonTableThead({
  sortedData,
  sortedOrder,
  setIsAllChecked,
  isAllchecked,
}) {
  return (
    <thead className="text-[12px] text-gray-500">
      <tr className="border-b border-gray-300">
        <th className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAllchecked}
            onChange={() => setIsAllChecked(!isAllchecked)}
          />
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
  );
}
