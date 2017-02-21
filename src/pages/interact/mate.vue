<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        background-color: #fff;
        padding: 12px 0 12px 12px;
    }
    .user{
        position: relative;
        padding-right: 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid @line-color-split;
        .info{
            display: flex;
            .portrait{
                width: 40px;
            }
            .text{
                flex: 1;
                display: flex;
                margin-left: 12px;
                justify-content: space-between;
            }
            .text1{
                height: 40px;
                flex-direction: column;
                padding: 2px 0;
            }
        }
        .info2{
            margin-top: 6px;
        }
        .infoBtn{
            position: absolute;
            width: 80px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            right: 12px;
            top: 0;
            color: @theme-color;
            border: 1px solid @theme-color;
            &.exchanged{
                color: #fff;
                background-color: @font-color-weak;
                 border: none;
             }
        }
    }
    .desc{
        padding: 6px 12px 0 0;
        line-height: 1.4rem;
    }
    .icon{
        width: 12px;
        height: 12px;
        background-size: contain;
        background-repeat:no-repeat;
        &.iconLocation{
             background-image: url('../../assets/images/icon-location.png');
         }
    }

</style>
<template>
    <div :class="$style.content" @click="click">
        <div :class="$style.user">
            <span :class="[$style.infoBtn,{[$style.exchanged]:true}]">撤销</span>
            <div :class="$style.info">
                <div :class="$style.portrait">
                    <img :src="testUrl" width="40" height="40">
                </div>
                <div :class="[$style.text,$style.text1]">
                    <div>
                        <span>2008级</span><span> | </span><span>土木工程</span>
                    </div>
                    <div>
                        <span>小桔科技有限公司</span>
                    </div>
                </div>
            </div>
            <div :class="[$style.info,$style.info2]">
                <div :class="$style.portrait">
                    <span class="color-topic">王阳明</span>
                </div>
                <div :class="$style.text">
                    <div>开发总监</div>
                    <div>
                        <i :class="['inline-block',$style.icon,$style.iconLocation]"></i>
                        <span class="inline-block">北京</span>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.desc">
            <span class="color-topic">岗位描述:</span>
            测试中心范围包含，岩矿鉴定与分析、（水质、土壤）
            无机化分析、有机分析、土木测试等。竭诚为广大校友服务。
        </div>
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
  export default {
    data(){
      return {
        testUrl:require('../../assets/moke/0.3.1.png')
      }
    },
    props: {
      dataInfo: {
        type: Object,
        required: true
      }
    },
    methods:{
      click(){
        this.$emit('click',this.dataInfo);
      }
    }
  }
</script>