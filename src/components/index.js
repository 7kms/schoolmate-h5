import { Toast, Spinner, Switch, MessageBox, Popup, Picker, DatetimePicker, Checklist } from 'mint-ui';

import Loading from './loading';
import ImgContain from './imgContain';
import ImgLazy from './imgLazy';

const componentsObj = {
    Toast,
    Spinner,
    Switch,
    Popup,
    Picker,
    Checklist,
    DatetimePicker
};
const customComponent = {
    Loading,
    ImgContain,
    ImgLazy
};
const install = function (Vue) {
    Object.keys(componentsObj).forEach((val) => {
        Vue.component(componentsObj[val].name, componentsObj[val]);
    });
    Object.keys(customComponent).forEach((val) => {
        Vue.component(val, customComponent[val]);
    });
    Vue.prototype.$toast = Toast;
    Vue.prototype.$dialog = MessageBox;
};

module.exports = { install };
