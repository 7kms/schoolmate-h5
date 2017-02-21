<style lang="less" module>
    @import '../../assets/less/const.less';
    .nav{
        position: relative;
    }
    .bg{
        width: 100%;
        max-height:200px;
    }
    .step{
        display: flex;
        position: absolute;
        left: 50%;
        top: 36px;
        justify-content: space-between;
        transform: translateX(-50%);
        width: 100%;
        max-width: 375px;
        padding: 0 31px;
        height: 34px;
        color: #fff;
    }
    .line{
        position: absolute;
        top: 6px;
        left: 80px;
        right: 80px;
        height: 2px;
        background-color: #fff;
        &.special{
         left: 75px;
         right: 75px;
        }
    }
    .item{
        flex: 1;
    }
    .circle{
        display: block;
        position: relative;
        z-index: 10;
        margin: 0 auto 6px;
        width: 14px;
        height: 14px;
        background-color: @theme-color;
        border: 2px solid #fff;
        border-radius: 50%;
    }
    .active{
        background-size: contain;
        background-image: url(../../assets/images/icon-dot.png);
    }
</style>
<template>
    <div :class="[$style.nav,'text-center']">
        <div :class="$style.step">
            <div :class="$style.item" v-for="nav in navArr">
                <span :class="[$style.circle,{[$style.active]:nav.active}]"></span>
                <span>{{nav.text}}</span>
            </div>
            <span :class="[$style.line,{[$style.special]:channel=='graduate'}]"></span>
        </div>
        <img :class="$style.bg" src="../../assets/images/bg-entrance.png">
    </div>
</template>
<script>
    import {mapGetters,mapState} from 'vuex'
  export default {
    computed:{
      ...mapState({
        channel: state => state.entrance.channel
      }),
      ...mapGetters({
        navArr:'entrance/GET_NAV'
      })
    }
  }
</script>