---
title: vue2-源码解析-数组变动、对象属性增删
date: 2020-10-10 14:38:45
tags:
categories:
- VUE
---
### 一、由于JavaScript限制，Vue 不能检测数组变动、对象属性的增加和删除

#### 1.数组变动
<!--more-->
不能检测以下数组的变动：
当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue

当你修改数组的长度时，例如：vm.items.length = newLength

第一类问题解决方法：
```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)

//实例方法
vm.$set(vm.items, indexOfItem, newValue)
```
第二类问题解决方法：
```
vm.items.splice(newLength)
```
#### 2.对象属性的添加和删除

解决方法：
```
Vue.set(vm.userProfile, 'age', 27)

//实例方法
vm.$set(vm.userProfile, 'age', 27)
```

为已有对象赋值多个新属性
```
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```