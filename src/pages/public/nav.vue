<style lang="less" module>
    @import '../../assets/less/const.less';
    .nav{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: @nav-height;
        display: flex;
        flex-direction: row;
        font-size: @font-size-weak;
        background-color: #fff;
    }
    .item{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        &.active{
            color:@theme-color;
        }
    }
    .icon{
        display: block;
        width: 20px;
        height: 20px;
    }
</style>
<template>
    <nav :class="[$style.nav]">
        <router-link :class="[$style.item,{[$style.active]:navHighlight(nav)}]" v-for="(nav,index) in list" :key="index" tag="div" :to="nav.path">
            <span :class="$style.icon">
                <img :src="navHighlight(nav) ? nav.activeIcon : nav.icon" width="20" height="20" alt="icon">
            </span>
            <span>{{nav.title}}</span>
        </router-link>
    </nav>
</template>
<script>
    export default {
        props:{
            list: {
                type: Array,
                default: []
            }
        },
        methods: {
          generateImage (nav){
            if(~this.$route.path.indexOf(nav.path)){
              return nav.activeIcon;
            }
            return nav.icon;
          },
          navHighlight({alias,path}){
            if(alias && this.$route.path == alias){
              return true;
            }
            return ~this.$route.path.indexOf(path)
          }
        }
    }
</script>