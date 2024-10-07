import { AiOutlineBank } from "react-icons/ai";

export default function CardItem() {
  return (
    <div className="border border-gray-300 shadow-md p-4 rounded-md font-semibold flex justify-between">
      <div>
        <h3 className="mb-1">CITI Bank</h3>
        <span className="text-gray-500 text-sm block mb-4">
          A/C**************6839
        </span>
        <h1 className="text-[20px] md:text-[25px] lg:text-[30px] font-bold">
          <span>$</span> 541204
        </h1>
      </div>
      <div>
        <AiOutlineBank className="text-3xl text-purple-500 font-bold" />
      </div>
    </div>
  );
}
