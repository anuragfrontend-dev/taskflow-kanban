import { useState, useEffect } from 'react'
import { Header } from '../header/Header'
import { BoardColumn } from './BoardColumn'
import { BoardHeader } from './BoardHeader'
import { fetchData, deleteData, editData  } from '../../api/api'


export function Board() {
  const [tasks,setTasks]=useState([]);
  const [activeCard,setActiveCard]= useState(null);

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

  const handleEdit=async ( id,newEditData ) =>{
    try{
      const res = await editData(id,newEditData);
      if(res.status===200){
        const result = tasks.map((currTask)=>
          id===currTask.id? {...currTask,...newEditData}:currTask)
        setTasks(result)
    }
    }catch(err){
      console.log('Edit failed',err);
    }
  }

  const onDrop=async(newStatus,position)=>{
    if (!activeCard) return;

    const taskToMove = tasks.find(t => t.id === activeCard);
    if (!taskToMove) return;

    console.log(`${activeCard} -> ${newStatus} at ${position}`);

    const remainingTasks = tasks.filter(t => t.id!== activeCard);

    const oldColumnTasks = tasks.filter(t => t.status === taskToMove.status);

    const oldIndex = oldColumnTasks.findIndex(t => t.id === activeCard);

    let newPosition = position;
    if (taskToMove.status === newStatus && oldIndex!== -1 && oldIndex < position) {
      newPosition = position - 1;
    }

    let updatedTask;
    if (newStatus === 'done') {
      const { due,...rest } = taskToMove;
      updatedTask = {
       ...rest,
        status: 'done',
        done: new Date().toISOString().split('T')[0]
      };
    } else {
      const { done,...rest } = taskToMove;
      updatedTask = {
       ...rest,
        status: newStatus,
        due: rest.due || new Date().toISOString().split('T')[0] 
      };
    }

    const targetColumnTasks = remainingTasks.filter(t => t.status === newStatus);
    const otherColumnsTasks = remainingTasks.filter(t => t.status!== newStatus);

    targetColumnTasks.splice(newPosition, 0, updatedTask);

    setTasks([...otherColumnsTasks, ...targetColumnTasks]);
    setActiveCard(null);

    try{
      const res=await editData(activeCard,updatedTask);
    } catch(err){
      console.log('Updated API failed',err);
      getData();
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
        <BoardColumn 
          title='To Do' 
          count={todo.length}  
          tasks={todo} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
          status='todo'
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          isDragging={!!activeCard}
        />
        <BoardColumn 
          title='In Progress' 
          count={inProgress.length}  
          tasks={inProgress} 
          onDelete={handleDelete} 
          onEdit={handleEdit}
          status='inprogress'
          setActiveCard={setActiveCard} 
          onDrop={onDrop}
          isDragging={!!activeCard}
        />
        <BoardColumn 
          title='Done' 
          count={done.length} 
          tasks={done} 
          onDelete={handleDelete} 
          onEdit={handleEdit}
          status='done'
          setActiveCard={setActiveCard} 
          onDrop={onDrop}
          isDragging={!!activeCard}
        />
      </div>
    </div>
   </div>
  )
}


