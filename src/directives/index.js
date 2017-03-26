import { InfiniteScroll } from 'mint-ui';
import VueLazyload from 'vue-lazyload'
import transform from './transform';

const directiveObj = {
    InfiniteScroll,
    transform
};

const install = function (Vue) {
    Object.keys(directiveObj).forEach((key) => {
       Vue.use(directiveObj[key]);
    });
    Vue.use(VueLazyload,{
      preLoad: 1.3,
      attempt: 1,
      listenEvents: [ 'scroll' ]
    });
};

module.exports = Object.assign({ install });
