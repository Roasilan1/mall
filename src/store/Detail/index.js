import { getDetail } from "@/api";
import { addTocart } from "@/api";
import getuuid from '@/utils/uuid';
const actions = {
    async getDetail({ commit }, goodid) {
        const result = await getDetail(goodid);
        if (result.code === 200)
            commit("GETDETAIL", result.data)
    },
    async addTocart({ commit }, { skuId, skuNum }) {
        const result = await addTocart(skuId, skuNum);
        if (result.code === 200)
            return "ok";
        else
            Promise.reject(new Error("add cart Error"));
    }
};
const mutations = {
    GETDETAIL(state, value) {
        state.detail = value;
    }
};
const state = {
    detail: {},
    uuid_token: getuuid()
};
const getters = {
    spuSaleAttrList(state) {
        return state.detail.spuSaleAttrList || [];
    },
    skuInfo(state) {
        return state.detail.skuInfo || {};
    },
    categoryView(state) {
        return state.detail.categoryView || {};
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}