import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
import 'nprogress/nprogress.css';

import store from '@/store';


// 声明一个数组用于存储每个请求的取消函数和axios标识
let pending = [];
const CancelToken = axios.CancelToken;

let removePending = (config) => {
    for (let p in pending) {
        if (pending[p].u === config.url + JSON.stringify(config.data) + '&' + config.method) {
            //这里执行了cancel  promise状态变为fulfill
            pending[p].f();
            pending.splice(p, 1);
        }
    }
}

//设置全局的请求次数，请求的间隔
axios.defaults.retry = 2;
axios.defaults.retryDelay = 1000;

// 配置axios
const request = axios.create({
    baseURL: "api/",
    timeout: 5000
})


// 配置请求拦截器
request.interceptors.request.use(config => {
    //取消上一次请求
    removePending(config);
    //c CancelToken构造器执行传入executor时所传递的一个取消函数 可以决定promise的状态  由待定变为fulfill
    config.cancelToken = new CancelToken((c) => {
        // 将标识push进队列
        pending.push({ u: config.url + JSON.stringify(config.data) + '&' + config.method, f: c })
    })

    //进度条开始
    nprogress.start();
    if (store.state.detail.uuid_token) {
        //添加请求头
        config.headers.userTempId = store.state.detail.uuid_token;
    }

    if (store.state.user.token)
        config.headers.token = store.state.user.token;
    return config;
});

// 配置响应拦截器
request.interceptors.response.use(
    resolve => {
        nprogress.done();
        return resolve.data;
    }, err => {
        nprogress.done();
        let config = err.config;
        //config内增加变量为重试次数  undefined则赋值为0
        config.__retryCount = config.__retryCount || 0;
        //先判断重试次数是否达到设置的重试次数 达到返回一个拒绝的期约 下面的重试就不会执行
        if (config.__retryCount >= config.retry) {
            return Promise.reject(err);
        }

        //自增重试次数
        config.__retryCount += 1;

        //延迟执行的契约  没有设置dealy则默认1000
        let backoff = new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, config.retryDelay || 1000);
        });

        //延迟后执行 请求重发
        return backoff.then(() => {
            return request(config);
        })
    })
export default request;