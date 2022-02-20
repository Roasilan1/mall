// 引入统一管理的请求库
import { getBaseCategoryList } from '@/api';
import { getBanners } from '@/api';
import { getFloors } from '@/api';
const actions = {
    async baseCategoryList({ commit }) {
        const result = await getBaseCategoryList();
        if (result.code === 200) {
            commit("BASECATEGORYLIST", result.data);
        }
    },
    async getBanners({ commit }) {
        const result = await getBanners();
        if (result.code === 200)
            commit("GETBANNERS", result.data);
    },
    async getFloors({ commit }) {
        const result = await getFloors();
        if (result.code === 200)
            commit("GETFLOORS", result.data);
    }
};
const mutations = {
    BASECATEGORYLIST(state, value) {
        state.categoryList = value;
    },
    GETBANNERS(state, value) {
        state.banners = value;
    },
    GETFLOORS(state, value) {
        state.floors = value;
    }
};
const getters = {

};
const state = {
    categoryList: [],
    banners: [],
    floors: []
};


export default {
    actions,
    mutations,
    getters,
    state
}