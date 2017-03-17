<style lang="less" module>
    .swiperContent{
        position: fixed !important;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        z-index: 1000 !important;
    }
</style>
<template>
    <!-- Swiper -->
    <div :class="['swiper-container',$style.swiperContent]">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="img in imageArr" @click="cancel">
                <div class="swiper-zoom-container">
                    <img :src="postUrl(img)">
                </div>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-white"></div>
        <!-- Add Navigation -->
        <!--<div class="swiper-button-prev"></div>-->
        <!--<div class="swiper-button-next"></div>-->
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
  var browser = typeof window !== 'undefined';
  if (browser) {
    window.Swiper = require('swiper');
    require('swiper/dist/css/swiper.css')
  }
    export default {
      props:{
        imageArr:{
          type: Array,
          default(){
              return []
          }
        },
        initialSlide: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
            visible: false
        };
      },
      methods:{
        postUrl(url){
          if(url && url.indexOf('/')==0){
            return url;
          }else if(url){
            return `${serverUrl}/../${url}`;
          }
        },
        cancel(){
          this.swiper && this.swiper.destroy();
          this.close && this.close();
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this.swiper = new Swiper(this.$el, {
            zoom:true,
            pagination: '.swiper-pagination',
            initialSlide: this.initialSlide
          });
        });
      },
      updated(){
        this.swiper.update();
        this.swiper.slideTo(this.initialSlide,false);
      }
    }
</script>