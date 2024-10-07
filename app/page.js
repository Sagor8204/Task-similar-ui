import CardItem from "@/components/CardItem";
import TabButton from "@/components/TabButton";
import Transactions from "@/components/Transactions";
import { FaPlus } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="max-w-[1500px] mx-auto px-6 lg:px-2 py-4">
      <main>
        <div className="flex items-center gap-5 mb-10">
          <TabButton>Bank Accounts</TabButton>
          <TabButton>Cards</TabButton>
          <TabButton>Statements</TabButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <CardItem />
          <CardItem />
          <CardItem />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          <button className="border border-gray-300 rounded-md shadow-sm flex items-center justify-center gap-4 p-3 font-bold text-purple-500 text-sm md:text-base">
            <FaPlus /> Add New
          </button>
        </div>

        <Transactions />
      </main>
    </div>
  );
}
