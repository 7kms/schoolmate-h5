import * as types from './mutation-types'
import $api from 'api';
var state = {
  interest: {
    list: [],
    noMore: false,
    pageSize: 10,
    start: 0
  },
  industry: {
    list: [],
    noMore: false,
    pageSize: 10,
    start: 0
  }
};

function getParams (item) {
  let obj = {
    start: state[item].start,
    pageSize: state[item].pageSize
  };
  if(item == 'interest'){
    obj.is_industry = '0';
  }
  return obj;
}

const actions = {
  [types.LOAD_INTEREST_LIST] ({ commit, dispatch }) {
    let params = getParams('interest');
    return new Promise((resolve,reject) => {
      $api.get('/index.php/Circle/getCircleList',params)
        .then(data =>{
          dispatch(types.APPEND_INTEREST_LIST, data.result);
          var noMore = (state.interest.list.length >= data.total);
          commit(types.CHANGE_INTEREST_STATUS, { noMore, start: state.interest.start + state.interest.pageSize });
          resolve();
        },data =>{
          reject(data);
        });
    });
  },
  [types.APPEND_INTEREST_LIST] ({ commit }, dataList) {
    commit(types.APPEND_INTEREST_LIST, dataList);
  },
  [types.RESET_INTEREST_LIST] ({ commit }) {
    commit(types.RESET_INTEREST_LIST);
  },

  [types.LOAD_INDUSTRY_LIST] ({ commit, dispatch }) {
    let params = getParams('industry');
    return new Promise((resolve,reject) => {
      $api.get('/index.php/Picture/getList',params)
        .then(data =>{
          dispatch(types.APPEND_INDUSTRY_LIST, data.result);
          var noMore = (state.industry.list.length >= data.total);
          commit(types.CHANGE_INDUSTRY_STATUS, { noMore, start: state.industry.start + state.industry.pageSize });
          resolve();
        },data =>{
          reject(data);
        });
    });
  },
  [types.APPEND_INDUSTRY_LIST] ({ commit }, dataList) {
    commit(types.APPEND_INDUSTRY_LIST, dataList);
  },
  [types.RESET_INDUSTRY_LIST] ({ commit }) {
    commit(types.RESET_INDUSTRY_LIST);
  }
};

const mutations = {
  [types.APPEND_INTEREST_LIST] (state, dataList) {
    state.interest.list = [...state.interest.list, ...dataList];
  },
  [types.RESET_INTEREST_LIST] (state) {
    state.interest.list = [];
    state.interest.start = 0;
    state.interest.noMore = false;
  },
  [types.CHANGE_INTEREST_STATUS] (state, status) {
    state.interest = Object.assign(state.interest, status);
  },


  [types.APPEND_INDUSTRY_LIST] (state, dataList) {
    dataList.forEach(item=>{
      item.pictures.length = 3;
      state.industry.list.push(item);
    });
    // state.industry.list = [...state.industry.list, ...dataList];
  },
  [types.RESET_INDUSTRY_LIST] (state) {
    state.industry.list = [];
    state.industry.start = 0;
    state.industry.noMore = false;
  },
  [types.CHANGE_INDUSTRY_STATUS] (state, status) {
    state.industry = Object.assign(state.industry, status);
  }
}

export default {
  state,
  actions,
  mutations
}
