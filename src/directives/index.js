import { InfiniteScroll } from 'mint-ui';

const directiveObj = {
    InfiniteScroll
}

const install = function (Vue) {
     Object.keys(directiveObj).forEach((key) => {
        Vue.use(directiveObj[key]);
    });
}

module.exports = Object.assign({ install });
