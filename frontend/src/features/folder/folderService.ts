import  Axios  from "axios"
import { base_url } from "../../constants/api"

interface IFolder {
  name:String
}

export const getAllFoldersService = async(token:string):Promise<any> => {
  const res = await Axios.get(`${base_url}/folders`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res;
}
export const createFolderService = async(token:string, folderData:IFolder ):Promise<any> => {
  const res = await Axios.post(`${base_url}/folders`, folderData
,  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  },
  
  );
  return res;
}

export const deleteFolderService = async(token:string, folderId:string ):Promise<any> => {
  const res = await Axios.delete(`${base_url}/folders/${folderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res;
}

export const getSingleFolderService = async(token:string, folderId:any  ):Promise<any> => {
  const res = await Axios.get(`${base_url}/folders/${folderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return res;
}

export const updateFolderService = async(token:string, folderId:any, updateData:IFolder  ):Promise<any> => {
  const res = await Axios.put(`${base_url}/folders/${folderId}`, updateData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return res;
}

export const searchFoldersAndTasksService = async(token:string, searchQuery:string):Promise<any> => {
  const res = await Axios.get(`${base_url}/folders/search?q=${searchQuery}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return res;
}

