const state = {
    username: '',
    token: '',
}
const mutations = {
    SET_USERNAME: (state, username) => {
        state.username = username;
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
}
// action用来记录动作  可以操作登录登出获得用户信息
const actions = {

}

export default {
    namespaced: true,
    state, 
    mutations,
    actions
}