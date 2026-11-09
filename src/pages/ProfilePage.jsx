import { useEffect, useState } from "react";
import { Header } from "../components/header/Header"
import { ClipboardList } from "lucide-react"
import { CircleCheck } from 'lucide-react';
import { VscLayersActive } from "react-icons/vsc";
import { Clock } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCameraOutline } from "react-icons/io5";

export function ProfilePage({ isDark }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const { tasks } = useSelector(state => state.tasks);

  const totalTasks = tasks.length;
  const totalTodoTasks = tasks.filter((task) => task.status === 'todo').length;
  const totalActiveTasks = tasks.filter((task) => task.status === 'inprogress').length;
  const totalCompletedTasks = tasks.filter((task) => task.status === 'done').length;


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('taskFlowLoggedInUser'));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name || '');
      setEmail(storedUser.email || '');
      setProfilePic(storedUser.profilePic || '');
      setUserName(storedUser.userName || '');
    }

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUserDetails = {
      ...user,
      name,
      email,
      profilePic,
      userName
    }
    setUser(updateUserDetails);
    localStorage.setItem('taskFlowLoggedInUser', JSON.stringify(updateUserDetails));
    setEditMode(false);
  }
  const handleprofilePicChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setProfilePic(result);
      if (!user) return;
      const updateUser = { ...user, profilePic: result };
      localStorage.setItem('taskFlowLoggedInUser', JSON.stringify(updateUser));
      window.dispatchEvent(new Event('updateUser'));
    }
    reader.readAsDataURL(file);
  }

  const handleLogOut = () => {
    localStorage.removeItem('taskFlowLoggedInUser');
    window.dispatchEvent(new Event('updateUser'));
    navigate('/');
  }

  const handleRemovePic = ()=>{
    if(!user) return;
    const updateUser= {...user,profilePic:''};
    setProfilePic('');
    localStorage.setItem('taskFlowLoggedInUser', JSON.stringify(updateUser));
    window.dispatchEvent(new Event('updateUser'));
  }

  const defaultUserName = name.replaceAll(' ', '').toLowerCase() + name.length || 0;

  return (
    <div>
      <Header
        showSearch={false}
        showNewTask={false}
        showHomeIcon={true}
        isDark={isDark}
      />
      <div className={`min-h-screen pt-32 pb-20 w-full ${isDark ? 'bg-[#18181b]' : 'bg-gray-200'}`}>
        <form className={`shadow m-auto max-w-75 sm:max-w-100 md:max-w-150 lg:max-w-200
          rounded-2xl grid grid-cols-1 lg:grid-cols-2 
          ${isDark ? 'bg-black' : 'bg-white'}`}
          onSubmit={handleSubmit}>
          <div className={`flex justify-center flex-col items-center rounded-t-2xl lg:rounded-bl-2xl 
            ${isDark ? 'bg-black text-white' : 'bg-white'}`}>
            <div className="h-25 w-full bg-blue-500 relative rounded-t-2xl">
              <div className="absolute left-1/2 -translate-x-1/2 top-10">
                <div className="h-25 w-25 rounded-full border-2 relative">
                  <img src={profilePic || '/user-icon.jpg'}
                    className="w-full h-full object-cover rounded-full" />
                  <label className={`absolute text-[24px] flex 
                    justify-center items-center right-0 top-17 h-8 w-8 font-extrabold  rounded-full 
                    cursor-pointer ${isDark ? 'bg-indigo-200 border-2' : 'bg-indigo-100'}`}>
                    <IoCameraOutline size={25} className={`${isDark ? 'text-black' : 'text-black'}`} />
                    <input type="file" accept="image/*" hidden onChange={handleprofilePicChange} />
                  </label>
                </div>
                {profilePic && (
                  <button className="pl-3 text-red-400 cursor-pointer" onClick={handleRemovePic}>
                    Remove pic
                  </button>
                )}
              </div>
            </div>
            {editMode ?
              (
                <div className={`${profilePic ? 'pt-13':'pt-8'} p-3 w-full rounded-bl-2xl ${isDark ? 'bg-black text-white' : 'bg-white'}`}>
                  <div className="flex flex-col mt-2">
                    <label htmlFor="name" className={` text-sm font-medium 
                      ${isDark ? 'text-gray-200' : 'text-gray-500'}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="enter name"
                      value={name}
                      required
                      className="py-1 px-2 bg-gray-100 text-sm font-medium rounded border outline-0 text-black"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mt-1">
                    <label htmlFor="userName" className={` text-sm font-medium 
                      ${isDark ? 'text-gray-200' : 'text-gray-500'}`}>
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="enter username"
                      required
                      value={userName ? userName : defaultUserName}
                      className="py-1 px-2 bg-gray-100 text-sm font-medium rounded border outline-0 text-black"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="mt-5 flex justify-center items-center gap-2 mb-3">
                    <button
                      className="py-1 w-full cursor-pointer bg-gray-200 text-black
                      rounded-[10px] font-bold"
                      type="button"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className={`py-1 w-full text-white bg-green-500 font-bold ${isDark ? '' : 'border'}
                      cursor-pointer rounded-[10px]`} type="submit">
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`${profilePic ? 'pt-13':'pt-8'} p-3  text-center w-full lg:rounded-bl-2xl  ${isDark ? 'bg-black' : 'bg-white'}`}>
                  <div className="font-bold mt-3">{name}</div>
                  <div className={`text-sm font-medium  
                    ${isDark ? ' text-gray-100' : 'text-gray-500'}`}>
                    {userName ? userName : defaultUserName}
                  </div>

                  <div className={`font-medium  ${isDark ? ' text-gray-100' : 'text-gray-600'}`}>
                    {email}
                  </div>
                  <div className="mt-3 flex justify-center items-center gap-2 mb-3">
                    <button className='py-1 w-30  hover:opacity-90 font-medium bg-gray-100 text-black
                      cursor-pointer rounded-[5px]' type="button" onClick={() => setEditMode(true)}>
                      Edit profile
                    </button>
                    <button className='py-1 w-30 text-red-500  cursor-pointer bg-gray-100 hover:border-0 font-medium
                      rounded-[5px] hover:bg-red-500 hover:text-white' type="button" onClick={handleLogOut} >
                      Log out
                    </button>
                  </div>
                </div>
              )}
          </div>
          <div className={`grid grid-cols-2 gap-4 rounded-br-2xl rounded-bl-2xl lg:rounded-bl-none lg:rounded-tr-2xl p-3 
            ${isDark ? 'bg-black' : 'bg-white'}`}>
            <div className={`rounded flex items-center shadow-sm gap-2 p-4 sm:p-6 hover:shadow-lg 
              ${isDark ? 'bg-[#232326]' : 'bg-white'}`}>
              <div className=" flex  justify-center items-center w-11 h-11 bg-indigo-100 rounded-xl">
                <ClipboardList height={30} width={30} color='black' />
              </div>
              <div className="flex flex-col justify-center">
                <div className={`font-bold text-3xl ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                  {totalTasks}
                </div>
                <div className="font-medium text-sm text-indigo-500 ">Total Tasks</div>
              </div>
            </div>
            <div className={`rounded flex items-center shadow-sm gap-2 p-4 sm:p-6 hover:shadow-lg 
              ${isDark ? 'bg-[#232326]' : 'bg-white'} `}>
              <div className=" flex  justify-center items-center w-11 h-11 bg-indigo-100 rounded-xl">
                <CircleCheck height={30} width={30} color={isDark ? 'green' : 'white'} fill={isDark ? 'white' : 'green'} />
              </div>
              <div className="flex flex-col justify-center">
                <div className={`font-bold text-3xl ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                  {totalCompletedTasks}
                </div>
                <div className="font-medium text-sm text-indigo-500 ">Tasks Completed</div>
              </div>
            </div>
            <div className={`rounded flex items-center shadow-sm gap-2 p-4 sm:p-6 hover:shadow-lg 
              ${isDark ? 'bg-[#232326]' : 'bg-white'}`}>
              <div className="  flex  justify-center items-center w-11 h-11 bg-indigo-100 rounded-xl ">
                <VscLayersActive size={40} fill="black" color="white" />
              </div>
              <div className="flex flex-col justify-center">
                <div className={`font-bold text-3xl ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                  {totalActiveTasks}
                </div>
                <div className="font-medium text-sm text-indigo-500">Active Tasks</div>
              </div>
            </div>

            <div className={`rounded flex items-center shadow-sm gap-2 p-4 sm:p-6 hover:shadow-lg 
              ${isDark ? 'bg-[#232326]' : 'bg-white'}`}>
              <div className=" flex  justify-center items-center w-11 h-11 bg-indigo-100 rounded-xl">
                <Clock height={30} width={30} color="black" />
              </div>
              <div className="flex flex-col justify-center">
                <div className={`font-bold text-3xl ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>{totalTodoTasks}</div>
                <div className="font-medium text-sm text-indigo-500 ">To Do Tasks</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}