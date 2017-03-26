<style lang="less" module>
    @import '../../assets/less/const.less';
    .wrap{
        position: fixed;
        right: 16px;
        bottom: @nav-height + 16;
        width: 55px;
        height: 55px;
        background-repeat: no-repeat;
        background-size: contain;
        color: #fff;
    }
    .pub{
        background-image: url("../../assets/images/icon-publish.png");
    }
    .feedback{
        background-image: url("../../assets/images/btn-feedback.png");
    }
    .text{
        margin-top: 28px;
    }
</style>
<template>
    <div :class="[$style.wrap,'text-center',{[$style.pub]:type=='pub',[$style.feedback]:type=='feedback'}]" @click="click">
        <span :class="[$style.text,'size-weak','inline-block']">{{text}}</span>
    </div>
</template>
<script>
    export default {
      props:{
        text:String,
        type:{
          type:String,
          default:'pub'
        }
      },
      methods:{
        click(){
          if(this.type=='feedback'){
            this.$router.push('/feedback');
          }else{
            this.$emit('click');
          }
        }
      }
    }
</script>