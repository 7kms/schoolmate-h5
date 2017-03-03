<style lang="less" module>

</style>
<template>
    <mt-popup
            v-model="show"
            position="bottom"
            popup-transition="popup-fade">
        <mt-picker :slots="placeSlots" :showToolbar="true" :rotateEffect="true" @change="changePlace">
            <span></span><span @click="selectPlace">确定</span>
        </mt-picker>
    </mt-popup>
</template>
<script>
    import { placeObj } from '../../data';
    let provinceArr = Object.keys(placeObj);
    export default {
        props:{
            province:{
                type: String,
                default: '北京'
            },
            city:{
                type: String,
                default: '东城'
            },
            showPicker:{
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                info:{
                    province: '北京',
                    city: '东城'
                }
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
            placeSlots(){
                var provinceIndex = provinceArr.indexOf(this.province);
                provinceIndex = provinceIndex > -1 ? provinceIndex : 0;
                var cityArr = placeObj[provinceArr[provinceIndex]];
                var cityIndex = cityArr.indexOf(this.city);
                cityIndex = cityIndex > -1 ? cityIndex : 0;
                var initArr = [
                    {
                        flex: 1,
                        values: provinceArr,
                        defaultIndex: provinceIndex,
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '-'
                    },
                    {
                        flex: 1,
                        values: cityArr,
                        defaultIndex: cityIndex,
                        textAlign: 'center'
                    }
                ];
                return initArr;
            }
        },
        methods:{
            selectPlace(){
                this.$emit('selectEnd',Object.assign(this.info))
            },
            changePlace(picker,values){
              if(!values[0]){
                values[0] = Object.keys(placeObj)[0];
              }
              picker.setSlotValues(1, placeObj[values[0]]);



//                if(!values[0]){
//                    var provinceIndex = provinceArr.indexOf(this.province);
//                    provinceIndex = provinceIndex > -1 ? provinceIndex : 0;
//                    values[0] = provinceArr[provinceIndex];
//                }
//                if(!values[1]){
//                  values[1] = placeObj[values[0]][0];
//                }
//              picker.setSlotValues(1, placeObj[values[0]]);
//              this.info.province = values[0];
//              this.info.city = values[1];
            }
        }
    }
</script>