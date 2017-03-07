import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
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
                        showNav: true
                    },
                    component: resolve => require(['./pages/activity/columnList.vue'], resolve)
                },
                {
                    path: 'photoshow',
                    name: 'photo-list',
                    meta: {
                        showHeader: true,
                        showNav: true
                    },
                    component: resolve => require(['./pages/activity/photoList.vue'], resolve)
                },
                {
                    path: 'column-detail/:id',
                    name: 'column-detail',
                    component: resolve => require(['./pages/activity/columnDetail.vue'], resolve)
                },
                {
                    path: 'photo-detail/:id',
                    name: 'photo-detail',
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
                        showNav: true
                    },
                    component: resolve => require(['./pages/interact/interactList.vue'], resolve)
                },
                {
                    path: 'mates',
                    name: 'interact-mates',
                    meta: {
                        showHeader: true,
                        showNav: true
                    },
                    component: resolve => require(['./pages/interact/mateList.vue'], resolve)
                },
                {
                    path: 'contacts',
                    name: 'interact-contacts',
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
                      showNav: true
                    },
                    component: resolve => require(['./pages/moments/interestList.vue'], resolve)
                },
                {
                    path: 'interest/:id',
                    name: 'interest-detail',
                    component: resolve => require(['./pages/moments/interestDetail.vue'], resolve)
                },
                {
                  path: 'interest/:cid/verify',
                  name: 'interest-verify',
                  component: resolve => require(['./pages/moments/verifyList.vue'], resolve)
                },
                {
                    path: 'interest/:id/member',
                    name: 'interest-member',
                    component: resolve => require(['./pages/moments/memberList.vue'], resolve)
                },
                {
                    path: 'industry',
                    name: 'industry-list',
                    meta: {
                        showHeader: true,
                        showNav: true
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
                      showNav: true
                    },
                    component: resolve => require(['./pages/mine/menu.vue'], resolve)
                  },
                  {
                    path:'info',
                    component: resolve => require(['./pages/mine/info.vue'], resolve)
                  },
                  {
                    path:'contacts',
                    component: resolve => require(['./pages/mine/contactList.vue'], resolve)
                  },
                  {
                    path:'contacts/:id',
                    component: resolve => require(['./pages/mine/contactDetail.vue'], resolve)
                  },
                  {
                    path:'publish',
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
            component: resolve => require(['./pages/entrance/index.vue'], resolve)
        },
        {
          path: '/comment/:column',
          name: 'comment',
          component: resolve => require(['./pages/comment/index.vue'], resolve)
        },
        {
          path: '/publish',
          component: resolve => require(['./pages/publish/index.vue'], resolve),
          redirect: '/publish/activity',
          children:[
            {
              path:'activity',
              component: resolve => require(['./pages/publish/publishActivity.vue'], resolve)
            },
            {
              path:'photo',
              component: resolve => require(['./pages/publish/publishPhoto.vue'], resolve)
            },
            {
              path:'interact',
              component: resolve => require(['./pages/publish/publishInteract.vue'], resolve)
            },
            {
              path:'interest',
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
    document.title = titleStr;
    next();
});

export default router;
