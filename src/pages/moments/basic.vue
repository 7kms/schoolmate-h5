<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-bottom: @header-height;
    }
    .item{
        margin-top: 6px;
        padding: 6px 12px;
        background-color: #fff;
        .bar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }
    }
    .user{
        position: relative;
        padding-right: 12px;
        padding-bottom: 6px;
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
    }
    .title{
        border-left: 2px solid @font-color-topic;
        padding-left: 6px;
    }
    .icon{;
        background-size: contain;
        background-repeat:no-repeat;
        &.iconMember{
            width: 20px;
            height: 20px;
            background-image: url('../../assets/images/icon-member.png');
         }
         &.iconArrow{
              width: 12px;
              height: 12px;
              background-image: url('../../assets/images/icon-arrow.png');
          }
    }
    .desc{
        line-height: 1.4rem;
    }
    .tagContent{
        color:@theme-color;
        .tag{
            height: 24px;
            margin-bottom: 6px;
            line-height: 24px;
            padding: 0 12px;
            border: 1px solid @theme-color;
            border-radius: 15px;
        }
    }
    .memberContent{

        &::after{
        content: '';
        display: block;
        height: 0;  clear:both;
         }
        .member{
            float: left;
            width: 40px;
            overflow: hidden;
            margin-bottom: 12px;
            margin-right: ~"calc((100% - 200px)/4)";
            &:nth-child(5n){
                margin-right: 0;
            }
            .img{
                margin-bottom: 6px;
            }
        }
    }
    .join{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height:  @header-height;
        line-height:  @header-height;
        background-color: @theme-color;
        color:#fff
    }
    .quit{
        width: 164px;
        height: 32px;
        margin: 12px auto;
        line-height: 32px;
        border-radius: 16px;
        color: #fff;
        background-color: @theme-color;
    }
</style>
<template>
    <div :class="$style.content">
        <ul>
            <li :class="$style.item">
                <div :class="$style.bar">
                    <span :class="[$style.title,'color-topic','inline-block']">我的信息</span>
                    <span class="inline-block">
                        <i :class="['inline-block',$style.icon,$style.iconMember]"></i><span class="inline-block color-hint">成员</span>
                    </span>
                </div>
                <div :class="$style.user">
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
                        </div>
                    </div>
                </div>
            </li>
            <li :class="$style.item">
                <div :class="$style.bar">
                    <span :class="[$style.title,'color-topic','inline-block']">圈子介绍</span>
                </div>
                <div :class="$style.desc">
                    骑行圈是专业的自行车运动交流平台,提供前沿骑行资讯,权威骑行
                    装备信息,参与和组织户外骑行活动的平台,分享和交流户外骑行经
                    验的社区,结识和维护车友关系的圈子。
                </div>
            </li>
            <li :class="$style.item">
                <div :class="$style.bar">
                    <span :class="[$style.title,'color-topic','inline-block']">标签</span>
                </div>
                <div :class="$style.tagContent">
                    <span :class="[$style.tag,'inline-block']">酷炫</span>
                    <span :class="[$style.tag,'inline-block']">热骑行情</span>
                    <span :class="[$style.tag,'inline-block']">骑行</span>
                    <span :class="[$style.tag,'inline-block']">骑骑行骑行行</span>
                    <span :class="[$style.tag,'inline-block']">骑骑行骑行行</span>
                    <span :class="[$style.tag,'inline-block']">骑骑行骑行行</span>
                </div>
            </li>
            <li :class="$style.item" @click="goMemberList">
                <div :class="$style.bar">
                    <span :class="[$style.title,'color-topic','inline-block']">成员</span>
                    <span style="flex:1">（加入圈子可交换联系方式）</span>
                    <i :class="[$style.icon,$style.iconArrow,'inline-block']"></i>
                </div>
                <div :class="$style.memberContent">
                    <div :class="$style.member">
                        <div :class="$style.img">
                            <img :src="testUrl" alt="" width="40" height="40">
                        </div>
                        <div class="one-line">name01</div>
                    </div>
                    <div :class="$style.member">
                        <div :class="$style.img">
                            <img :src="testUrl" alt="" width="40" height="40">
                        </div>
                        <div class="one-line">name01</div>
                    </div>
                    <div :class="$style.member">
                        <div :class="$style.img">
                            <img :src="testUrl" alt="" width="40" height="40">
                        </div>
                        <div class="one-line">name01</div>
                    </div>
                    <div :class="$style.member">
                        <div :class="$style.img">
                            <img :src="testUrl" alt="" width="40" height="40">
                        </div>
                        <div class="one-line">name01</div>
                    </div>
                    <div :class="$style.member">
                        <div :class="$style.img">
                            <img :src="testUrl" alt="" width="40" height="40">
                        </div>
                        <div class="one-line">name01</div>
                    </div>
                    <div :class="$style.member">
                        <div :class="$style.img">
                            <img :src="testUrl" alt="" width="40" height="40">
                        </div>
                        <div class="one-line">name01</div>
                    </div>
                    <div :class="$style.member">
                        <div :class="$style.img">
                            <img :src="testUrl" alt="" width="40" height="40">
                        </div>
                        <div class="one-line">name01</div>
                    </div>

                </div>
            </li>
        </ul>
        <div :class="[$style.join,'text-center']">
            <span class="size-header">申请加入</span>
        </div>
        <div :class="[$style.quit,'text-center','size-header']">
            <span>退出圈子</span>
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
      goMemberList(){
        var id = this.$route.params.id;
        this.$router.push(`/moments/interest/${id}/member`);
      }
    }
  }
</script>