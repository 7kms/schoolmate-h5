import Vue from 'vue';
import PayApply from './payApply.vue';


function generateDom () {
    let div = document.createElement('div');
    div.innerHTML = `
        <pay-apply :money="money"  @ok="ok" @cancel="cancel"></pay-apply>
    `;
    div = document.body.appendChild(div);
    return div;
}

let instance = properties => {
    new Vue({
        el: generateDom(),
        data: {
           money: properties.money
        },
        components: { PayApply },
        methods: {
            ok () {
                properties.ok && properties.ok();
                this.remove();
            },
            cancel () {
                properties.cancel && properties.cancel();
                this.remove();
            },
            remove () {
                this.$destroy();
                document.body.removeChild(this.$el);
            }
        }
    });
};
export default instance