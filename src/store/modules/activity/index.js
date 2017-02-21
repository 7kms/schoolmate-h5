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
    }
}

function getParams (item) {
    return {
        start: state[item].start,
        pageSize: state[item].pageSize
    }
}

const actions = {
    [types.LOAD_COLUMN_LIST] ({ commit, dispatch }) {
      let params = getParams('column');
      return new Promise((resolve,reject) => {
        $api.get('/index.php/Activity/getList',params)
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

    [types.LOAD_PHOTO_LIST] ({ commit, dispatch }) {
      let params = getParams('photo');
      return new Promise((resolve,reject) => {
        $api.get('/index.php/Picture/getList',params)
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
        item.pictures.length = 3;
        state.photo.list.push(item);
      });
        // state.photo.list = [...state.photo.list, ...dataList];
    },
    [types.RESET_PHOTO_LIST] (state) {
        state.photo.list = [];
        state.photo.start = 0;
        state.photo.noMore = false;
    },
    [types.CHANGE_PHOTO_STATUS] (state, status) {
        state.photo = Object.assign(state.photo, status);
    }
}

export default {
    state,
    actions,
    mutations
}
