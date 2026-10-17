import { useState, useEffect } from 'react'
import { Header } from '../header/Header'
import { BoardColumn } from './BoardColumn'
import { BoardHeader } from './BoardHeader'
import { fetchData, deleteData, editData  } from '../../api/api'
import { DndContext, closestCenter, PointerSensor,TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance:5 }}),
    useSensor(TouchSensor,{
      activationConstraint: {
        delay:100,
        tolerance:6
      }
    })
  );

  const handleDragEnd=async(event)=>{
    const {active,over}=event;
    if(!over) return;

    const activeId=active.id;
    const overId =over.id;
    if(activeId===overId) return;
    
    const activeTask = tasks.find(t=>t.id === activeId);
    const overTask = tasks.find(t=> t.id === overId);

    if(!activeTask) return;

    if(overTask && activeTask.status === overTask.status){
      const oldIndex = tasks.findIndex(t=>t.id === activeId);
      const newIndex = tasks.findIndex(t=>t.id === overId);
      setTasks((prevTasks)=>arrayMove(prevTasks,oldIndex,newIndex));
      return;
    }

    let newStatus = overId;

    const validStatus= ['todo','inprogress','done'];

    if(!validStatus.includes(overId)){
      if(overTask) newStatus = overTask.status;
    }
    
    if(activeTask.status !==newStatus){
      let updatedTasks;

      if(newStatus === 'done'){
        updatedTasks = tasks.map(t=>t.id===activeId? 
          {...t,done:new Date().toISOString().split('T')[0] ,status:newStatus}:t);
      }
      else if(newStatus === 'inprogress'){
        updatedTasks = tasks.map(t=>t.id===activeId? 
          {...t,due:new Date().toISOString().split('T')[0] ,status:newStatus}:t);
      }
      else{
        updatedTasks = tasks.map(t=>t.id===activeId?
          {...t,status:newStatus}:t
        )
      }

      setTasks(updatedTasks);
      try{
        const payload = updatedTasks.find((t)=>(t.id===activeId));
        await editData(activeId,payload);
      } catch (err){
        console.log('status update failed',err);
        getData();
    }
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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
            <BoardColumn 
              title='To Do' 
              count={todo.length}  
              tasks={todo} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
              id='todo'
            />
            <BoardColumn 
              title='In Progress' 
              count={inProgress.length}  
              tasks={inProgress} 
              onDelete={handleDelete} 
              onEdit={handleEdit}
              id='inprogress'
            />
            <BoardColumn 
              title='Done' 
              count={done.length} 
              tasks={done} 
              onDelete={handleDelete} 
              onEdit={handleEdit}
              id='done'
            />
          </div>
        </DndContext>
    </div>
   </div>
  )
}


