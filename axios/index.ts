import axios from "axios";

export const appAxios = axios.create({
    baseURL:'http://localhost:3300/api'
})