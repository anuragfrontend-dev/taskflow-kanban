import { VscCalendar } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CircleCheck } from 'lucide-react';
import { useState, useRef } from "react";
import { format } from "date-fns";
import { compressImage } from "../../utils/compressImage";


export function TaskCard({ taskItem, onDelete,onEdit }) {
  const { priority, title, done, avatar, due, id } = taskItem;
  const [showMenu, setShowMenu] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editPriority, setEditPriority] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editDone, setEditDone] = useState();
  const [editDue, setEditDue] = useState('');
  const fileInputRef = useRef(null);

  const handleEditSubmit=(e,id)=>{
    e.preventDefault();

    const newEditData={
      title:editTitle,
      priority:editPriority,
      due:editDue,
      done:editDone,
      avatar:editAvatar
    }

    if(editTitle===''){
      alert('title is empty please filled it!');
      return;
    }

    onEdit(id,newEditData);
    setEditId(null);
    setShowMenu(false);

  }


  const formatForInput = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleEditAvatar= async(e)=>{
    const file=e.target.files[0];

    if(!file)return;

    try{
      setEditAvatar(await compressImage(file));
    }catch{
      alert('Image is not loaded, please try again')
    }
  }

  const badgeColor = {
    HIGH: "bg-red-500 text-white",
    MEDIUM: "bg-amber-300 text-black",
    LOW: "bg-blue-600 text-white"
  }
  return (
    <>
      {editId === id ?
        (<form className="bg-white rounded-lg px-4 py-2 shadow-sm hover:shadow-lg" 
          onSubmit={(e)=>handleEditSubmit(e,id)}>
          <span
            className={`px-1 rounded-m text-sm font-medium rounded ${badgeColor[priority]}`}>
            {priority}
          </span>
          <h1 className="font-bold text-xl">Edit Task</h1>
          <div className="flex flex-col mb-1">
            <label className="text-sm text-gray-500 font-medium">Priority</label>
            <select className="text-sm font-medium border outline-0 p-1 bg-gray-100 rounded" value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)} >
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
          <div className="flex flex-col mb-1">
            <label className="text-gray-500 text-sm font-medium">Task</label>
            <input type="text" placeholder="enter task"
              required className="py-1 px-2 bg-gray-100 text-sm font-medium rounded border outline-0"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            {editDone ? (
              <>
                <label className="font-medium text-sm text-gray-500">complete</label>
                <input type="date" className="px-3 py-1 bg-gray-100 rounded text-sm outline-0 font-medium border"
                  required
                  value={formatForInput(editDone)}
                  onChange={(e) => setEditDone(e.target.value)}
                />
              </>
            ) : (
              <>
                <label className="font-medium text-sm text-gray-500">Due</label>
                <input type="date" 
                  className="px-3 py-1 bg-gray-100 rounded text-sm font-medium border outline-0"
                  required
                  value={formatForInput(editDue)}
                  onChange={(e) => setEditDue(e.target.value)}
                />
              </>)
            }
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-medium text-sm text-gray-500">Avatar</label>
            <div className="flex items-center justify-start">
              {editAvatar? (<img src={editAvatar} className="h-8 w-8 rounded-full" />)
              :(<img src='user.png' className="h-8 w-8 rounded-full" />)}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleEditAvatar}
                hidden
              />
              <div className="flex items-center ml-2">{editAvatar ? (
                <>
                  <span className="font-bold text-sm">Avatar •</span>
                  <span className="ml-1 font-medium text-gray-600">Uploaded</span>
                  <CircleCheck fill="green" width={20} height={20} color="white" />
                </>
              ) : <span className="font-medium text-sm">No Avatar Uploaded</span>}</div>

              <div className="flex items-center"
                onClick={() => fileInputRef.current.click()}>
                {editAvatar? (
                  <span className="text-sm cursor-pointer text-blue-600  underline ml-8">Change</span>):
                  (<span className="text-sm cursor-pointer text-blue-600  underline ml-6">Add avatar</span>)}
              </div>
            </div>
          </div>
          <div className=" flex justify-between w-full gap-2">
            <button
              className="w-full bg-gray-300 text-black  py-1 rounded-[10px] font-medium  text-sm cursor-pointer"
              type="button"
              onClick={() => {
                setEditId(null);
                setShowMenu(false);
              }}>
              Cancel
            </button>
            <button className=" bg-blue-700 w-full text-sm cursor-pointer rounded-[10px] py-1 text-white font-medium"
              type="submit">
              Update Task
            </button>
          </div>
        </form>) : (
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
                <button
                  className="text-left px-2 py-1 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setEditId(id);
                    setEditPriority(priority);
                    setEditTitle(title);
                    setEditAvatar(avatar);
                    setEditDone(done);
                    setEditDue(due);
                  }}>
                  ✏️Edit</button>
                <button
                  className="text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-600"
                  onClick={() => onDelete(id)}>
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
                    <span className="text-green-700 font-medium text-[16px]">Completed {done ? format(new Date(done), 'MMM d') : ''}</span>
                  </div>) : (
                    <>
                      <VscCalendar />Due {due ? format(new Date(due), 'MMM d') : ''}
                    </>
                  )}
              </div>
              {avatar && <img src={avatar} className="w-12 h-12 rounded-full object-cover" />}
            </div>
          </div>)}
    </>
  )
}