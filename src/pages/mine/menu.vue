<style lang="less" module>
    @import '../../assets/less/const.less';
    .header{
        height: 140px;
        padding-top: 24px;
        color: #fff;
        background-image: linear-gradient(-180deg, #56AEEA 0%, #81D2F8 98%);
        .pic{
            width: 60px;
            height: 60px;
            margin: 0 auto 15px;
        }
    }
    .list{
        background-color: #fff;
        .item{
            display: flex;
            align-items: center;
            height: 44px;
            line-height: 44px;
            padding-left: 12px;
            .text{
                display: flex;
                flex: 1;
                padding: 0 12px;
                align-items: center;
                border-bottom: 1px solid @line-color-split;
                .label{
                    flex: 1;
                }
            }
        }
    }
    .icon{
        display: block;
        width: 20px;
        height: 20px;
        background-size: contain;
        &.iconArrow{
            width: 12px;
            height: 12px;
            opacity: .6;
            background-image: url('../../assets/images/icon-arrow.png');
         }
        &.iconMsg{
             background-image: url('../../assets/images/icon-my-info.png');
         }
        &.iconCon{
             background-image: url('../../assets/images/icon-my-contacts.png');
         }
        &.iconPub{
             background-image: url('../../assets/images/icon-my-publish.png');
         }
        &.iconMom{
             background-image: url('../../assets/images/icon-my-moments.png');
         }
    }
    .dot{
        display: inline-block;
        position: relative;
        top: -6px;
        width: 8px;
        height: 8px;
        background-color: @hint-color;
        border-radius: 50%;
    }
</style>
<template>
    <div class="content">
        <div :class="$style.header">
            <div :class="$style.pic">
                <img :src="testUrl" alt="" width="60" height="60">
            </div>
            <div class="size-topic text-center">野兽骑行</div>
        </div>
        <ul :class="$style.list">
            <router-link :to="{path:'/mine/info'}" tag="li" :class="$style.item">
                <i :class="[$style.icon,$style.iconMsg]"></i>
                <div :class="$style.text">
                    <span :class="$style.label">我的信息</span>
                    <i :class="[$style.icon,$style.iconArrow]"></i>
                </div>
            </router-link>
            <router-link :class="$style.item" :to="{path:'/mine/contacts'}" tag="li">
                <i :class="[$style.icon,$style.iconCon]"></i>
                <div :class="$style.text">
                    <span :class="$style.label">通信录</span>
                    <i :class="[$style.icon,$style.iconArrow]"></i>
                </div>
            </router-link>
            <router-link :class="$style.item" :to="{path:'/mine/publish'}" tag="li">
                <i :class="[$style.icon,$style.iconPub]"></i>
                <div :class="$style.text">
                    <span :class="$style.label">我的发布<i :class="$style.dot"></i></span>
                    <i :class="[$style.icon,$style.iconArrow]"></i>
                </div>
            </router-link>
            <router-link :class="$style.item" :to="{path:'/mine/moments'}" tag="li">
                <i :class="[$style.icon,$style.iconMom]"></i>
                <div :class="$style.text">
                    <span :class="$style.label">我的圈子</span>
                    <i :class="[$style.icon,$style.iconArrow]"></i>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
  export default {
    components:{

    },
    data(){
      return {
        item: '',
        testUrl:require('../../assets/moke/0.3.1.png')
      }
    }
  }
</script>