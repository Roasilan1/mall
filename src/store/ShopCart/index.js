import { cartList } from '@/api';
import { checkCart } from '@/api';
import { deleteCart } from '@/api';
const state = {
    shopCart: [],
};
const actions = {
    async shopCart({ commit }) {
        const result = await cartList();
        if (result.code === 200)
            commit("SHOPCART", result.data);
    },
    async checkCart({ commit }, { skuId, isChecked }) {
        const result = await checkCart(skuId, isChecked);
        if (result.code === 200)
            return "ok";
        else
            Promise.reject(new Error("cant checked"));
    },
    async deleteCart({ commit }, skuId) {
        const result = await deleteCart(skuId);
        if (result.code === 200)
            return "ok";
        else
            Promise.reject(new Error("can not delete Cart"));
    },
    async deleteAllCheckedCart({ dispatch, getters }) {
        const promiseAll = [];
        getters.shopCartList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch("deleteCart", item.skuId) : '';
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll);
    }
};
const mutations = {
    SHOPCART(state, shopCart) {
        state.shopCart = shopCart;
    }
};
const getters = {
    shopCartList(state) {
        try {
            return state.shopCart[0].cartInfoList
        } catch {
            return [];
        }
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}