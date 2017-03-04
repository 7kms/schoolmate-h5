<template>
    <mt-popup
            v-model="show"
            position="bottom"
            popup-transition="popup-fade">
        <template v-if="!valueKey">
            <mt-picker :slots="slots"
                       :showToolbar="true"
                       :rotateEffect="true"
                       @change="changePicker">
                <span></span><span @click="selectPicker">确定</span>
            </mt-picker>
        </template>
        <template v-else>
            <mt-picker :slots="slots"
                       :valueKey="valueKey"
                       :showToolbar="true"
                       :rotateEffect="true"
                       @change="changePicker">
                <span></span><span @click="selectPicker">确定</span>
            </mt-picker>
        </template>

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
            valueKey: String,
            initValue:{
                type: String,
                default: ''
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
                selectValue:''
            }
        },
        computed:{
            defaultIndex(){
              let dataList = this.dataArr,defaultIndex;
              if(!this.valueKey){
                defaultIndex = dataList.indexOf(this.text);
              }else {
                dataList.forEach((obj,index)=>{
                  if(obj.value == this.initValue){
                    defaultIndex = index;
                  }
                })
              }
              defaultIndex = defaultIndex > -1 ? defaultIndex : 0;
              return defaultIndex;
            },
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
              let initArr = [
                {
                  flex: 1,
                  values: this.dataArr,
                  defaultIndex: this.defaultIndex,
                }
              ];
              return initArr;
            }
        },
        methods:{
            selectPicker(){
                let val = this.selectValue;
                if(!val){
                    val = this.dataArr[this.defaultIndex];
                }
                this.$emit('selectEnd',val);
            },
            changePicker(picker,values){
                this.selectValue = values[0];
            }
        }
    }
</script>