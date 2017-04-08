import * as types from './mutation-types'
var state = {
  channel:'graduate',
  step: 1,
  navInfo:{
    student:[
      {
        text:'基本信息',
        active: true
      },
      {
        text:'学校专业',
        active: false
      },
      {
        text:'联系方式',
        active: false
      }
    ],
    teacher:[
      {
        text:'基本信息',
        active: true
      },
      {
        text:'工作资源',
        active: false
      },
      {
        text:'联系方式',
        active: false
      }
    ],
    graduate:[
      {
        text:'基本信息',
        active: true
      },
      {
        text:'学校专业',
        active: false
      },
      {
        text:'工作资源',
        active: false
      },
      {
        text:'联系方式',
        active: false
      }
    ]
  },
  userInfo:{
    password:'',
    name:'',
    gender:'男',
    birthday:'',
    bprovince:'',
    bcity:'',
    role:'',
    graduate_fromother:'',
    company:'',
    industry:'',
    job:'',
    department:'',
    detail_job:'',
    enrol_time:'',
    graduate_time:'',
    major:'',
    province:'',
    city:'',
    wechat:'',
    phonenum:'',
    resource_description:'',
    // class:'2167160301',
    class:'',
    nameErrorCount: 0,
    passedNameCheck: true
  }
};

const actions = {
  [types.CHANGE_CHANNEL]({commit},channel){
    commit(types.CHANGE_CHANNEL,channel);
  },
  [types.CHANGE_USERINFO]({commit},obj){
    commit(types.CHANGE_USERINFO,obj)
  },
  [types.STEP_NEXT]({commit}){
    commit(types.STEP_NEXT)
  }
};

const getters = {
  [types.GET_NAV](state){
    if(state.userInfo.role == 'teacher' && state.userInfo.graduate_fromother == '0'){
      return state.navInfo['graduate'];
    }
    return state.navInfo[state.channel];
  }
};

const mutations = {
  [types.CHANGE_CHANNEL](state,channel='student'){
    state.channel = channel;
  },
  [types.CHANGE_USERINFO](state,obj){
    // Object.assign(state.userInfo, obj);
    state.userInfo = {...state.userInfo,...obj};
  },
  [types.STEP_NEXT](state){
    state.step = state.step + 1;
    let channel = state.channel;
    if(state.userInfo.role == 'teacher' && state.userInfo.graduate_fromother == '0'){
      channel  = 'graduate';
    }
    state.navInfo[channel][state.step-1].active = true;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
}