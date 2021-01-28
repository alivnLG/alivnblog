---
title: 前端综合-4-骨架屏skeleton
date: 2021-01-05 11:52:56
top: true
tags:
- 骨架屏
- skeleton
categories:
- 前端综合
---
### 一、什么是骨架屏
<!--more-->
简单的说，骨架屏就是在JS代码解析完成之前，先使用一些图形进行占位，等内容加载完成之后用真实的页面把它替换掉。

如图：

![webzh002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webzh002.gif)

### 二、为什么要使用骨架屏？

> 现在流行的前端框架中(Vue、React、Angular)，都有一个共同的特点，就是JS驱动，在JS代码解析完成之前，页面不会展示任何内容，也就是所谓的白屏。骨架屏可以给人一种页面内容已经渲染出一部分的感觉，相较于传统的 loading 效果，在一定程度上可提升用户体验。尤其在网络较慢、图文信息较多、加载数据流较大的情况下。

PS：解决这种白屏的方式还有

- 预渲染: 启动一个浏览器，生成html，加载这个页面的时候先显示再进行替换。

 - 缺陷：
   - 如果数据非常实时，比如新闻列表，替换页面之前数据可能还是昨天的。比较适合静态页面


- 服务端渲染(SSR)：是通过服务端获取最新数据渲染的，像做一些博客，新闻类的都可以使用服务器端渲染

 - 缺陷：

   - 它会占用很多服务器内存，

   - 由于服务器端渲染只是个字符串，它不知道DOM什么时候放到页面上。就导致一些浏览器的api无法正常使用了，比如操作DOM的api

   - 如果接口挂了就悲剧了

### 三、实现骨架屏的几种方案

- 通过设计师给出的骨架屏图片

- 通过 HTML+CSS 手动编写骨架屏代码；参考[CSS】骨架屏 Skeleton 效果](https://juejin.cn/post/6915763034069663752)

- 自动生成骨架屏代码

### 四、自动生成骨架屏的实现思路

![webzh003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/webzh003.jpg)

```js
compiler.hooks.done.tap(PLUGIN_NAME, async () => {
   // 启动一个http服务器
   await this.startServer(); 
   this.skeleton = new Skeleton(this.options);
   // 启动一个无头浏览器
   await this.skeleton.initialize(); 
   // 生成骨架屏的DOM字符串
   const skeletonHTML = await this.skeleton.genHTML(this.options.origin); 
   // 打包后文件路径
   const originPath = resolve(this.options.staticDir, 'index.html');  
   // 读取打包后文件内容    
   const originHTML = await readFileSync(originPath, 'utf8'); 
   // 把打包后的文件内容替换成生成的骨架屏内容            
   const finalHTML = originHTML.replace('<!--shell-->', skeletonHTML);   
   // 向打包后的文件写入替换骨架屏后的内容  
   await writeFileSync(originPath, finalHTML);  
   // 销毁无头浏览器                          
   await this.skeleton.destroy();   
   // 关闭服务                                      
   await this.server.close();                                            
 })
```

启动http服务

```js
async startServer () {
  // 创建服务
  this.server = new Server(this.options); 
  // 启动服务器
  await this.server.listen();             
}
```

启动puppeteer

```js
async initialize () {
  this.brower = await puppeteer.launch({ headless: true });
}
```

打开新页面

```js
async newPage () {
  let { device } = this.options;
  let page = await this.brower.newPage();
  // puppeteer.devices[device]: 设备模拟
  await page.emulate(puppeteer.devices[device]);
  return page;
}
```

注入提取骨架屏的脚本 生成骨架屏代码和对应的样式

```js
async genHTML (url) {
  let page = await this.newPage();
  // 等待网络加载完成
  let response = await page.goto(url, { waitUntil: 'networkidle2' }); 
  // 如果访问不成功 比如断网了啥的
  if (response && !response.ok()) { 
    throw new Error(`${response.status} on ${url}`);
  }
  // 创建骨架屏
  await this.makeSkeleton(page);
  const { html, styles } = await page.evaluate((options) => {
    return Skeleton.getHtmlAndStyle(options)
  }, this.options);
  let result = `
    <style>${styles.join('\n')}</style>
    ${html}
  `;
  return result;
}
```

用生成的骨架屏内容替换dist中的index.html

```js
// 生成骨架屏的DOM字符串
const skeletonHTML = await this.skeleton.genHTML(this.options.origin); 
// 打包后文件路径
const originPath = resolve(this.options.staticDir, 'index.html');     
// 读取打包后文件内容 
const originHTML = await readFileSync(originPath, 'utf8');   
// 把打包后的文件内容替换成生成的骨架屏内容          
const finalHTML = originHTML.replace('<!--shell-->', skeletonHTML);  
// 向打包后的文件写入替换骨架屏后的内容   
await writeFileSync(originPath, finalHTML);                            
```

关闭无头浏览器和服务

```js
// 销毁无头浏览器
await this.skeleton.destroy(); 
// 关闭服务                                        
await this.server.close();                                             
```

