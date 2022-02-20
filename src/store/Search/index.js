import { searchGoods } from '@/api'
const actions = {
    async searchGoods({ commit }, params = {}) {
        const result = await searchGoods(params);

        if (result.code === 200)
            commit("SEARCHGOODS", result.data);
    }
};
const mutations = {
    SEARCHGOODS(state, value) {
        state.searchResult = value;
    }
};
const getters = {
    goodsList(state) {
        return state.searchResult.goodsList || [];
    },
    attrsList(state) {
        return state.searchResult.attrsList || [];
    },
    trademarkList(state) {
        return state.searchResult.trademarkList || [];
    }

};
const state = {
    searchResult: [],
};
const search = {
    actions,
    mutations,
    getters,
    state
}

export default search;