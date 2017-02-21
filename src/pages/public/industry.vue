<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-top: 12px;
        background-color: #fff;
    }
    .moments{
        display: flex;
        padding: 0 12px;
        align-items: center;
        .portrait{
            margin-right: 6px;
        }
    }
    .imgContent{
        display: flex;
        margin-top: 6px;
        justify-content: space-between;
    }
    .imgItem{
        width: 33%;
        height: 125px;
        flex: 1;
    }
</style>
<template>
    <div :class="$style.content" @click="click">
        <div :class="$style.moments">
            <div :class="$style.portrait">
                <img :src="testUrl" alt="" width="40px" height="40px">
            </div>
            <div>
                <span class="topic">设计圈</span><span>（<span class="color-hint">12</span>人）</span>
            </div>
        </div>
        <div :class="$style.imgContent">
            <ImgContain :imgUrl="testUrl" :class="$style.imgItem"></ImgContain>
            <ImgContain :imgUrl="testUrl" :class="$style.imgItem"></ImgContain>
            <ImgContain :imgUrl="testUrl" :class="$style.imgItem"></ImgContain>
        </div>
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
  export default {
    data(){
      return {
        testUrl:require('../../assets/moke/0.3.1.png')
      }
    },
    props: {
      dataInfo: {
        type: Object,
        required: true
      }
    },
    methods:{
      click(){
        this.$emit('click',this.dataInfo);
      }
    }
  }
</script>