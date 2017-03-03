<template>
    <mt-popup
            v-model="show"
            position="bottom"
            popup-transition="popup-fade">
        <mt-picker :slots="slots" :showToolbar="true" :rotateEffect="true" @change="changePicker">
            <span></span><span @click="selectPicker">确定</span>
        </mt-picker>
    </mt-popup>
</template>
<script>
    export default {
        props:{
            dataArr:{
                type: Array,
                default(){
                    return []
                }
            },
            text:{
                type: String,
                default: ''
            },
            showPicker:{
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                selectText:''
            }
        },
        computed:{
            show :{
                set: function (val){
                    if(!val){
                        this.$emit('hide');
                    }
                },
                get: function (){
                    return this.showPicker;
                }
            },
            slots(){
                var dataList = this.dataArr;
                var defaultIndex = dataList.indexOf(this.text);
                defaultIndex = defaultIndex > -1 ? defaultIndex : 0;
                var initArr = [
                    {
                        flex:1,
                        values:dataList,
                        defaultIndex: defaultIndex,
                    }
                ];
                return initArr;
            }
        },
        methods:{
            selectPicker(){
                let str = this.selectText;
                if(!str){
                    let dataList = this.dataArr;
                    let defaultIndex = dataList.indexOf(this.text);
                    defaultIndex = defaultIndex > -1 ? defaultIndex : 0;
                    str = this.dataArr[defaultIndex];
                }
                this.$emit('selectEnd',str);
            },
            changePicker(picker,values){
                this.selectText = values[0];
            }
        }
    }
</script>