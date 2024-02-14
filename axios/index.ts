import axios from "axios";

export const appAxios = axios.create({
    baseURL:'http://10.100.102.67:4000/api', // local !    
})