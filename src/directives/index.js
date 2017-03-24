import { InfiniteScroll } from 'mint-ui';
import transform from './transform'

const directiveObj = {
    InfiniteScroll,
    transform
};

const install = function (Vue) {
     Object.keys(directiveObj).forEach((key) => {
        Vue.use(directiveObj[key]);
    });
};

module.exports = Object.assign({ install });
