import { FiFilter, FiMoreHorizontal } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
import { useState } from "react";

export function BoardHeader({priority,setPriority}) {
  const [openFilter,setOpenFilter]=useState(false);
  
  const handlePriority=(e)=>{
    setPriority(e.target.value);
  }


  return (
    <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row sm:text-center pt-5">
      <div className="flex flex-col items-start">
        <h1 className="text-xl md:text-4xl font-bold">Website Redesign</h1>
        <p className="font-semibold sm:font-medium text-gray-500 px-0">Board <span className="mx-1">•</span> Updated Oct 23, 2026</p>
      </div>
      <div className="flex items-center mt-4 md:mt-0 gap-2 md:gap-3">
        <div className="relative flex-1 sm:flex-none">
          <button className="flex w-full items-center gap-2 px-4 py-2 border cursor-pointer
            border-gray-300 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            onClick={()=>setOpenFilter(!openFilter)}>
            <FiFilter className="w-5 h-5 text-gray-400" />
            Filter
          </button>

          {openFilter && (
            <select className=" absolute top-full left-0 right-0 mt-0.5 p-1  bg-white outline-0 border rounded shadow z-10"
              value={priority} 
              onChange={handlePriority} 
            >
              <option value="ALL">ALL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          )}
        </div>

        <button className="flex flex-1 sm:flex-none items-center gap-2 px-4 py-2 cursor-pointer
        border border-gray-300 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          <LuArrowUpDown className="w-4 h-4 text-gray-400" />
          Sort
        </button>

        <button className="w-10 h-10 flex items-center justify-center border cursor-pointer
         border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-50">
          <FiMoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  )
}