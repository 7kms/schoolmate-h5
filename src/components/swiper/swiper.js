import Vue from 'vue';
import swiper from './swiper.vue'
const SwiperConstructor = Vue.extend(swiper);

let pool = [];

let getAnInstance = () => {
  if (pool.length > 0) {
	let instance = pool[0];
	pool.splice(0, 1);
	return instance;
  }
  return new SwiperConstructor({
	el: document.createElement('div')
  });
};

let Swiper = (options) => {
  let instance = getAnInstance();
  instance.imageArr = options || [
  	'http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/kennedy_meadows_0.jpg',
	'http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/yosemite_national_park_0.jpg',
	'http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/mount_rainier.jpg'
  ];
  document.body.appendChild(instance.$el);
  
  Vue.nextTick(function() {
	instance.visible = true;
  });
  return instance;
};

export default Swiper;
