import { useState, useEffect } from 'react'
import { Header } from '../header/Header'
import { BoardColumn } from './BoardColumn'
import { BoardHeader } from './BoardHeader'
import { getData, deleteTask, updateTask, clearTasks, reorderTask } from '../../store/tasksSlice'
import { DndContext, closestCenter, PointerSensor,TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useDispatch, useSelector } from 'react-redux'

export function Board() {
  const [search,setSearch]=useState('');
  const [priority,setPriority]=useState('ALL');
  const [sortBy,setSortBy]=useState('ALL');
  const [isDark,setIsDark]=useState(()=>{
    return localStorage.getItem('theme')==='dark';
  });
  const [lastUpdated,setLastUpdated]=useState(()=>{
    const saved = localStorage.getItem('boardLastUpdated');
    return saved ? new Date(saved) : new Date();
  })

  const dispatch=useDispatch();
  const {tasks}=useSelector(state=>state.tasks)


  useEffect(()=>{
    dispatch(getData());
  },[]);

  const handleDelete=(id) => {
    dispatch(deleteTask(id));
    const now =new Date();
    setLastUpdated(now);
    localStorage.setItem('boardLastUpdated',now.toISOString());
  }

  const handleEdit=( id,newEditData ) =>{
    console.log('Id',id, 'data',newEditData)
    dispatch(updateTask({id,newEditData}));
    const now =new Date();
    setLastUpdated(now);
    localStorage.setItem('boardLastUpdated',now.toISOString());
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
      dispatch(reorderTask({activeId,overId}));
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
        updatedTasks = {...activeTask,done:new Date().toISOString().split('T')[0] ,status:newStatus};
      }
      else if(newStatus === 'inprogress'){
        updatedTasks =  {...activeTask,due:new Date().toISOString().split('T')[0] ,status:newStatus};
      }
      else{
        updatedTasks = {...activeTask, status:newStatus}
      }

      dispatch(updateTask({id:activeId,newEditData:updatedTasks}));
    
    }
    const now =new Date();
    setLastUpdated(now);
    localStorage.setItem('boardLastUpdated',now.toISOString());

  }

  const handleClearAll=async()=>{
    if(confirm('Are you sure delete all tasks')){

      dispatch(clearTasks(tasks))
      
      const now =new Date();
      setLastUpdated(now);
      localStorage.setItem('boardLastUpdated',now.toISOString());
    }
  }

  useEffect(()=>{
    localStorage.setItem('theme',isDark? 'dark':'light');
  },[isDark])
 

  const todo=tasks.filter((task)=>(task.status==='todo'));
  const inProgress=tasks.filter((task)=>(task.status==='inprogress'));
  const done=tasks.filter((task)=>(task.status==='done'));
  return (
   <div>
    <Header 
      search={search}
      setSearch={setSearch} 
      isDark={isDark}
      setLastUpdated={setLastUpdated}
    />
    <div className={`pt-32 md:pt-15 w-full min-h-screen px-6 md:px-12 py-4 ${isDark ? 'bg-[#09090B]':'bg-gray-200'}`}>
      <BoardHeader 
        priority={priority}
        setPriority={setPriority} 
        sortBy={sortBy}
        setSortBy={setSortBy}
        isDark={isDark}
        setIsDark={setIsDark}
        onClearAll={handleClearAll}
        lastUpdated={lastUpdated}
      />
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
            <BoardColumn 
              title='To Do' 
              count={todo.length}  
              tasks={todo} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
              id='todo'
              search={search}
              priority={priority}
              sortBy={sortBy}
              isDark={isDark}
            />
            <BoardColumn 
              title='In Progress' 
              count={inProgress.length}  
              tasks={inProgress} 
              onDelete={handleDelete} 
              onEdit={handleEdit}
              id='inprogress'
              search={search}
              priority={priority}
              sortBy={sortBy}
              isDark={isDark}
            />
            <BoardColumn 
              title='Done' 
              count={done.length} 
              tasks={done} 
              onDelete={handleDelete} 
              onEdit={handleEdit}
              id='done'
              search={search}
              priority={priority}
              sortBy={sortBy}
              isDark={isDark}
            />
          </div>
        </DndContext>
    </div>
   </div>
  )
}


