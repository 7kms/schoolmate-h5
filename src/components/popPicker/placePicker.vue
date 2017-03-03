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
                default: '天津市'
            },
            city:{
                type: String,
                default: '河西'
            },
            showPicker:{
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                info:{
                    province: '',
                    city: ''
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
                var obj;
                if(!this.info.province){
                    var provinceIndex = provinceArr.indexOf(this.province);
                    provinceIndex = provinceIndex > -1 ? provinceIndex : 0;
                    var cityArr = placeObj[provinceArr[provinceIndex]];
                    var cityIndex = cityArr.indexOf(this.info.city || this.city);
                    cityIndex = cityIndex > -1 ? cityIndex : 0;
                    obj = {province:provinceArr[provinceIndex],city:cityArr[cityIndex]}
                }else{
                    obj = Object.assign(this.info)
                }
                this.$emit('selectEnd',obj);
            },
            changePlace(picker,values){
                if(values[0]){
                    picker.setSlotValues(1, placeObj[values[0]]);
                }
                this.info.province = values[0];
                this.info.city = values[1];
            }
        }
    }
</script>