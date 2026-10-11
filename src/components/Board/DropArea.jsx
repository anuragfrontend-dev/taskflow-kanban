import { useState } from "react"
export function DropArea({onDrop, isEmpty, isDragging}){
  const[showDrop,setShowDrop]=useState(false)

  if(isEmpty){
    return (
      <div
        className={`flex-1 w-full rounded-lg flex items-center justify-center transition-all duration-200 min-h-30
          ${showDrop
           ? "border-2 border-dashed border-blue-400 bg-blue-50 text-blue-500"
            : isDragging
             ? "border-2 border-dashed border-transparent" 
              : "border-2 border-transparent" 
          }`}
        onDragEnter={()=>setShowDrop(true)}
        onDragLeave={()=>setShowDrop(false)}
        onDragOver={(e)=>{
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          setShowDrop(true);
        }}
        onDrop={(e)=>{
          e.stopPropagation();
          onDrop();
          setShowDrop(false);
        }}
      >
        {showDrop && "Drop here"}
      </div>
    )
  }

  return (
    <div
      className={`w-full rounded-lg flex items-center justify-center transition-all mt-2.5 
        ${showDrop? "h-30 border-2 border-dashed border-blue-400 bg-blue-50 text-sm text-blue-500" : "h-2"}`}
      onDragEnter={()=>setShowDrop(true)}
      onDragLeave={()=>setShowDrop(false)}
      onDragOver={(e)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setShowDrop(true);
      }}
      onDrop={(e)=>{
        e.stopPropagation();
        onDrop();
        setShowDrop(false);
      }}
    >
      {showDrop && "Drop here"}
    </div>
  )
}