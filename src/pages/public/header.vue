<style lang="less" module>
    @import '../../assets/less/const.less';
    .header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        display: flex;
        font-size: @font-size-header;
        flex-direction: row;
        height: @header-height;
        line-height: @header-height;
        border-bottom: 1px solid @line-color-split;
        background-color: #fff;
    }
    .item{
        flex: 1;
        display: flex;
        justify-content: center;
        span{
            padding: 0 5px;
            border-bottom: 2px solid transparent;
        }
        &.active {
            color: @theme-color;
            span{
                border-bottom-color: @theme-color;
            }
        }
    }
</style>
<template>
    <header :class="[$style.header,'text-center']">
        <router-link :class="[$style.item,{[$style.active]:isActive(tab.name)}]" v-for="(tab,index) in tabList" tag="div" :to="tab.path" :key="index">
            <span>{{tab.title}}</span>
        </router-link>
    </header>
</template>
<script>
    export default{
        props:{
            tabList: {
                type: Array,
                default: []
            }
        },
        methods:{
            isActive(name){
                return this.$route.name == name;
            }
        }
    }
</script>