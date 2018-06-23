import swiper from './swiper'
import slide from './slide'
export default {
  install:function (Vue,options) {
    Vue.prototype.$toast = function (options) {
      alert(options)
    }
  }
}
export {
  swiper,slide
}


