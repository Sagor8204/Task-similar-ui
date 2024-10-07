import { BsStars } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Header() {
  return (
    <div className="flex items-center justify-between py-2 max-w-[1500px] mx-auto px-3 lg:px-0">
      <h1 className="text-[25px] md:text-[30px] lg:text-[40px] font-semibold">
        Banking
      </h1>

      <div className="flex items-center gap-5">
        <div className="hidden sm:flex items-center gap-2 border border-gray-300 shadow-md w-52 px-2 py-2 rounded-md font-semibold text-sm">
          <BsStars className="text-lg" />
          <span>AI Categorisation</span>
          <label
            htmlFor="BasicSwitch_NavigateUI"
            className="relative flex h-fit w-10 items-center rounded-full border border-gray-600 cursor-pointer"
          >
            <input
              type="checkbox"
              className="peer/toggle hidden"
              id="BasicSwitch_NavigateUI"
            />
            <div className="absolute inset-0 z-10 w-0 rounded-full duration-200 peer-checked/toggle:w-full peer-checked/toggle:bg-gray-100"></div>
            <div className="z-20 size-4 rounded-full bg-gray-500 duration-200 peer-checked/toggle:translate-x-6"></div>
          </label>
        </div>

        <div>
          <IoIosNotificationsOutline className="text-2xl" />
        </div>

        <div>
          <img
            width={500}
            height={500}
            className="size-10 rounded-full bg-slate-500 object-cover shadow-md"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
            alt="avatar navigate ui"
          />
        </div>
      </div>
    </div>
  );
}
