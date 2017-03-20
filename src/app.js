import 'babel-polyfill';
// import './util/overwrite';
import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
// import VueTouch from 'vue-touch'
import fastclick from 'fastclick'
import 'normalize.css';
import './assets/less/basic.less';
import App from './app.vue'
import components from './components'
import directives from './directives'
import filters from './filters'
sync(store, router)

Vue.use(components)
Vue.use(directives)
Vue.use(filters)
// Vue.use(VueTouch)
fastclick.attach(document.body)

const launch = new Vue({
  el: '#launch-view',
  data: {
    launching: true
  },
  created () {
    this.$on('launch-end', () => {
      setTimeout(() => {
        this.launching = false;
      }, 1500);
    });
  },
  methods: {
    onLaunchEnd () {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
});

new Vue({
  el: '#app',
  store,
  router,
  mounted () {
    launch.$emit('launch-end');
  },
  render: (h) => h(App)
});

