import * as types from './mutation-types'
import $api from 'api';
var state = {
    column: {
        list: [],
        noMore: false,
        pageSize: 10,
        start: 0
    },
    photo: {
        list: [],
        noMore: false,
        pageSize: 10,
        start: 0
    },
    attend: {
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
    [types.LOAD_COLUMN_LIST] ({ commit, dispatch },payload) {
      let params = getParams('column');
      if(payload){
        payload.cid && (params.cid = payload.cid);
        payload.uid && (params.uid = payload.uid);
      }
      return new Promise((resolve,reject) => {
        $api.get('/Activity/getList',params)
          .then(data =>{
            dispatch(types.APPEND_COLUMN_LIST, data.result);
            var noMore = (state.column.list.length >= data.total);
            commit(types.CHANGE_COLUMN_STATUS, { noMore, start: state.column.start + state.column.pageSize });
            resolve();
          },data =>{
             reject(data);
          });
      });
    },
    [types.APPEND_COLUMN_LIST] ({ commit }, dataList) {
        commit(types.APPEND_COLUMN_LIST, dataList);   
    },
    [types.RESET_COLUMN_LIST] ({ commit }) {
        commit(types.RESET_COLUMN_LIST);
    },

    [types.LOAD_PHOTO_LIST] ({ commit, dispatch },payload) {
      let params = getParams('photo');
      if(payload){
        payload.cid && (params.cid = payload.cid);
        payload.uid && (params.uid = payload.uid);
        payload.aid && (params.aid = payload.aid);
      }
      return new Promise((resolve,reject) => {
        $api.get('/Picture/getList',params)
          .then(data =>{
            dispatch(types.APPEND_PHOTO_LIST, data.result);
            var noMore = (state.photo.list.length >= data.total);
            commit(types.CHANGE_PHOTO_STATUS, { noMore, start: state.photo.start + state.photo.pageSize });
            resolve();
          },data =>{
            reject(data);
          });
      });
    },
    [types.APPEND_PHOTO_LIST] ({ commit }, dataList) {
        commit(types.APPEND_PHOTO_LIST, dataList);   
    },
    [types.RESET_PHOTO_LIST] ({ commit }) {
        commit(types.RESET_PHOTO_LIST);
    },




  [types.LOAD_ATTEND_LIST] ({ commit, dispatch },payload) {
    let params = getParams('attend');
    if(payload){
      payload.cid && (params.cid = payload.cid);
      payload.uid && (params.uid = payload.uid);
    }
    return new Promise((resolve,reject) => {
      $api.get('/Activity/getAttendList',params)
        .then(data =>{
          dispatch(types.APPEND_ATTEND_LIST, data.result);
          var noMore = (state.attend.list.length >= data.total);
          commit(types.CHANGE_ATTEND_STATUS, { noMore, start: state.attend.start + state.attend.pageSize });
          resolve();
        },data =>{
          reject(data);
        });
    });
  },
  [types.APPEND_ATTEND_LIST] ({ commit }, dataList) {
    commit(types.APPEND_ATTEND_LIST, dataList);
  },
  [types.RESET_ATTEND_LIST] ({ commit }) {
    commit(types.RESET_ATTEND_LIST);
  }
};

const mutations = {
    [types.APPEND_COLUMN_LIST] (state, dataList) {
        state.column.list = [...state.column.list, ...dataList];
    },
    [types.RESET_COLUMN_LIST] (state) {
        state.column.list = [];
        state.column.start = 0;
        state.column.noMore = false;
    },
    [types.CHANGE_COLUMN_STATUS] (state, status) {
        state.column = Object.assign(state.column, status);
    },


    [types.APPEND_PHOTO_LIST] (state, dataList) {
      dataList.forEach(item=>{
          if(!item.pictures){
              item.pictures = [];
          }
        item.pictures.length = 3;
        state.photo.list.push(item);
      });
    },
    [types.RESET_PHOTO_LIST] (state) {
        state.photo.list = [];
        state.photo.start = 0;
        state.photo.noMore = false;
    },
    [types.CHANGE_PHOTO_STATUS] (state, status) {
        state.photo = Object.assign(state.photo, status);
    },



    [types.APPEND_ATTEND_LIST] (state, dataList) {
      state.attend.list = [...state.attend.list, ...dataList];
    },
    [types.RESET_ATTEND_LIST] (state) {
      state.attend.list = [];
      state.attend.start = 0;
      state.attend.noMore = false;
    },
    [types.CHANGE_ATTEND_STATUS] (state, status) {
      state.attend = Object.assign(state.attend, status);
    }
};

export default {
    state,
    actions,
    mutations
}
