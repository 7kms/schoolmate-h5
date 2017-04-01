import Vue from 'vue';
import PayCancel from './payCancel.vue';


function generateDom () {
    let div = document.createElement('div');
    div.innerHTML = `
        <Pay-Cancel  @ok="ok" @cancel="cancel"></Pay-Cancel>
    `;
    div = document.body.appendChild(div);
    return div;
}

let instance = properties => {
    new Vue({
        el: generateDom(),
        data: {
            visible: false,
            user: {},
            position: {}
        },
        components: { PayCancel },
        methods: {
            ok(){
                properties.ok && properties.ok();
                this.remove();
            },
            cancel(){
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