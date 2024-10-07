export default function TransactionTop({
  date,
  filterDataByRange,
  selectDate,
  handleDateChange,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mb-5">
      <div className="flex flex-col md:flex-row items-center font-semibold mdgap-3 mb-2 lg:mb-0 gap-2">
        <h1 className="text-lg lg:text-xl font-bold">Recent Transaction</h1>
        <span className="text-sm text-gray-500 mt-1">{date}</span>
      </div>
      <div className="flex flex-col sm:flex-row justify-start lg:justify-end gap-2">
        <button
          onClick={() => filterDataByRange("12 months")}
          className="w-fit sm:w-full mx-auto sm:mx-0 border border-gray-300 px-3 py-2 text-sm rounded-md font-semibold"
        >
          12 months
        </button>
        <button
          onClick={() => filterDataByRange("30 days")}
          className="w-fit sm:w-full mx-auto sm:mx-0 border border-gray-300 px-3 py-2 text-sm rounded-md font-semibold"
        >
          30 days
        </button>
        <button
          onClick={() => filterDataByRange("7 days")}
          className="w-fit sm:w-full mx-auto sm:mx-0 border border-gray-300 px-3 py-2 text-sm rounded-md font-semibold"
        >
          7 days
        </button>
        <button
          onClick={() => filterDataByRange("24 hours")}
          className="w-fit sm:w-full mx-auto sm:mx-0 border border-gray-300 px-3 py-2 text-sm rounded-md font-semibold"
        >
          24 hours
        </button>
        <button>
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
        </button>
      </div>
    </div>
  );
}
