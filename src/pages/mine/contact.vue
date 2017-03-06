<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        position: relative;
        display: flex;
        margin:0 6px;
        padding: 6px 0 12px;
        border-top: 1px solid @line-color-split;
    }
    .portrait{
        margin-right: 6px;
        .userText{
            margin-top: 6px;
        }
    }
    .desc{
        position: relative;
        flex: 1;
        .text{
            &:first-child{
                margin-top: 2px;
             }
            margin-bottom: 10px;
        }
    }
    .desText{
        margin-top: 10px;
        line-height: 1.3rem;
    }
    .operate{
        position: absolute;
        right: 0;
        top: 0;
        span{
            width: 57px;
            height: 24px;
            line-height: 24px;
            margin-left: 6px;
        }
        .reject{
            color: @font-color-topic;
            background-color: @font-color-weak;
        }
        .agree{
            color: #fff;
            background-color: @theme-color;
        }
    }
    .iconArrow{
        position: absolute;
        top: 50%;
        right: 0;
        width: 12px;
        height: 12px;
        margin-top: -6px;
        opacity: .6;
        background-size: contain;
        background-image: url('../../assets/images/icon-arrow.png');
    }
</style>
<template>
    <li :class="$style.content" @click="click">
        <div :class="[$style.portrait,'text-center']">
            <div :class="$style.pic">
                <img :src="dataInfo.photo" alt="" width="40" height="40">
            </div>
            <div :class="[$style.userText,'color-topic']">{{dataInfo.name}}</div>
        </div>
        <div :class="$style.desc">
            <div :class="$style.text">{{dataInfo.company || '公司未填写'}}</div>
            <div :class="$style.text">{{dataInfo.department || '部门未填写'}}</div>
            <div>{{dataInfo.detail_job || '职位未填写'}}</div>
            <div :class="$style.desText">我的资源：<span>{{dataInfo.resource_description}}</span></div>
            <div :class="[$style.operate,'text-center']">
                <span :class="[$style.reject,'inline-block']">拒绝</span>
                <span :class="[$style.agree,'inline-block']">同意</span>
            </div>
        </div>
        <i :class="$style.iconArrow"></i>
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
        type: Object,
        require: true
      }
    },
    methods:{
        click(){
          this.$emit('click',this.dataInfo);
        }
    }
  }
</script>
