---
title: js重点知识-53-将json数据转化为json文件保存
date: 2021-01-05 10:26:24
top: true
tags:
categories:
- JavaScript
---
### 一、实现原理

（1）json 视为字符串，可以利用 DataURL 进行下载

```
Text -> DataURL
```

（2）转化为 Object URL 进行下载

```
Text -> Blob -> Object URL
```

```js
function download (url, name) {
  const a = document.createElement('a')
  a.download = name
  a.rel = 'noopener'
  a.href = url
  // 触发模拟点击
  a.dispatchEvent(new MouseEvent('click'))
  // 或者 a.click()
}

const json = {
  a: 3,
  b: 4,
  c: 5
}
const str = JSON.stringify(json, null, 2)

// 方案一：Text -> DataURL
const dataUrl = `data:,${str}`
download(dataUrl, 'demo.json')

// 方案二：Text -> Blob -> ObjectURL
const url = URL.createObjectURL(new Blob(str.split('')))
download(url, 'demo1.json')
```

### 二、总结

1.模拟下载，可以通过新建一个 ```<a href="url" download><a>``` 标签并设置 url 及 download 属性来下载

2.可以通过把 json 转化为 dataurl 来构造 URL

3.可以通过把 json 转换为 Blob 再转化为 ObjectURL 来构造 URL


