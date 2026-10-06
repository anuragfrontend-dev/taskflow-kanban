import { useState, useEffect } from 'react'
import { Header } from '../header/Header'
import { BoardColumn } from './BoardColumn'
import { BoardHeader } from './BoardHeader'
import { fetchData } from '../../api/api'


export function Board() {
  const [tasks,setTasks]=useState([]);

  const getData=async ()=>{
    try{
      const response=await fetchData();
      setTasks(response.data);
    }catch(err){
      console.log('Api failed, Now you used dummy data');
    }
  }

  useEffect(()=>{
    getData();
  },[]);

  const todo=tasks.filter((task)=>(task.status==='todo'));
  const inProgress=tasks.filter((task)=>(task.status==='inprogress'));
  const done=tasks.filter((task)=>(task.status==='done'));
  return (
   <div>
    <Header setTasks={setTasks} />
    <div className="pt-32 md:pt-15 bg-gray-200 w-full min-h-screen px-6 md:px-12 py-4">
      <BoardHeader />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
        <BoardColumn title='To Do' count={todo.length}  tasks={todo} />
        <BoardColumn title='In Progress' count={inProgress.length}  tasks={inProgress} />
        <BoardColumn title='Done' count={done.length} tasks={done} />
      </div>
    </div>
   </div>
  )
}


