---
title: vue2-项目解决方案-mixins混入简化
date: 2021-06-25 16:20:00
top: true
tags:
categories:
- VUE
---
### 一、mixins混入简化

我们在开发中经常会遇到金钱保留两位小数，时间戳转换等操作。每次我们会写成一个公共函数，然后在页面里面的filters进行过滤。这种方法每次，但是感觉每次需要用到，都要写一遍在filters，也是比较烦呢！！！但是，我们猿类的极致追究就是懒呀，那这怎么能行~~~
<!--more-->
兄弟们，抄家伙！上```mixins```！！！

```js
import { u_fixed } from './tool'

const mixins = {    
    filters: {        
        // 保留两位小数        
        mixin_fixed2 (val) {            
            return u_fixed(val)        
        },
        // 数字转汉字，16000 => 1.60万        
        mixin_num2chinese (val) {            
            return val > 9999 ? u_fixed(val/10000) + '万' : val;        
    }    
}}
export default mixins
```

新建一个mixins.js，把我们需要混入的内容都写在里面，例如这里混入了filters，把常用的几个操作写在了里面，大家可以自行扩展。

这样的话，在我们需要的页面import这个js，然后声明一下混入就好，而后就可以像正常的方式去使用就好了。

![vueProject018.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject018.jpg)

例如，我现在可以直接在页面内使用我们的过滤操作

```
{{1000 | mixin_fixed2}}
```