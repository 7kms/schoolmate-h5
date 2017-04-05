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
        padding: 0 12px;
    }
    .imgItem{
        width: 80px;
        height: 80px;
        margin-right: ~"calc(25% - 80px)";
        background-size: cover;
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
        <div :class="$style.imgContent" v-if="imgArr.length > 0">
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
          let arr = this.dataInfo.pictures;
          if(arr.length > 0){
              arr.length = 4;
          }
          console.log(arr.length);
        return arr;
      }
    },
    methods:{
    }
  }
</script>