import * as types from './mutation-types'
import $api from 'api';
var state = {
  contact: {
    list: [],
    noMore: false,
    pageSize: 10,
    start: 0
  }
};

function getParams (item) {
  return {
    start: state[item].start,
    pageSize: state[item].pageSize
  };
}

const actions = {
  [types.LOAD_CONTACT_LIST] ({ commit, dispatch }) {
    let params = getParams('contact');
    return new Promise((resolve,reject) => {
      $api.get('/index.php/Profile/getFriends',params)
        .then(data =>{
          dispatch(types.APPEND_CONTACT_LIST, data.result);
          var noMore = (state.contact.list.length >= data.total);
          commit(types.CHANGE_CONTACT_STATUS, { noMore, start: state.contact.start + state.contact.pageSize });
          resolve();
        },data =>{
          reject(data);
        });
    });
  },
  [types.APPEND_CONTACT_LIST] ({ commit }, dataList) {
    commit(types.APPEND_CONTACT_LIST, dataList);
  },
  [types.RESET_CONTACT_LIST] ({ commit }) {
    commit(types.RESET_CONTACT_LIST);
  }
};

const mutations = {
  [types.APPEND_CONTACT_LIST] (state, dataList) {
    state.contact.list = [...state.contact.list, ...dataList];
  },
  [types.RESET_CONTACT_LIST] (state) {
    state.contact.list = [];
    state.contact.start = 0;
    state.contact.noMore = false;
  },
  [types.CHANGE_CONTACT_STATUS] (state, status) {
    state.contact = Object.assign(state.contact, status);
  }
}

export default {
  state,
  actions,
  mutations
}
