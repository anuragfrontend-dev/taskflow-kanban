import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {fetchData, addData, deleteData, clearAllFromApi, editData } from '../api/api'

export const getData=createAsyncThunk('getData',async()=>{
  const res=await fetchData();
  return res.data;
})


export const addedTask=createAsyncThunk('addTask',async(newTask)=>{
  const res=await addData(newTask);
  return res.data;
});

export const deleteTask=createAsyncThunk('deleteTask',async(id)=>{
  await deleteData(id);
  return id;
});

export const updateTask=createAsyncThunk('updateTask',async({id,newEditData})=>{
  const res = await editData(id,newEditData);
  return res.data;
});

export const clearTasks=createAsyncThunk('clearTasks',async(tasks)=>{
  await clearAllFromApi(tasks);
  return [];
})



const initialState={
  tasks:[],
  isLoading:false
}


const tasksSlice=createSlice({
  name:'tasks',
  initialState,
  reducers:{
    reorderTask:(state,action)=>{
      const {activeId, overId} = action.payload;
      const oldIndex = state.tasks.findIndex(t=>String(t.id)=== String(activeId));
      const newIndex = state.tasks.findIndex(t=>String(t.id)===String(overId));

      if(oldIndex !==-1 && newIndex !==-1){
        const [movedTask] = state.tasks.splice(oldIndex,1);
        state.tasks.splice(newIndex,0,movedTask);
      }
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getData.pending,(state)=>{
      state.isLoading=true;
    })
    .addCase(getData.fulfilled,(state,action)=>{
      state.tasks=action.payload;
      state.isLoading=false;
    })
    .addCase(getData.rejected,(state)=>{
      state.isLoading=false;
    })
    .addCase(addedTask.fulfilled,(state,action)=>{
      state.tasks.push(action.payload);
    })
    .addCase(deleteTask.fulfilled,(state,action)=>{
      state.tasks=state.tasks.filter((task)=>(task.id !==action.payload))
    })
    .addCase(updateTask.fulfilled,(state,action)=>{
      state.tasks=state.tasks.map((currTask)=>
        (currTask.id===action.payload.id ? 
        {...currTask, ...action.payload}:currTask));
      state.isLoading=false;
    })
    .addCase(clearTasks.pending,(state)=>{
      state.tasks=[];
    })
    .addCase(clearTasks.fulfilled,(state)=>{
      state.tasks=[];
    })
  }
})

export const { reorderTask } = tasksSlice.actions;
export default tasksSlice.reducer;