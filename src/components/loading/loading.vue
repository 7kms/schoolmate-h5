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
        <span>加载中...</span>
    </div>
</template>