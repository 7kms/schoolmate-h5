<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        height: 221px;
        background-color: #fff;
    }
    .pic{
        height: 170px;
        background-size: cover;
        background-repeat:no-repeat;
        background-position:center;
    }
    .desc{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 51px;
        padding: 6px 12px;
    }
    .info{
        display: flex;
        justify-content: space-between;
        .location{
            flex: 1;
            .text{
                width: 90%;
            }
        }
    }
    .icon{
        width: 10px;
        height: 10px;
        background-size: contain;
        background-repeat:no-repeat;
        &.iconLocation{
             background-image: url('../../assets/images/icon-location.png');
         }
        &.iconTime{
            background-image: url('../../assets/images/icon-time.png');
        }
    }
</style>
<template>
    <div :class="$style.content" @click="click">
        <div :class="$style.pic" :style="{backgroundImage:'url('+ imageUrl(dataInfo.cover_file) +')'}"></div>
        <div :class="$style.desc">
            <h3 :class="[$style.title,'topic','one-line']">{{dataInfo.theme}}</h3>
            <div :class="$style.info">
                <div :class="[$style.location,'one-line']">
                    <i :class="['inline-block',$style.icon,$style.iconLocation]"></i>
                    <span :class="['inline-block','one-line',$style.text]">{{dataInfo.place}}</span>
                </div>
                <div class="color-weak">
                    <i :class="['inline-block',$style.icon,$style.iconTime]"></i>
                    <span class="inline-block">{{dataInfo.time | dateFormat('M月d日')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
    export default {
        props: {
            dataInfo: {
                type: Object,
                required: true
            }
        },
        methods:{
            click(){
                this.$emit('click',this.dataInfo);
            },
          imageUrl(str){
            return `${serverUrl}/${str}`;
          }
        }
    }
</script>