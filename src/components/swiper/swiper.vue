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
            <div class="swiper-slide" v-for="img in imageArr">
                <div class="swiper-zoom-container">
                    <img :src="img">
                </div>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-white"></div>
        <!-- Add Navigation -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
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
        }
      },
      data() {
        return {
            visible: false
        };
      },
      mounted(){
          var self = this;
          var mount = function () {
              self.swiper = new Swiper(self.$el, {zoom:true,pagination: '.swiper-pagination'})
          };
          this.$nextTick(mount);
      }
    }
</script>