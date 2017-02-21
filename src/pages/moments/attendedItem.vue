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
            <div :class="[$style.userText,'color-topic']">{{dataInfo.name}}</div>
            <div :class="[$style.userText]" v-if="isAuthor">(发布者)</div>
        </div>
        <div :class="$style.desc">
           <span :class="[$style.exchange,'text-center']" v-if="true">交换联系方式</span>
           <span :class="[$style.exchange,$style.gray,'text-center']" v-else>撤销</span>
           <div>{{dataInfo.company || '公司未填写'}}</div>
           <div>{{dataInfo.department || '部门未填写'}}</div>
           <div>{{dataInfo.detail_job || '职位未填写'}}</div>
           <div :class="$style.desText">我的资源：<span>{{dataInfo.resource_description}}</span></div>
        </div>
    </li>
</template>
<script>
    export default{
      props:{
        isAuthor:{
          type:Boolean,
          default: false
        },
        dataInfo:{
          type:Object,
          default() {
            return {
              photo:require('../../assets/moke/0.3.1.png'),
              name:'王阳明',
              company:'百度金融',
              department:'',
              detail_job:'',
              resource_description:'优秀的开发团队，成熟的技术，高级算法，系统架构等多种资源提供。'
            }
          }
        }
      }
    }
</script>
