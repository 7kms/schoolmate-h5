<style lang="less" module>
    @import '../../assets/less/const.less';
    .header{
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;
        height: 30px;
        line-height: 30px;
        background-color: #fff;
        border-bottom: 1px solid @line-color-split;
        .item{
            flex: 1;
        }
        .active{
            color: @theme-color;
        }
    }
    .content{
        padding-top: 30px;
    }
</style>
<template>
    <div :class="$style.content">
        <div :class="[$style.header,'text-center','size-topic']">
            <div :class="[$style.item,{[$style.active]:currentItem=='interact'}]" @click="switchNav('interact')">需求</div>
            <div :class="[$style.item,{[$style.active]:currentItem=='attend'}]" @click="switchNav('attend')">报名</div>
            <div :class="[$style.item,{[$style.active]:currentItem=='photo'}]" @click="switchNav('photo')">照片</div>
            <div :class="[$style.item,{[$style.active]:currentItem=='activity'}]" @click="switchNav('activity')">活动</div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
      computed:{
        currentItem(){
          return this.$route.params.column || 'interact';
        }
      },
      methods:{
        switchNav(column){
          this.$router.replace(`/mine/publish/${column}`)
        }
      }
    }
</script>