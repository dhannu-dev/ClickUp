import { FaRegCalendar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { RiOpenaiLine } from "react-icons/ri";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidVideoRecording } from "react-icons/bi";

function Navbar() {
  return (
    <div className="w-full h-auto p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="bg-zinc-900 rounded-sm px-3 py-1 flex items-center justify-center space-x-1">
          <span className="px-1 text-center  rounded-md bg-green-600 text-sm">
            D
          </span>
          <h1 className="text-sm">Dhannu Kumar's Workspace</h1>
        </div>
        <div>
          <FaRegCalendar />
        </div>
      </div>

      <div className="flex items-center bg-zinc-800 rounded-full w-[300px] px-3 py-1">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          placeholder="Search"
          className="bg-transparent text-sm py-0.5 flex-1 outline-none text-white"
          type="text"
        />
        <RiOpenaiLine />
      </div>

      <div className="flex space-x-4 pr-5 justify-center items-center">
        <span>
          <IoIosCheckmarkCircleOutline size={23} />
        </span>
        <span>
          <BiSolidVideoRecording size={23} />
        </span>
        <span className="p-1 rounded-full bg-purple-700 font-semibold text-white text-xs">
          Dk
        </span>
      </div>
    </div>
  );
}

export default Navbar;
