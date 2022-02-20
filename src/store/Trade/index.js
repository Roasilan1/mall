import { getAddressList } from '@/api';
import { getOrderInfo } from '@/api';
import { submitOrder } from '@/api';

const actions = {
    async getAddressList({ commit }) {
        const result = await getAddressList();
        if (result.code === 200)
            commit("GETADDRESSLIST", result.data);
    },
    async getOrderInfo({ commit }) {
        const result = await getOrderInfo();
        if (result.code === 200) {
            commit("GETORDERINFO", result.data);
        }
    },
    submitOrder({ commit }, { tradeNo, params }) {
        const result = submitOrder(tradeNo, params).then(resolve => {
            Promise.resolve(resolve)
        });
        console.log(result);
    }
};
const mutations = {
    GETADDRESSLIST(state, addressList) {
        state.addressList = addressList;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const state = {
    addressList: [],
    orderInfo: {}

};
const getters = {

};
export default {
    actions,
    mutations,
    state,
    getters
}