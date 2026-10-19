import axios from "axios";

const api=axios.create({
  baseURL:'https://6abcfcdc5121d616d90c9d34.mockapi.io'
})


export function fetchData(){
  return api.get('/tasks')
}

export function addData(newData){
  return api.post('/tasks',newData);
}

export function deleteData(id){
  return api.delete(`/tasks/${id}`);
}

export function editData(id,newEditData){
  return api.put(`/tasks/${id}`,newEditData);
}

export async function clearAllFromApi(tasks){
  for (let task of tasks){
    try{
      await api.delete(`/tasks/${task.id}`)
    }catch(err){
      console.log(`failed to delete ${task.id}`,err);
    }
  }
}