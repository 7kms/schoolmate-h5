<template>
    <mt-datetime-picker
        :ref="pickerRef"
        :type="pickerType"
        :startDate="start"
        :endDate="end"
        cancelText="关闭"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        v-model="currentDate"
        @confirm="handleConfirm"
    >
    </mt-datetime-picker>
</template>
<script>
    import util from  '../../util'
    export default {
        props:{
            showPicker:{
                type: Boolean,
                default: false
            },
            initDate: String,
            pickerType:{
                type: String,
                default: 'date'
            },
            pickerRef:{
                type: String,
                default: 'dateTimePicker'
            },
            startDate: String,
            endDate: String
        },
        computed:{
            currentDate: {
                get:function(){
                   return this.initDate;
                }
            },
            start(){
                if(this.startDate){
                    return new Date(this.startDate);
                }else{
                    return  new Date(Date.now() - 86400000 * 365 * 80);
                }

            },
            end(){
                if(this.endDate){
                    return new Date(this.endDate);
                }else{
                    return  new Date(Date.now() + 86400000 * 365 * 10);
                }

            }
        },
        watch:{
            showPicker(val){
                if(val){
                    this.$refs[this.pickerRef].open();
                }else{
                    this.$refs[this.pickerRef].close();
                }
            }
        },
        methods:{
            handleConfirm(val){
                let result;
                if(this.pickerType == 'date'){
                    result = util.dateFormat(val,'yyyy/MM/dd');
                }else{
                    result = val;
                }
                this.$emit('selectEnd', result);
            }
        }
    }
</script>