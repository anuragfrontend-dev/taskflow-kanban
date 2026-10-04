import { useState } from "react"
import { AiFillCheckSquare } from "react-icons/ai"
import { MdOutlineDashboard } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoPeople } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";


export function Header(){
  const [open, setOpen] = useState(false);
  return(
    <div className="fixed bg-white top-0 left-0 right-0 h-16 px-4 
    md:px-12 z-200 flex justify-between items-center">

      <div className="flex items-center">
        <AiFillCheckSquare className="h-8 w-8 md:h-10 md:w-10 rounded-[5px]" />
        <h1 className="font-bold text-2xl md:text-3xl ml-1">TaskFlow</h1>
      </div>

      <nav className='hidden lg:flex items-center gap-6'>
        <a href="#" className="flex items-center gap-1 font-medium hover:underline hover:underline-offset-4"> <MdOutlineDashboard className="h-4 w-5" /> Dashboard</a>
        <a href="#" className="font-medium hover:underline hover:underline-offset-4">Project</a>
        <a href="#" className="flex items-center gap-1 font-medium hover:underline hover:underline-offset-4"> <BsListTask className="w-5 h-4" /> Tasks</a>
        <a href="#" className="flex items-center gap-1 font-medium hover:underline hover:underline-offset-4"> <SlCalender className="h-4 w-5" /> Calendar</a>
        <a href="#" className="flex items-center gap-1 font-medium hover:underline hover:underline-offset-4"> <IoPeople className="h-4 w-5" /> Team</a>
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center relative">
          <input type="search" placeholder="search tasks..."
            className="py-2 px-4 pl-9 bg-gray-100 w-44 font-medium outline-none rounded-lg text-sm" />
          <CiSearch className="absolute left-3 h-4 w-4 text-gray-500" />
        </div>

        <IoIosNotificationsOutline className="w-7 h-7 cursor-pointer" />
        <img src='user.png' className="h-8 w-8 md:h-9 md:w-9 rounded-full" />
        <div className="hidden md:block bg-violet-600 py-2 px-4 text-white 
          text-sm font-medium rounded-full cursor-pointer whitespace-nowrap">
          + New Task
        </div>

        <button onClick={()=>setOpen(!open)} className="lg:hidden ml-1">
          {open? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
        </button>
      </div>

      <div className="flex md:hidden fixed top-12 left-0 right-0 bg-white px-4 py-3 gap-3 border-b">
        <div className="flex flex-1 items-center relative">
            <input type="search" placeholder="search tasks..."
            className="w-full py-1.5 pl-10 bg-gray-100 rounded-lg text-sm outline-none font-medium" />
            <CiSearch className="absolute left-3 h-5 w-5 text-gray-400" />
        </div>
        <div className="bg-violet-600 text-white text-sm font-medium px-4 rounded-full 
        flex items-center justify-center cursor-pointer whitespace-nowrap">
          + New Task
        </div>
      </div>

      {open && (
        <div className="absolute top-12  right-0 bg-white border-t z-100 md:mt-4 shadow-lg lg:hidden flex flex-col p-6 gap-5 mt-14">
          <a href="#" className="flex items-center gap-2 font-medium hover:underline hover:underline-offset-4"><MdOutlineDashboard/> Dashboard</a>
          <a href="#"className="hover:underline hover:underline-offset-4" >Project</a>
          <a href="#" className="flex items-center gap-2 font-medium hover:underline hover:underline-offset-4"><BsListTask/> Tasks</a>
          <a href="#" className="flex items-center gap-2 font-medium hover:underline hover:underline-offset-4"><SlCalender/> Calendar</a>
          <a href="#" className="flex items-center gap-2 font-medium hover:underline hover:underline-offset-4"><IoPeople/> Team</a>
        </div>
      )}
    </div>
  )
}