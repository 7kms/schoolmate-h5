import Vue from 'vue';
import swiper from './swiper.vue'
const SwiperConstructor = Vue.extend(swiper);
SwiperConstructor.prototype.close = function(){
  document.body.removeChild(this.$el);
  this.$destroy();
};
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

let Swiper = ({imageArr,currentIndex}) => {
  let instance = getAnInstance();
  imageArr.map(url=>{
    instance.imageArr.push(url);
  });
  instance.initialSlide = currentIndex;
  document.body.appendChild(instance.$el);
  
  Vue.nextTick(function() {
	  instance.visible = true;
  });
  return instance;
};

export default Swiper;
