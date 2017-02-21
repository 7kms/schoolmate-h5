<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        display: flex;
        padding: 6px 0 12px;
        border-top: 1px solid @line-color-split;
    }
    .portrait{
        width: 60px;
        margin-right: 6px;
        .userText{
            margin-top: 6px;
        }
    }
    .desc{
        position: relative;
        flex: 1;
        .exchange{
            position: absolute;
            right: 12px;
            top: 6px;
            width: 80px;
            height: 24px;
            line-height: 24px;
            color: @theme-color;
            border: 1px solid @theme-color;
            &.gray{
                color: #fff;
                background-color: #C7CED2;
             }
        }
        & > div {
                margin-bottom: 11px;
            }
        .desText{
            line-height: 1.3rem;
        }
    }
</style>
<template>
    <li :class="$style.content">
        <div :class="[$style.portrait,'text-center']">
            <div :class="$style.pic">
                <img :src="dataInfo.photo" alt="" width="40" height="40">
            </div>
            <div :class="[$style.userText,'color-topic']">王阳明</div>
            <div :class="[$style.userText]" v-if="isAuthor">(发布者)</div>
        </div>
        <div :class="$style.desc">
            <span :class="[$style.exchange,'text-center']" v-if="true">交换联系方式</span>
            <span :class="[$style.exchange,$style.gray,'text-center']" v-else>撤销</span>
           <div>{{dataInfo.company}}</div>
           <div>{{dataInfo.department}}</div>
           <div>{{dataInfo.detail_job}}</div>
           <div :class="$style.desText">我的资源：<span>{{dataInfo.resource_description}}</span></div>
        </div>
    </li>
</template>
<script>
    export default{
      props:{
        isAuthor:Boolean,
        dataInfo:{
          type:Object,
          required: true
        }
      },
      data(){
        return {
          url: require('../../assets/moke/0.3.1.png')
        }
      }
    }
</script>
