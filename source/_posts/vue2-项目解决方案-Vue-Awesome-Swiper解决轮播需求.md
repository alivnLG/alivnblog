---
title: vue2-项目解决方案-Vue-Awesome-Swiper解决轮播需求
date: 2021-06-25 16:17:21
top: true
tags:
categories:
- VUE
---
### 一、Vue-Awesome-Swiper解决轮播需求

在我们使用的很多ui库（vant、antiUi、elementUi等）中，都有轮播组件，对于普通的轮播效果足够了。但是，某些时候，我们的轮播效果可能比较炫，这时候ui库中的轮播可能就有些力不从心了。当然，如果技术和时间上都还可以的话，可以自己造个比较炫的轮子。

这里我说一下vue-awesome-swiper这个轮播组件，真的非常强大，基本可以满足我们的轮播需求。swiper相信很多人都用过，很好用，也很方便我们二次开发，定制我们需要的轮播效果。vue-awesome-swiper组件实质上基于swiper的，或者说就是能在vue中跑的swiper。下面说下怎么使用：

- 安装 cnpm install vue-awesome-swiper --save
- 在组件中使用的方法，全局使用意义不大：

```
// 引入组件
import 'swiper/dist/css/swiper.css' 
import { swiper, swiperSlide } from 'vue-awesome-swiper'

// 在components中注册组件
components: {
    swiper,
    swiperSlide
}

// template中使用轮播
// ref是当前轮播
// callback是回调
// 更多参数用法，请参考文档
<swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">            
    <!-- slides -->            
    <swiper-slide><div class="item">1</div></swiper-slide>            
    <swiper-slide><div class="item">2</div></swiper-slide>            
    <swiper-slide><div class="item">3</div></swiper-slide>            
          
    <!-- Optional controls -->            
    <div class="swiper-pagination"  slot="pagination"></div>            
    <div class="swiper-button-prev" slot="button-prev"></div>            
    <div class="swiper-button-next" slot="button-next"></div>            
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
</swiper>
```

```js
// 参数要写在data中
data() {            
    return {     
        // swiper轮播的参数           
        swiperOption: { 
            // 滚动条                   
            scrollbar: {                        
                el: '.swiper-scrollbar',                    
            }, 
            // 上一张，下一张                   
            navigation: {                        
                nextEl: '.swiper-button-next',                        
                prevEl: '.swiper-button-prev',                    
            },
            // 其他参数…………   
        }            
    }                    
},
```

swiper需要配置哪些功能需求，自己根据文档进行增加或者删减。附上文档：npm文档，swiper3.0/4.0文档，更多用法，请参考文档说明。