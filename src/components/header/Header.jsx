import { useState,useRef } from "react"
import { AiFillCheckSquare } from "react-icons/ai"
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { addData } from "../../api/api";
import { compressImage } from "../../utils/compressImage";


export function Header({ setTasks,search, setSearch,isDark }){
  const [addTask,setAddTask]=useState(false);
  const [title,setTitle]=useState('');
  const [priority,setPriority]=useState('HIGH');
  const [date,setDate]=useState('');
  const [avatar,setAvatar]=useState('');
  const fileInputRef=useRef(null);

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const newTask={
      title:title,
      priority:priority,
      due:date,
      avatar:avatar,
      status:'todo'
    }

    try{
      const res=await addData(newTask);
      console.log(res.data);
      setTasks(prev=>[...prev,res.data]);

      setTitle('');
      setDate('');
      setAvatar('');
      if(fileInputRef.current){
        fileInputRef.current.value='';
      }
      setAddTask(false);

    }catch(err){
      console.log('Api error',err);
    }
  }

  const handleAvatar= async(e)=>{
    const file=e.target.files[0];

    if(!file)return;

    try{
      setAvatar(await compressImage(file));
    }catch{
      alert('Image is not loaded, please try again')
    }
  }

  const handleTask=()=>{
    setAddTask(!addTask);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className={`fixed top-0 left-0 right-0 h-16 px-4 
      md:px-12 z-200 flex  items-center 
      ${isDark ? "bg-[#121212] text-white md:border-b" : "bg-white"}`}>

      <div className="flex items-center shrink-0">
        <AiFillCheckSquare className="h-8 w-8 md:h-10 md:w-10 rounded-[5px]" />
        <h1 className="font-bold text-2xl md:text-3xl ml-1">TaskFlow</h1>
      </div>

      <div className="hidden md:flex w-full items-center md:ml-12 md:mr-4 justify-between relative">
        <input type="search" placeholder="search tasks..." value={search} onChange={handleSearch}
          className={`py-2 px-4 pl-9 w-full font-medium outline-none rounded-lg text-sm 
          ${isDark ? "bg-gray-50 text-gray-700" : 'bg-gray-100'}`}/>
        <CiSearch className="absolute left-3 h-4 w-4 text-gray-500" />
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <IoIosNotificationsOutline color={`${isDark ? 'text-white' : 'text-black'}`}
          className="w-7 h-7 md:w-8 md:h-8 cursor-pointer" />
        <img src='user.png' className="h-8 w-8 md:h-9 md:w-9 rounded-full" />
        <div className="hidden md:block bg-violet-600 py-2 px-4 text-white 
          text-sm font-medium rounded-full cursor-pointer whitespace-nowrap" onClick={handleTask}>
          + New Task
        </div>

        {addTask &&(
          <form className={`absolute right-0 left-0 top-26 rounded-b-xl sm:left-auto md:right-2 md:rounded-2xl md:border  md:top-16 font-medium  sm:w-120  
            px-4 py-2 z-100  shadow-xl ${isDark ? 'bg-[#121212] text-white' : 'bg-white text-black'}`} onSubmit={handleSubmit}>
            <div className="flex flex-col mb-1">
              <label className="font-bold text-sm">Task:</label>
              <input type="text" placeholder="enter task"
                required className={`px-3 py-1 text-sm rounded w-full outline-0 border 
                  ${isDark ? 'bg-gray-50 text-black' : 'bg-gray-100'}`}
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-1">
            <label className="font-bold text-sm">Priority:</label>
              <select className={`text-sm font-medium border outline-0 p-1 bg-gray-100 rounded 
                  ${isDark ? 'bg-white text-black' : 'text-gray-500'}`}  value={priority} 
              onChange={(e)=>setPriority(e.target.value)} >
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="font-bold text-sm">Due Date:</label>
              <input type="date" className={`px-3 pt-1 pb-1 rounded text-sm mt-1 border
                ${isDark ? 'bg-gray-50 text-black' : 'bg-gray-100'}`} 
                required 
                value={date} 
                onChange={(e)=>setDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="font-bold text-sm">Add Avatar:</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatar} 
                ref={fileInputRef}
                hidden
              />
              <span className={`text-sm px-3 py-1 rounded-full cursor-pointer border
                  ${isDark ? 'bg-gray-50 text-black' : 'bg-gray-100'}`}
                onClick={()=>fileInputRef.current.click()}>
                {avatar?  "✓ Image selected" : "Upload avatar"}
              </span>
            </div>
            <div className="mt-3 flex gap-3">
              <button className="flex-1 rounded-full bg-violet-600 hover:bg-violet-500 text-white 
              font-medium text-sm py-2 cursor-pointer"
              type="submit">Add Task</button>
              <button className={`flex-1  rounded-full text-sm py-2 cursor-pointer 
                ${isDark ? 'bg-gray-50 text-black' : 'bg-gray-200'}`} type="button" 
              onClick={()=>setAddTask(!addTask)}
                >Cancel</button>
            </div>
          </form>
        )}
      </div>

      <div className={`flex md:hidden fixed top-12 left-0 right-0 px-4 py-3 gap-3 border-b 
        ${isDark? 'bg-[#121212]':'bg-white'}`}>
        <div className="flex flex-1 items-center relative">
          <input type="search" placeholder="search tasks..." value={search} onChange={handleSearch}
            className={`w-full py-1.5 pl-10 rounded-lg text-sm outline-none font-medium 
            ${isDark ? 'bg-gray-50 text-black' : 'bg-gray-100'}`} />
          <CiSearch className="absolute left-3 h-5 w-5 text-gray-500" />
        </div>
        <div className="bg-violet-600 text-white text-sm font-medium px-4 rounded-full 
          flex items-center justify-center cursor-pointer whitespace-nowrap" onClick={handleTask}>
          + New Task
        </div>
      </div>
    </div>
  )
}