import Vuex from 'vuex';
import Vue from 'vue';

import home from '@/store/Home';
import search from '@/store/Search';
import detail from '@/store/Detail';
import shopCart from './ShopCart';
import user from './User';
import trade from './Trade';
Vue.use(Vuex);

// 将ajax请求放stroe的好处   其他模块如果需要调用相同的接口  可
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        search,
        trade
    }
});