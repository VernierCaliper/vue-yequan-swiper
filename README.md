# vue swiper
### 拥有多个可配置项，可灵活使用的vue轮播组件，使用touch事件，所以滑动仅支持手机端
## 安装
npm install vue-yequan-swiper --save

cnpm install vue-yequan-swiper --save //淘宝镜像

### 使用
 * 1.引用
 ```
 import {swiper,slide} from 'vue-yequan-swiper'
 ```
 * 2.使用
 > html
 ```
 <swiper :options="options">
     <slide v-for="(item,index) in list" :key="item.id"
            v-bind:style="{background:'url('+ item.img +') no-repeat center / cover'}">
     </slide>
 </swiper> //注：我个人习惯使用背景图片，也可以在slide之间写你自己的代码
 ```
 * 3.添加options
 > JavaScript
  ``` data () {
    return {
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
        ],
        options:{
            autoplay:true,//是否自动播放，默认true
            duration:500,//过度时长，单位ms,默认500
            interval:2000,//自动播放间隔时长，单位ms,默认2500
            showPagenation:true,//是否显示index dots,默认true
            notActiveClass:'',//index dots 的类名，默认使用的是yq_pagenation_item，可添加自己的类名，记得使用！important覆盖我的样式，但请注意style如果使用了scope,那么css样式不会生效，但class依然会添加
            activeClass:'yq_swiper_active',//index dots 当前的类名，默认yq_swiper_active
            index:1,//加载默认显示的第一张slide，默认1
        },
      }
      }
  ```
### 截图

![效果](https://s22.postimg.cc/58fehx4a9/20180623135356.png)

### 当然你也可以直接clone本项目，在本地运行查看
* 1.npm install //建议使用cnpm安装依赖
* 2.npm run dev
