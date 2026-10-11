import { TaskCard } from "./TaskCard"
import { DropArea } from "./DropArea"
import React from 'react'

export function BoardColumn({title,count,tasks,onDelete,onEdit,status,setActiveCard,onDrop,isDragging}){
  
  return(
    <div className="bg-gray-300 rounded-xl p-2 md:p-4 w-full">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-bold text-xl text-[#1a1a3d]">{title}</h2>
        <span className="bg-gray-400 text-gray-300 text-sm font-bold px-2 py-0.5 rounded-md"
        >{count}</span>
      </div>
      <div className="flex flex-col gap-4">
        {tasks.length>0 ?(
          <>
            <DropArea onDrop={()=>onDrop(status,0)} />
            {tasks.map((taskItem,index)=>(
              <React.Fragment key={taskItem.id}>
              <TaskCard  
                taskItem={taskItem}
                onDelete={onDelete}
                onEdit={onEdit}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={()=> onDrop(status,index+1)} />
              </React.Fragment>
            ))}
          </>
            ):(
              <div className="flex-1">
                <DropArea onDrop={()=>onDrop(status,0)} isEmpty={true} isDragging={isDragging} />
              </div>
              )}
        </div>
    </div>
  )
}