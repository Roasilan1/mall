import Vue from 'vue';
import throttle from './throttle';
import debounce from "./debounce";

//在vue的实例上添加防抖节流函数
Vue.prototype.throttle = throttle;
Vue.prototype.debounce = debounce;