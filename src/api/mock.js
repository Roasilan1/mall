import axios from "axios";
// 引入进度条
import nprogress from "nprogress";





// 配置axios
const request = axios.create({
    baseURL: "/mock",
    timeout: 5000
})


// 配置请求拦截器
request.interceptors.request.use(config => {
    nprogress.start();
    return config;
});

// 配置响应拦截器
request.interceptors.response.use(
    resolve => {
        nprogress.done();
        return resolve.data;
    }, reject => {
        return Promise.reject(new Error("fail"))
    })
export default request;