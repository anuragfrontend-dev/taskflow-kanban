import { FiFilter, FiMoreHorizontal } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
import { useEffect, useState } from "react";

export function BoardHeader({priority,setPriority,sortBy,setSortBy,isDark,setIsDark,onClearAll,lastUpdated}) {
  const [openFilter,setOpenFilter]=useState(false);
  const [openSort,setOpenSort]=useState(false);
  const [openMenu,setOpenMenu]=useState(false);
  const [now,setNow] = useState(new Date());
  
  const handlePriority=(e)=>{
    setPriority(e.target.value);
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      setNow(new Date());
    },20000);

    return ()=> clearInterval(interval);
  },[]);
  
  const formatLastUpdated =(date)=>{
    if(!date) return "Updated just now";

    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "Updated just now";

    const diffMs = now - d;
    const diffMins = Math.floor(diffMs/60000);
    const diffSecs = Math.floor(diffMs/1000);


    if(diffSecs < 60) return "Updated just now";
    if(diffMins < 60) return `Updated ${ diffMins } minutes ago`;
    if(diffMins < 1440) return `Updated ${ Math.floor(diffMins/60)} hours ago`;
    return `Updated ${ date.toLocaleDateString('en-US',{ month: 'short', day:'numeric',year:'numeric'}) }`
  }


  return (
    <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row sm:text-center pt-5">
      <div className="flex flex-col items-start">
        <h1 className={`text-xl md:text-4xl font-bold ${isDark? 'text-white':''}`}>Website Redesign</h1>
        <p className={`font-semibold sm:font-medium px-0 ${isDark? 'text-gray-200':'text-gray-500'}`}>
          Board <span className="mx-1">•</span>{formatLastUpdated(lastUpdated)}</p>
      </div>
      <div className="flex items-center mt-4 md:mt-0 gap-2 md:gap-3">
        <div className="relative flex-1 sm:flex-none">
          <button className={`flex w-full items-center gap-2 px-4 py-2 border cursor-pointer
            border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 
            ${isDark? 'bg-gray-50':'bg-gray-100'}`}
            onClick={()=>setOpenFilter(!openFilter)}>
            <FiFilter className="w-5 h-5 text-gray-400" />
            Filter
          </button>

          {openFilter && (
            <select className={`absolute top-full left-0 right-0 mt-0.5 p-1 outline-0 border rounded shadow z-10
              ${isDark?'bg-gray-50':'bg-white'}`}
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

        <div className="relative flex-1 sm:flex-none">
          <button className={`flex w-full items-center gap-2 px-4 py-2 cursor-pointer
            border border-gray-300 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-50 
            ${isDark? 'bg-gray-50':'bg-gray-100'}`}
            onClick={()=>setOpenSort(!openSort)}
          >
            <LuArrowUpDown className="w-4 h-4 text-gray-400" />
            Sort
          </button>

          {openSort && (
            <select className={`absolute top-full left-0 right-0 mt-0.5 p-1 outline-0 rounded shadow z-20 
              ${isDark?'bg-gray-50':'bg-white'}`}
              value={sortBy}
              onChange={(e)=>setSortBy(e.target.value)}
            >
              <option value="ALL">All Dates</option>
              <option value="NEWEST">Newest First</option>
              <option value="OLDEST">Oldest First</option>
            </select>
          )}
        </div>

        <div className="relative">
          <button className={`w-10 h-10 flex items-center justify-center border cursor-pointer
            border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-50  ${isDark? 'bg-gray-50':'bg-gray-100'}`}
            onClick={()=>setOpenMenu(!openMenu)}
          >
            <FiMoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
          
          {openMenu && (
            <div className={`absolute right-0 w-30 rounded top-full p-1 shadow outline-0 mt-0.5 border z-30 
              ${isDark? 'bg-black border-white':'bg-white'}`}>
              <button className="bg-gray-50 font-bold border text-sm px-3 py-1 w-full cursor-pointer rounded"
                onClick={()=>(setIsDark(false), setOpenMenu(false))}>
                Light Mode
              </button>
              <button className="bg-gray-50 font-bold border text-sm px-3 py-1 w-full cursor-pointer rounded mt-1" 
                onClick={()=>(setIsDark(!isDark), setOpenMenu(false))}>
                  Dark Mode
              </button>
              <button 
                className="bg-gray-50 font-bold border text-sm  py-1 w-full text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white
                cursor-pointer rounded mt-1"
                onClick={()=>(onClearAll(),setOpenMenu(false))}>
                  Clear All Tasks
              </button>
            </div>
          )}

        </div>
        
      </div>
    </div>
  )
}