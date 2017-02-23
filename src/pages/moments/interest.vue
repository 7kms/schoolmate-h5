<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-top: 12px;
        background-color: #fff;
    }
    .moments{
        display: flex;
        padding: 0 12px;
        .desc{
            margin-left: 12px;
            .text{
                margin-top: 6px;
                line-height: 1.4rem;
            }
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
            <div :class="$style.desc">
                <div>
                    <span class="topic">登山队</span><span>（<span class="color-hint">12</span>人）</span>
                </div>
                <div :class="$style.text">
                    T登山队是一群爱好登山的朋友组成的圈子，享受山野，欢迎相同爱好的朋友加入。
                </div>
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