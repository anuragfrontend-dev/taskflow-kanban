import { TaskCard } from "./TaskCard"

export function BoardColumn({title,count,tasks,onDelete}){
  
  return(
    <div className="bg-gray-300 rounded-xl p-2 md:p-4 w-full">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-bold text-xl text-[#1a1a3d]">{title}</h2>
        <span className="bg-gray-400 text-gray-300 text-sm font-bold px-2 py-0.5 rounded-md"
        >{count}</span>
      </div>
      <div className="flex flex-col gap-4">
          {tasks.map((taskItem)=>(
            <TaskCard  
              key={taskItem.id}
              taskItem={taskItem}
              onDelete={onDelete}
            />
          ))}
        </div>
    </div>
  )
}