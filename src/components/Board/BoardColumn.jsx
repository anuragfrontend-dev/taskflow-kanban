import { TaskCard } from "./TaskCard"
import { SortableContext, useSortable } from "@dnd-kit/sortable"

export function BoardColumn({title,count,tasks,onDelete,onEdit,id,search,priority}){
  const { setNodeRef } = useSortable({ id:id });

  const searchTask = tasks.filter((currTask)=>{
    const matchTask= !search || currTask?.title?.toLowerCase().includes(search?.toLowerCase()||'');
    const isAll = !priority || priority==='ALL';
    const matchPriority= isAll || currTask?.priority === priority;
    return matchTask && matchPriority;
  })

  return(
    <div className="bg-gray-300 rounded-xl p-2 md:p-4 w-full" ref={setNodeRef}>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-bold text-xl text-[#1a1a3d]">{title}</h2>
        <span className="bg-gray-400 text-gray-300 text-sm font-bold px-2 py-0.5 rounded-md"
        >{count}</span>
      </div>
      <SortableContext items={tasks.map(t=>t.id)}>
        <div className="flex flex-col gap-4">
          {searchTask.map((taskItem)=>(
            <TaskCard  
              key={taskItem.id}
              taskItem={taskItem}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}