<style lang="less" module>
    @import '../../assets/less/const.less';
    .wrap{
        position: fixed;
        right: 16px;
        bottom: @nav-height + 16;
        width: 55px;
        height: 55px;
        background: url("../../assets/images/icon-publish.png") no-repeat;
        background-size: contain;
        color: #fff;
    }
    .text{
        margin-top: 28px;
    }
</style>
<template>
    <div :class="[$style.wrap,'text-center']" @click="click">
        <span :class="[$style.text,'size-weak','inline-block']">{{text}}</span>
    </div>
</template>
<script>
    export default {
      props:{
        text:String,
        required: true
      },
      methods:{
        click(){
          this.$emit('click');
        }
      }
    }
</script>