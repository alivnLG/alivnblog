---
title: vue2-项目解决方案-CSS的coped私有作用域和深度选择器
date: 2021-06-25 16:18:41
top: true
tags:
categories:
- VUE
---
### 一、CSS的coped私有作用域和深度选择器

大家都知道当 ```<style>``` 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。那么他是怎么实现的呢，大家看一下编译前后的代码就明白了。
<!--more-->
编译前：

```html
<style scoped>
.example {
  color: red;
}
</style>
```

编译后：

```html
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>
```

看完你肯定就会明白了，其实是在你写的组件的样式，添加了一个属性而已，这样就实现了所谓的私有作用域。但是也会有弊端，考虑到浏览器渲染各种 CSS 选择器的方式，当 ```p { color: red }``` 设置了作用域时 (即与特性选择器组合使用时) 会慢很多倍。如果你使用 class 或者 id 取而代之，比如 ```.example { color: red }```，性能影响就会消除。所以，在你的样式里，进来避免直接使用标签，取而代之的你可以给标签起个class名。

如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 ```>>>``` 操作符:

```html
<style scoped>
    .parent >>> .child { /* ... */ }
</style>
```

上述代码将会编译成：

```css
.parent[data-v-f3f3eg9] .child { 
    /* ... */ 
}
```

而对于less或者sass等预编译，是不支持```>>>```操作符的，可以使用/deep/来替换```>>>```操作符，例如：

```css
.parent /deep/ .child { /* ... */ }
```
