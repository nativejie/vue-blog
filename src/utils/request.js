import axios from 'axios'
const service = axios.create({  
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000,
})

// request 拦截器
service.interceptors.request.use(config => {
    return config;
}, error => {
    Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
})

export default service;