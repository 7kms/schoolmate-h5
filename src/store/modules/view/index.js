import * as types from './mutation-types';
var state = {
    showNav: true,
    showHeader: true
};
const actions = {
    [types.SET_STATUS] ({ commit }, payload) {
        commit(types.SET_STATUS, payload);
    }
};
const getters = {
    [types.GET_STATUS] (state) {
        return { ...state };
    }
};
const mutations = {
    [types.SET_STATUS] (state, { showNav = false, showHeader = false }) {
        state.showNav = showNav;
        state.showHeader = showHeader;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}
