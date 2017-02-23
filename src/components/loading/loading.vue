<style lang="less" module>
    .loadingBar{
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
<template>
    <div :class="$style.loadingBar">
        <mt-spinner type="snake"></mt-spinner>
        <span>{{text}}</span>
    </div>
</template>
<script>
    export default {
        props:{
            text:{
                type: String,
                default: '加载中...'
            }
        }
    }
</script>