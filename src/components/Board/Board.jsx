import { useState, useEffect } from 'react'
import { Header } from '../header/Header'
import { BoardColumn } from './BoardColumn'
import { BoardHeader } from './BoardHeader'
import { fetchData,deleteData } from '../../api/api'

export function Board() {
  const [tasks,setTasks]=useState([]);

  const getData=async ()=>{
    try{
      const response=await fetchData();
      setTasks(response.data);
    }catch(err){
      console.log('Api failed',err);
    }
  }

  useEffect(()=>{
    getData();
  },[]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteData(id);
      if (res.status === 200) {
        const filtered = tasks.filter((currTask) => currTask.id !== id);
        setTasks(filtered);
      }
    } catch (err) {
      console.log('Delete failed', err);
    }
  }

  const todo=tasks.filter((task)=>(task.status==='todo'));
  const inProgress=tasks.filter((task)=>(task.status==='inprogress'));
  const done=tasks.filter((task)=>(task.status==='done'));
  return (
   <div>
    <Header setTasks={setTasks} />
    <div className="pt-32 md:pt-15 bg-gray-200 w-full min-h-screen px-6 md:px-12 py-4">
      <BoardHeader />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
        <BoardColumn title='To Do' count={todo.length}  tasks={todo} onDelete={handleDelete} />
        <BoardColumn title='In Progress' count={inProgress.length}  tasks={inProgress} onDelete={handleDelete} />
        <BoardColumn title='Done' count={done.length} tasks={done} onDelete={handleDelete} />
      </div>
    </div>
   </div>
  )
}


