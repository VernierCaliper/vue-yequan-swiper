<template>
  <section class="yq_content" @touchmove="fn">
    <div ref="swiperWrap" class="yq_swiper"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd">
      <slot/>
    </div>

    <div v-if="options.showPagenation" class="yq_pagenation">
      <div v-for="(item,$index) in slidesLength" class="yq_pagenation_item" flag
           v-bind:class="[options.index-1===$index?options.activeClass:'',options.notActiveClass]"
           >
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        slidesLength: 1,
        _width: 0,
        auto: true,
        slideing: true,
        timer1: '',
        className: '',
        dom: {},
        t: {
          sx: 0,
          s: 0,
          m: 0,
          e: 0
        },
      }
    },
    props: {
      options:{
        autoplay:true,
        duration:500,
        interval:2500,
        showPagenation:true,
        notActiveClass:'',
        activeClass:'yq_swiper_active',
        index:1,
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init:function (){
        setTimeout(() => {
          this.cloneDom();
          this.dom.transform = `translate3d(${this._width * -this.options.index}px, 0px, 0px)`;
          this.dom['-webkit-transform'] = `translate3d(${this._width * -this.options.index}px, 0px, 0px)`;
          this.dom['-ms-transform'] = `translate3d(${this._width * -this.options.index}px, 0px, 0px)`;
          if (this.options.autoplay) {
            this.setTime()
          }
        }, 100)
      },
      touchStart:function (e) {
        if (this.slideing) {
          this.clearTimeOut();
          this.t.sx = this.getTransform();
          this.t.s = e.touches[e.touches.length - 1].clientX
        }
      },
      touchMove:function (e) {
        if (this.slideing && this.t.s !== -1) {
          this.clearTimeOut();
          this.t.m = e.touches[e.touches.length - 1].clientX - this.t.s;
          this.setTransform(this.t.m + this.t.sx)
        }
      },
      touchEnd:function () {
        if (this.slideing && this.t.s !== -1) {
          this.clearTimeOut();
          this.setTransform(this.t.m + this.t.sx);
          var x = this.getTransform();
          x += this.t.m > 0 ? this._width * 0.3 : this._width * -0.3;
          this.options.index = Math.round(x / this._width) * -1;
          this.wh('touch')
        }
      },
      setTransform:function (num) {
        this.dom.transform = `translate3d(${num}px, 0px, 0px)`;
        this.dom['-webkit-transform'] = `translate3d(${num}px, 0px, 0px)`;
        this.dom['-ms-transform'] = `translate3d(${num}px, 0px, 0px)`
      },
      getTransform:function () {
        var x = this.dom.transform || this.dom['-webkit-transform'] || this.dom['-ms-transform'];
        x = x.substring(12);
        x = x.match(/(\S*)px/)[1];
        return Number(x)
      },
      fn(e) {
        e.preventDefault()
      },
      prevSlide:function () {
        this.clearTimeOut();
        this.options.index--;
        this.wh()
      },
      nextSlide:function () {
        this.clearTimeOut();
        this.options.index++;
        this.wh()
      },
      slideTo:function (index) {
        this.clearTimeOut();
        this.options.index = index + 1;
        this.wh()
      },
      wh:function (type) {
        this.slideing = false;
        this.dom.transition = type === 'touch' ? '250ms' : this.options.duration + 'ms';
        this.setTransform(this.options.index * -1 * this._width);
        this.t.m = 0;
        this.t.s = -1;
        if (this.options.autoplay) {
          this.setTime()
        }
        var timeDuration = type === 'touch' ? '250' : this.options.duration;
        setTimeout(() => {
          this.dom.transition = '0s';
          if (this.options.index >= this.slidesLength + 1) {
            this.options.index = 1;
            this.setTransform(this.options.index * -1 * this._width)
          }
          if (this.options.index <= 0) {
            this.options.index = this.slidesLength;
            this.setTransform(this.options.index * -1 * this._width)
          }
          this.$emit('transtionend', this.options.index - 1);
          this.auto = true;
          this.slideing = true
        }, timeDuration)
      },
      setTime:function () {
        this.timer1 = setTimeout(() => {
          if (this.auto) {
            this.options.index++;
            this.wh()
          } else {
            clearTimeout(this.timer1)
          }
        }, this.options.interval)
      },
      cloneDom:function () {
        var SlideDom = this.$refs.swiperWrap
        this.slidesLength = SlideDom.getElementsByClassName('yq_slide').length;
        if (this.slidesLength > 1) {
          var cloneDom1 = SlideDom.getElementsByClassName('yq_slide')[0].cloneNode(true);
          var cloneDom2 = SlideDom.getElementsByClassName('yq_slide')[this.slidesLength - 1].cloneNode(true);
          SlideDom.insertBefore(cloneDom2, SlideDom.getElementsByClassName('yq_slide')[0]);
          SlideDom.appendChild(cloneDom1);
          this._width = SlideDom.offsetWidth;
          this.dom = SlideDom.style
        }
      },
      clearTimeOut:function () {
        this.auto = false;
        clearTimeout(this.timer1)
      }
    }
  }
</script>

<style>
  .yq_content {
    position: relative;
    z-index: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .yq_swiper {
    width: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -moz-transition-duration: 0s;
    -webkit-transition-duration: 0s;
    -o-transition-duration: 0s;
    transition-duration: 0s;
  }
  .yq_pagenation {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    background: 0 0;
  }
  .yq_pagenation_item {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 1px 7px;
    cursor: pointer;
    border-radius: 100%;
    background: #eeeeee;
  }
  .yq_pagenation_item.yq_swiper_active {
    background: #0fc37c!important;
  }
</style>
