import axios from 'axios'
import {getToken} from "./token.js"

const instance = axios.create({
    baseURL: 'http://47.111.117.108:8080',
    timeout: 5000
})
// 添加请求拦截器
instance.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
    return response
}, (error) => {

    return Promise.reject(error)
})

export default instance;