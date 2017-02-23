<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        background-color: #fff;
        padding: 6px 0;
        & > div{
        padding: 0 12px;
            }
    }
    .desc{
        line-height: 1.4rem;
    }
    .imgContent{
        margin: 6px 0;
        display: flex;
        justify-content: space-between;
    }
    .imgItem{
        width: 80px;
        height: 80px;
    }
    .user{
        display: flex;
        padding-top: 6px !important;
        border-top: 1px solid @line-color-split;
        .name{
            margin-top: 6px;
        }
        .info{
            position: relative;
            margin-left: 11px;
            flex: 1;
            .label{
                margin-top: 0;
                display: flex;
                justify-content: space-between;
            }
            & > div{
                margin-top: 10px;
            }
            .infoBtn{
                position: absolute;
                right: 0;
                bottom: 3px;
                width: 80px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                color: @theme-color;
                border: 1px solid @theme-color;
            }
        }
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
        <div :class="$style.desc">
            <span v-if="true" class="color-theme size-topic">拥有资源：</span>
            <span v-else　class="color-hint size-topic">寻求合作：</span>
            测试中心范围包含，岩矿鉴定与分析、（水质、土壤）
            无机化分析、有机分析、土木测试等。竭诚为广大校友服务。
        </div>
        <div class="text-right">
            <time class="weak">2017/02/06</time>
        </div>
        <div :class="$style.imgContent">
            <ImgContain :imgUrl="testUrl" :class="$style.imgItem"></ImgContain>
            <ImgContain :imgUrl="testUrl" :class="$style.imgItem"></ImgContain>
            <ImgContain :imgUrl="testUrl" :class="$style.imgItem"></ImgContain>
            <ImgContain imgUrl="" :class="$style.imgItem"></ImgContain>
        </div>
        <div :class="$style.user">
            <div class="text-center">
                <img :src="testUrl" width="40" height="40">
                <div :class="[$style.name,'color-topic']">
                    王阳明
                </div>
            </div>
            <div :class="$style.info">
                <div :class="$style.label">
                    <div>
                        <span>2006级</span>
                        <span> | </span>
                        <span>翻译英语</span>
                    </div>
                    <div>
                        <i :class="['inline-block',$style.icon,$style.iconLocation]"></i>
                        <span class="inline-block">北京</span>
                    </div>
                </div>
                <div>
                    <span>多米亚文化有限公司</span>
                </div>
                <div>
                    <span>资深编导</span>
                </div>
                <span :class="$style.infoBtn">申请合作</span>
            </div>
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