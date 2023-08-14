import axios, { AxiosInstance } from 'axios'

const apiAxios: AxiosInstance = axios.create({
    baseURL:"http://localhost:3333"
});

export default apiAxios;