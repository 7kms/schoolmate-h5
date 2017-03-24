import Util from '../util';
let obj = {
    bind(el,binding,vNode){
        let str = binding.value;
        let html = Util.transformTextToHtml(str);
        el.innerHTML = html;
    }
};
export default {
    install(Vue){
        Vue.directive('transform',obj);
    }
}