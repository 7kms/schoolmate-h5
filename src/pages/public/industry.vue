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
    <div :class="$style.content">
        <div :class="$style.moments">
            <div :class="$style.portrait">
                <imgContain :imgUrl="dataInfo.c_cover_file" :onlyImage="true" style="width:40px ;height:40px"></imgContain>
            </div>
            <div>
                <span class="topic">{{ dataInfo.c_name }}</span><span>（<span class="color-hint">{{ dataInfo.count }}</span>人）</span>
            </div>
        </div>
        <div :class="$style.imgContent">
            <ImgContain :imgUrl="img" :class="$style.imgItem" v-for="img in imgArr"></ImgContain>
        </div>
    </div>
</template>
<script>
  export default {
    props: {
      dataInfo: {
        type: Object,
        required: true
      }
    },
    computed:{
      imgArr(){
        var arr = this.dataInfo.pictures || [];
        arr.length = 3;
        return arr;
      }
    },
    methods:{
    }
  }
</script>