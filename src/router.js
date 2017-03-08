import Vue from 'vue'
import VueRouter from 'vue-router'
import util from './util/index'
Vue.use(VueRouter)
const ROUTER_SETTING = {
	mode: 'history', // default value 'hash'
    base: '/',
	  routes: [
        {
            path: '/activity',
            component: resolve => require(['./pages/activity/index.vue'], resolve),
            alias: '/',
            children: [
                {
                    path: '',
                    name: 'column-list',
                    meta: {
                        showHeader: true,
                        showNav: true,
                        title:'活动栏'
                    },
                    component: resolve => require(['./pages/activity/columnList.vue'], resolve)
                },
                {
                    path: 'photoshow',
                    name: 'photo-list',
                    meta: {
                        showHeader: true,
                        showNav: true,
                        title:'照片墙'
                    },
                    component: resolve => require(['./pages/activity/photoList.vue'], resolve)
                },
                {
                    path: 'photos/:id',
                    name: 'photos',
                    meta: {
                        title:'精彩活动秀'
                    },
                    component: resolve => require(['./pages/activity/columnPhotoList.vue'], resolve)
                },
                {
                    path: 'column-detail/:id',
                    name: 'column-detail',
                    meta: {
                      title:'活动详情'
                    },
                    component: resolve => require(['./pages/activity/columnDetail.vue'], resolve)
                },
                {
                    path: 'photo-detail/:id',
                    name: 'photo-detail',
                    meta: {
                      title:'照片详情'
                    },
                    component: resolve => require(['./pages/activity/photoDetail.vue'], resolve)
                }
            ]
        },
        {
            path: '/interact',
            component: resolve => require(['./pages/interact/index.vue'], resolve),
            children: [
                {
                    path: '',
                    name: 'interact-list',
                    meta: {
                        showHeader: true,
                        showNav: true,
                        title:'互助'
                    },
                    component: resolve => require(['./pages/interact/interactList.vue'], resolve)
                },
                {
                    path: 'mates',
                    name: 'interact-mates',
                    meta: {
                        showHeader: true,
                        showNav: true,
                        title:'校友录'
                    },
                    component: resolve => require(['./pages/interact/mateList.vue'], resolve)
                },
                {
                    path: 'contacts',
                    name: 'interact-contacts',
                    meta: {
                      title:'联系人'
                    },
                    component: resolve => require(['./pages/interact/contactList.vue'], resolve)
                }
            ]
        },
        {
            path: '/moments',
            component: resolve => require(['./pages/moments/index.vue'], resolve),
            children: [
                {
                    path: '',
                    name: 'interest-list',
                    meta: {
                      showHeader: true,
                      showNav: true,
                      title:'兴趣圈'
                    },
                    component: resolve => require(['./pages/moments/interestList.vue'], resolve)
                },
                {
                    path: 'interest/:id',
                    name: 'interest-detail',
                    meta: {
                      title:'兴趣圈'
                    },
                    component: resolve => require(['./pages/moments/interestDetail.vue'], resolve)
                },
                {
                  path: 'interest/:cid/verify',
                  name: 'interest-verify',
                  meta: {
                    title:'兴趣圈'
                  },
                  component: resolve => require(['./pages/moments/verifyList.vue'], resolve)
                },
                {
                    path: 'interest/:id/member',
                    name: 'interest-member',
                    meta: {
                      title:'兴趣圈'
                    },
                    component: resolve => require(['./pages/moments/memberList.vue'], resolve)
                },
                {
                    path: 'industry',
                    name: 'industry-list',
                    meta: {
                        showHeader: true,
                        showNav: true,
                        title:'行业圈'
                    },
                    component: resolve => require(['./pages/moments/industryList.vue'], resolve)
                }
            ]
        },
        {
            path: '/mine',
            component: resolve => require(['./pages/mine/index.vue'], resolve),
                children:[
                  {
                    path:'',
                    meta: {
                      showNav: true,
                      meta:'我的'
                    },
                    component: resolve => require(['./pages/mine/menu.vue'], resolve)
                  },
                  {
                    path:'info',
                    meta: {
                      meta:'我的资料'
                    },
                    component: resolve => require(['./pages/mine/info.vue'], resolve)
                  },
                  {
                    path:'contacts',
                    meta: {
                      meta:'通讯录'
                    },
                    component: resolve => require(['./pages/mine/contactList.vue'], resolve)
                  },
                  {
                    path:'contacts/:id',
                    meta: {
                      meta:'联系人'
                    },
                    component: resolve => require(['./pages/mine/contactDetail.vue'], resolve)
                  },
                  {
                    path:'publish',
                    meta: {
                      meta:'我的发布'
                    },
                    component: resolve => require(['./pages/mine/publish.vue'], resolve),
                    children:[
                      {
                        path:':column?',
                        component: resolve => require(['./pages/mine/pubColumn.vue'], resolve),
                      }
                    ]
                  },
                  {
                    path:'moments',
                    component: resolve => require(['./pages/mine/momentList.vue'], resolve)
                  }
              ]
        },
        {
            path: '/entrance',
            meta: {
              meta:'注册'
            },
            component: resolve => require(['./pages/entrance/index.vue'], resolve)
        },
        {
          path: '/comment/:column',
          name: 'comment',
          meta: {
            meta:'评论'
          },
          component: resolve => require(['./pages/comment/index.vue'], resolve)
        },
        {
          path: '/publish',
          component: resolve => require(['./pages/publish/index.vue'], resolve),
          redirect: '/publish/activity',
          children:[
            {
              path:'activity',
              meta: {
                meta:'发布活动'
              },
              component: resolve => require(['./pages/publish/publishActivity.vue'], resolve)
            },
            {
              path:'photo',
              meta: {
                meta:'发布照片'
              },
              component: resolve => require(['./pages/publish/publishPhoto.vue'], resolve)
            },
            {
              path:'interact',
              meta: {
                meta:'发布需求'
              },
              component: resolve => require(['./pages/publish/publishInteract.vue'], resolve)
            },
            {
              path:'interest',
              meta: {
                meta:'发布圈子'
              },
              component: resolve => require(['./pages/publish/publishInterest.vue'], resolve)
            }
          ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
};
const router = new VueRouter(ROUTER_SETTING)
const title = '校友云';
router.beforeEach((to, from, next) => {
    let titleStr = ''
    // 倒序遍历数组获取匹配到的路由节点，拼接各部分title
    for (let i = to.matched.length - 1; i >= 0; i--) {
        titleStr += `${to.matched[i].meta.title ? to.matched[i].meta.title : ''}`
    }
    if (titleStr) {
        titleStr += `-${title}`
    } else {
        titleStr += title;
    }
    changeTitle(titleStr);
    next();
});
function changeTitle(titleStr) {
  document.title = titleStr;
  if(util.isIOS()){
    let iframe = document.createElement('iframe');
    iframe.src= require('./assets/images/favicon.ico');
    iframe.style.display = 'none';
    document.getElementsByTagName('body')[0].appendChild(iframe);
    let refreshFn = function () {
      setTimeout(function() {
        iframe.removeEventListener('load',refreshFn,false);
        iframe.parentNode.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener('load',refreshFn, false);
  }
}
export default router;
