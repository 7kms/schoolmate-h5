import * as types from './mutation-types'
import $api from 'api';
var state = {
  interact: {
    list: [],
    noMore: false,
    pageSize: 10,
    start: 0
  },
  mates: {
    list: [],
    noMore: false,
    pageSize: 10,
    start: 0,
    nav:[
      {name:'同城', active: false},
      {name:'同行', active: false},
      {name:'同学', active: false},
      {name:'更多', active: false, more: true},
    ],
    condition:{}
  }
};

function getParams (item) {
  let obj = {
    start: state[item].start,
    pageSize: state[item].pageSize
  };
  if(item == 'mates'){
    Object.assign(obj,state.mates.condition);
  }
  return obj;
}

const actions = {
  [types.LOAD_INTERACT_LIST] ({ commit, dispatch }, payload) {
    let params = getParams('interact');
    if(payload){
      payload.cid && (params.cid = payload.cid);
      payload.uid && (params.uid = payload.uid);
    }
    return new Promise((resolve,reject) => {
      $api.get('/Help/getResList',params)
        .then(data =>{
          dispatch(types.APPEND_INTERACT_LIST, data.result);
          var noMore = (state.interact.list.length >= data.total);
          commit(types.CHANGE_INTERACT_STATUS, { noMore, start: state.interact.start + state.interact.pageSize });
          resolve();
        },data =>{
          reject(data);
        });
    });
  },
  [types.APPEND_INTERACT_LIST] ({ commit }, dataList) {
    commit(types.APPEND_INTERACT_LIST, dataList);
  },
  [types.RESET_INTERACT_LIST] ({ commit }) {
    commit(types.RESET_INTERACT_LIST);
  },
  [types.CHANGE_MATES_CONDITION] ({ commit }, status) {
  	commit(types.CHANGE_MATES_CONDITION, status);
  },
  [types.LOAD_MATES_LIST] ({ commit, dispatch }) {
    let params = getParams('mates');
    return new Promise((resolve,reject) => {
      $api.get('/Help/getMateList',params)
        .then(data =>{
          dispatch(types.APPEND_MATES_LIST, data.result);
          var noMore = (state.mates.list.length >= data.total);
          commit(types.CHANGE_MATES_STATUS, { noMore, start: state.mates.start + state.mates.pageSize });
          resolve();
        },data =>{
          reject(data);
        });
    });
  },
  [types.APPEND_MATES_LIST] ({ commit }, dataList) {
    commit(types.APPEND_MATES_LIST, dataList);
  },
  [types.RESET_MATES_LIST] ({ commit }) {
    commit(types.RESET_MATES_LIST);
  },
  [types.RESET_MATES_CONDITION] ({ commit }) {
    commit(types.RESET_MATES_CONDITION);
    commit(types.RESET_MATES_LIST);
  },
  [types.SWITCH_MATES_NAV] ({ commit },nav) {
    commit(types.SWITCH_MATES_NAV, nav);
  }
};

const mutations = {
  [types.APPEND_INTERACT_LIST] (state, dataList) {
    dataList.map(item=>{
      if(!item.pictures)item.pictures=[];
      if(item.pictures.length == 0){
        item.noPicture = true;
      }
      item.pictures.length = 4;
    });
    state.interact.list = [...state.interact.list, ...dataList];
  },
  [types.RESET_INTERACT_LIST] (state) {
    state.interact.list = [];
    state.interact.condition = {};
    state.interact.start = 0;
    state.interact.noMore = false;
  },
  [types.CHANGE_INTERACT_STATUS] (state, status) {
    state.interact = Object.assign(state.interact, status);
  },


  [types.APPEND_MATES_LIST] (state, dataList) {
    state.mates.list = [...state.mates.list, ...dataList];
  },
  [types.RESET_MATES_LIST] (state) {
    state.mates.list = [];
    state.mates.start = 0;
    state.mates.noMore = false;
  },
  [types.CHANGE_MATES_STATUS] (state, status) {
    state.mates = Object.assign(state.mates, status);
  },
  [types.CHANGE_MATES_CONDITION] (state, status) {
  	state.mates.condition = Object.assign(state.mates.condition, status);
  },
  [types.RESET_MATES_CONDITION] (state) {
    state.mates.condition = {};
  },
  [types.SWITCH_MATES_NAV] (state, activeNav) {
    state.mates.nav.forEach(nav => {
      if(nav == activeNav){
        nav.active = true;
      }else{
        nav.active = false;
      }
    });
  },
};

export default {
  state,
  actions,
  mutations
}
