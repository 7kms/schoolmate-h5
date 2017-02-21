import { Toast, Spinner, MessageBox, Popup, Picker, DatetimePicker } from 'mint-ui';
import Loading from './loading';
import ImgContain from './imgContain';

const componentsObj = {
    Toast,
    Spinner,
    Popup,
    Picker,
    DatetimePicker
};
const customComponent = {
    Loading,
    ImgContain
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
