import axios from 'axios'

//  API 配置
axios.defaults.baseURL = 'http://127.0.0.1:8000/msnvdb';

//请求拦截
axios.interceptors.request.use(config=>config);

//响应拦截器
axios.interceptors.response.use(res=>{
    return res
},err=>{
    return Promise.reject(err)
})

export default axios