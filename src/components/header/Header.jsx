import { AiFillCheckSquare } from "react-icons/ai"
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";



export function Header() {

  return (
    <div className="fixed top-0 left-0 right-0 h-16 px-4 bg-white
      md:px-12 z-200 flex  items-center">

      <div className="flex items-center shrink-0">
        <AiFillCheckSquare className="h-8 w-8 md:h-10 md:w-10 rounded-[5px]" />
        <h1 className="font-bold text-2xl md:text-3xl ml-1">TaskFlow</h1>
      </div>

      <div className="hidden md:flex w-full items-center md:ml-12 md:mr-4 justify-between relative">
        <input type="search" placeholder="search tasks..."
          className="py-2 px-4 pl-9 w-full font-medium outline-none rounded-lg text-sm bg-gray-100" />
        <CiSearch className="absolute left-3 h-4 w-4 text-gray-500" />
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <IoIosNotificationsOutline className="w-7 h-7 md:w-8 md:h-8 cursor-pointer" />
        <img src='user.png' className="h-8 w-8 md:h-9 md:w-9 rounded-full" />
        <div className="hidden md:block bg-violet-600 py-2 px-4 text-white 
          text-sm font-medium rounded-full cursor-pointer whitespace-nowrap">
          + New Task
        </div>
      </div>

      <div className="flex md:hidden fixed top-12 left-0 right-0 bg-white px-4 py-3 gap-3 border-b">
        <div className="flex flex-1 items-center relative">
          <input type="search" placeholder="search tasks..."
            className="w-full py-1.5 pl-10 bg-gray-100 rounded-lg text-sm outline-none font-medium" />
          <CiSearch className="absolute left-3 h-5 w-5 text-gray-500" />
        </div>
        <div className="bg-violet-600 text-white text-sm font-medium px-4 rounded-full 
          flex items-center justify-center cursor-pointer whitespace-nowrap">
          + New Task
        </div>
      </div>
    </div>
  )
}