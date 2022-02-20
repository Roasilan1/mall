import { login } from '@/api';
import { tokenOperator as tokenOpt } from '@/utils/storageUtils';
import { getUserInfo } from "@/api";
import { logout } from '@/api';
import { getCode } from '@/api';
import { register } from '@/api';
const tokenOperator = new tokenOpt();
const actions = {
    async login({ commit }, { phone, password }) {
        const result = await login(phone, password);
        if (result.code === 200)
            commit("LOGIN", result.data);
    },

    async getUserInfo({ commit }, userInfo) {
        const result = await getUserInfo();
        console.log(result)
        if (result.code === 200)
            commit("GETUSERINFO", result.data);
        else if (result.code === 208) { //登录失效
            commit("LOGOUT");
        }

        // {
        //     "code": 208,
        //     "message": "未登陆",
        //     "ok": false
        // }
    },

    async logout({ commit }) {
        const result = await logout();
        if (result.code === 200)
            commit("LOGOUT");
    },
    //获取验证码
    async getCode({ commit }, phone) {
        const result = await getCode(phone);
        if (result.code === 200)
            console.log(result.data);
    },

    async register({ commit }, { phone, password, code }) {
        const result = await register(phone, password, code);
        if (result.code === 200)
            return "ok";
        else
            throw new Error(result.message);
    }
};
const mutations = {
    LOGIN(state, userInfo) {
        state.token = userInfo.token;
        tokenOperator.setToken(state.token);
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    LOGOUT(state) {
        state.userInfo = {};
        state.token = "";
        //这里clear只是删除与token相关的storage
        tokenOperator.clear();
    }
};
const state = {
    token: tokenOperator.getToken(),
    userInfo: {},
};
const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters
}