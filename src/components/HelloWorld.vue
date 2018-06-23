<template>
  <div class="hello">
    <swiper :options="options">
      <slide v-for="(item,index) in list" :key="item.id"
             v-bind:style="{background:'url('+ item.img +') no-repeat center / cover'}">
      </slide>
    </swiper>
  </div>
</template>

<script>
  // import {swiper,slide} from 'vue-yequan-swiper'
  import {swiper,slide} from './index.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      options:{
        autoplay:false,
        duration:500,
        interval:2000,
        showPagenation:true,
        notActiveClass:'notActiveClass',
        activeClass:'active',
        index:1,
      },
      list:[
        {
          img:'/static/list1.jpg',
          id:1
        },
        {
          img:'/static/list2.jpg',
          id:2
        },
        {
          img:'/static/list3.jpg',
          id:3
        }
      ]
    }
  },
  mounted:function () {

  },
  components:{
    swiper,slide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello{
  height: 280px;
}
  .notActiveClass{
    background: #eeeeee!important;
  }
  .active{
    background: #0fc37c!important;
  }
</style>
