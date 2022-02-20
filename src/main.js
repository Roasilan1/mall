import Vue from 'vue'
import App from './App.vue';
import store from '@/store';
// 引入路由组件
import router from "@/router";
// 注册全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import "./test/load";

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//注册工具类的管理文件
import "@/utils";

//引入mock
import "@/mock/mockServer";

//引入api请求库  需要挂载到Vue实例身上
import * as api from '@/api';

//引入图片懒加载
import VueLazyload from 'vue-lazyload';
import load from '@/assets/images/load.jpg';

Vue.use(VueLazyload, {
    loading: load,
})

//引入alert 并在原型上挂载
import { MessageBox, Button } from 'element-ui';
Vue.use(Button);

Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false;

new Vue({
    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this;

        //所有的request挂载到vue实例
        Vue.prototype.$api = api;
    },
    render: h => h(App),
    router,
    store
}).$mount('#app');