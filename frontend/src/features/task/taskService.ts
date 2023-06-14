
import Axios from 'axios'

import { ITask } from "./taskSlice";
import { base_url } from '../../constants/api';

export interface ITaskUpdateData {
  _id?:string;
  title?:string;
  isCompleted?:boolean;
  dueDate?:string;
}

export const getAllTasksService = async(token:string):Promise<any> => {
  const res = await Axios.get(`${base_url}/tasks`
,  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },
  
  );
  return res;
}

export const getTodaysTasksService = async(token:string):Promise<any> => {
  const res = await Axios.get(`${base_url}/tasks/due-today`
,  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },
  
  );
  return res;
}

export const createTaskService = async(token:string, taskData:ITask ):Promise<any> => {
  const res = await Axios.post(`${base_url}/tasks`, taskData
,  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },
  
  );
  return res;
}

export const updateTaskService = async(token:string, taskUpdateData:ITaskUpdateData ):Promise<any> => {
  const res = await Axios.put(`${base_url}/tasks/${taskUpdateData._id}`, taskUpdateData
,  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },
  
  );
  return res;
}

export const deleteTaskService = async(token:string, taskId:string ):Promise<any> => {
  const res = await Axios.delete(`${base_url}/tasks/${taskId}`
,  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },
  
  );
  return res;
}