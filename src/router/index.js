import VueRouter from "vue-router";
import Vue from 'vue';
Vue.use(VueRouter);
import routes from './routes';
import { tokenOperator as tokenOpt } from '@/utils/storageUtils';
const tokenOperator = new tokenOpt();
// 引入store检测token
import store from '@/store';

// 重写路由的push和replace方法
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject)
        push.call(this, location, resolve, reject);
    else
        push.call(this, location, () => {}, () => {});
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject)
        replace.call(this, location, resolve, reject);
    else
        replace.call(this, location, () => {}, () => {});
}

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (from.name === "search")
            return { y: 0 };
    }
})

router.beforeEach((to, from, next) => {
    //userInfo未获取
    if (!Object.keys(store.state.user.userInfo).length) {
        if (store.state.user.token) {
            // 根据token获取用户信息
            store.dispatch("getUserInfo");
        }
    }
    if (to.meta.tourist)
        next();
    else if (!tokenOperator.getToken()) {
        next("/login");
    } else
        next();
});
export default router;