<style lang="less" module>
    .img{
        background-size: cover;
        background-repeat:no-repeat;
        background-position:center;
    }
</style>
<template>
    <img :src="postUrl(imgUrl)" v-if="onlyImage">
    <div :class="$style.img" :style="postStyle(imgUrl)" v-else>
        <slot></slot>
    </div>
</template>
<script>
  import {server} from '../../config'
    export default {
        props:{
          imgUrl:String,
          onlyImage: Boolean
        },
        methods:{
          postUrl(url){
            if(url && url.indexOf('http') != 0){
              url = `${server}/${url}`;
            }
            return url;
          },
          postStyle(url){
            var styleObj = {};
            if(url && url.indexOf('http')==0){
              styleObj.backgroundImage = `url(${url})`;
            }else if(url){
              styleObj.backgroundImage = `url(${server}/${url})`;
            }
            return styleObj;
          }
        }
    }
</script>