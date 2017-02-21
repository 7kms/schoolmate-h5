<style lang="less" module>
    @import '../../assets/less/const.less';
    .info{
        margin-bottom: 6px;
        background-color: #fff;
    }

</style>
<template>
    <div :class="['list-content',$style.info,$style.attendedList]">
        <h3 class="item-header">报名名单</h3>
        <ul>
            <attendedItem :isAuthor="true"></attendedItem>
            <attendedItem></attendedItem>
            <attendedItem></attendedItem>
            <attendedItem></attendedItem>
            <attendedItem></attendedItem>
            <attendedItem></attendedItem>
            <attendedItem></attendedItem>
        </ul>
    </div>
</template>
<script>
    import attendedItem from './attendedItem.vue'
    export default {
        components:{
          attendedItem
        }
    }
</script>

