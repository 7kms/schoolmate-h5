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
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;
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
    <li :class="$style.content" @click="click">
        <div :class="$style.moments">
            <div :class="$style.portrait">
                <img :src="imageUrl(dataInfo.c_cover_file)" alt="" width="40px" height="40px">
            </div>
            <div :class="$style.desc">
                <div :class="$style.title">
                    <div>
                        <span class="topic">{{dataInfo.c_name}}</span><span>（<span class="color-hint">{{dataInfo.count}}</span>人）</span>
                    </div>
                    <div>
                        <span class="color-hint">待审核12人</span>
                    </div>
                </div>
                <div :class="$style.text">
                    {{dataInfo.c_description}}
                </div>
            </div>
        </div>
        <div :class="$style.imgContent" v-if="dataInfo.pictures.length > 0">
            <ImgContain v-for="img in dataInfo.pictures" :imgUrl="img" :class="$style.imgItem"></ImgContain>
        </div>
    </li>
</template>
<script>
  import {serverUrl} from '../../config'
  export default {
    props: {
      dataInfo: {
        type: Object,
        required: true
      }
    },
    methods:{
      click(){
        this.$emit('click',this.dataInfo);
      },
      imageUrl(str){
        return `${serverUrl}/${str}`;
      }
    }
  }
</script>