import { VscCalendar } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CircleCheck } from 'lucide-react';
import { useState } from "react";


export function TaskCard({ taskItem, onDelete }) {
  const { priority, title, done, avatar, due,id } = taskItem;
  const [showMenu, setShowMenu] = useState(false);

  const badgeColor = {
    HIGH: "bg-red-500 text-white",
    MEDIUM: "bg-amber-300 text-black",
    LOW: "bg-blue-600 text-white"
  }
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-start hover:shadow-lg relative">
      <div className="flex justify-between w-full">
        <span
          className={`py-1 px-2 rounded-m text-xs font-bold rounded ${badgeColor[priority]}`}>
          {priority}
        </span>
        <button className="cursor-pointer hover:bg-gray-100 rounded" onClick={() => setShowMenu(!showMenu)}>
          <BsThreeDotsVertical />
        </button>
      </div>
      {showMenu && (
        <div className=" absolute right-2 top-10 bg-white z-50 
        shadow-xl border rounded-lg py-1 flex flex-col">
          <button className= "text-left px-2 py-1 text-sm hover:bg-gray-100">✏️Edit</button>
          <button 
            className="text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-600" 
            onClick={()=>onDelete(id)}>
            🗑️Delete
          </button>
        </div>
      )}
      <h1 className="font-bold mt-3">{title}</h1>
      <div className="flex justify-between items-center w-full">
        <div className="flex mt-3.5 gap-2 items-center">
          {done ?
            (<div className="flex items-center gap-2">
              <CircleCheck fill="green" color="white" className="h-12" />
              <span className="text-green-700 font-medium text-[16px]">{done}</span>
            </div>) : (
              <>
                <VscCalendar />Due {due}
              </>
            )}
        </div>
        {avatar && <img src={avatar} className="w-12 h-12 rounded-full object-cover" />}
      </div>
    </div>
  )
}