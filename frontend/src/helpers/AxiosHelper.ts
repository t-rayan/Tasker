import Axios from 'axios';

export const normalInstance = Axios.create({
  baseURL: "http://localhost:8080/",
})