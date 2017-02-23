<template>
    <!-- Swiper -->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="swiper-zoom-container">
                    <img src="http://lorempixel.com/800/800/sports/1">
                </div>
            </div>
            <div class="swiper-slide">
                <div class="swiper-zoom-container">
                    <img src="http://lorempixel.com/800/400/sports/2">
                </div>
            </div>
            <div class="swiper-slide">
                <div class="swiper-zoom-container">
                    <img src="http://lorempixel.com/400/800/sports/3">
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
  import Swiper from  './swiper.min'
  import
  var browser = typeof window !== 'undefined';
  if (browser) {
    window.Swiper = require('swiper')
    require('swiper/dist/css/swiper.css')
  }
    export default {
      props:{
        options:{
          type: Object,
          default() {
            return {}
          }
        }
      },
      mounted(){

      }
    }
</script>