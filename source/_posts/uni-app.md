---
title: uni-app
date: 2020-06-02 15:45:39
tags:
- uni-app
- APP
- 小程序
- H5
categories:
- 混合APP开发
---
## 一、uni-app介绍
#### 1.uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉）等多个平台。
<!--more-->
### 2.跨平台
```
一套代码，多端发行；
条件编译；
```
### 3.运行体验
```
组件、api与小程序一致；
兼容weex原生渲染
```
### 4.技术支持
```
vue的语法、小程序的标签和API
内嵌mpvue
```

**mpvue （github 地址请参见）是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，mpvue 修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验。**

### 5.开放生态
```
支持npm安装第三方包；
支持微信小程序自定义组件和SDK；
兼容mpvue组件及项目；
APP端支持和原生混合编码；
插件市场
```
### 6.功能框架

![uniapp001](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp001.jpg)

### 7.项目创建方式

#### 通过 HBuilderX 可视化界面

#### 通过vue-cli命令行
全局安装vue-cli
```
npm install -g @vue/cli
```

使用正式版（对应HBuilderX最新正式版）
```
vue create -p dcloudio/uni-preset-vue my-project
```

使用alpha版（对应HBuilderX最新alpha版）
```
vue create -p dcloudio/uni-preset-vue#alpha my-alpha-project
```

运行并发布uni-app
```
npm run dev:%PLATFORM%
npm run build:%PLATFORM%
```

%PLATFORM% 可取值如下

值 | 平台
---|---
app-plus | app平台生成打包资源（仅支持npm run build:app-plus，也就是App平台运行调试不支持cli方式，需在HBuilderX中运行调试）
h5 | H5
mp-alipay | 支付宝小程序
mp-baidu | 百度小程序
mp-weixin | 微信小程序
mp-toutiao | 头条小程序
mp-qq | qq 小程
mp-360 | 360 小程序
quickapp-webview | 快应用通用
quickapp-webview-union | 快应用联盟
quickapp-webview-huawei | 快应用华为

可以自定义更多条件编译平台，比如钉钉小程序。

```
目前使用npm run build:app-plus会在/dist/build/app-plus下生成app打包资源。如需制作wgt包，
将app-plus中的文件压缩成zip（注意：不要包含app-plus目录），再重命名为${appid}.wgt， 
appid为manifest.json文件中的appid。

dev 模式编译出的各平台代码存放于根目录下的 /dist/dev/目录，打开各平台开发工具选择对应平台目录
即可进行预览（h5 平台不会在此目录，存在于缓存中）；

build 模式编译出的各平台代码存放于根目录下的 /dist/build/ 目录，发布时选择此目录进行发布；

dev 和 build 模式的区别：
    dev 模式有 SourceMap 可以方便的进行断点调试；
    build 模式会将代码进行压缩，体积更小更适合发布为正式版应用；
    进行 环境判断 时，dev 模式 process.env.NODE_ENV 的值为 development，build 模式 
    process.env.NODE_ENV 的值为 production。
```

使用cli创建项目和使用HBuilderX可视化界面创建项目有什么区别

编译器的区别

```
cli创建的项目，编译器安装在项目下。并且不会跟随HBuilderX升级。如需升级编译器，执行npm update。

HBuilderX可视化界面创建的项目，编译器在HBuilderX的安装目录下的plugin目录，
随着HBuilderX的升级会自动升级编译器。

已经使用cli创建的项目，如果想继续在HBuilderX里使用，可以把工程拖到HBuilderX中。
注意如果是把整个项目拖入HBuilderX，则编译时走的是项目下的编译器。如果是把src目录拖入
到HBuilderX中，则走的是HBuilderX安装目录下plugin目录下的编译器。

cli版如果想安装less、scss、ts等编译器，需自己手动npm安装。在HBuilderX的插件管理界面安装无效，
那个只作用于HBuilderX创建的项目。
```

开发工具的区别

```
cli创建的项目，内置了d.ts，同其他常规npm库一样，可在vscode、webstorm等支持d.ts的开发工具里
正常开发并有语法提示。

使用HBuilderX创建的项目不带d.ts，HBuilderX内置了uni-app语法提示库。如需把HBuilderX创建的项目
在其他编辑器打开并且补充d.ts，可以在项目下先执行 npm init，然后npm i @types/uni-app -D，
来补充d.ts。

但vscode等其他开发工具，在vue或uni-app领域，开发效率比不过HBuilderX。
详见：https://ask.dcloud.net.cn/article/35451

发布App时，仍然需要使用HBuilderX。其他开发工具无法发布App，但可以发布H5、各种小程序。
如需开发App，可以先在HBuilderX里运行起来，然后在其他编辑器里修改保存代码，代码修改后
会自动同步到手机基座。

如果使用cli创建项目，那下载HBuilderX时只需下载10M的标准版即可。因为编译器已经安装到项目下了。
```

### 8.uni-app 开发规范

```
页面文件遵循 Vue 单文件组件 (SFC) 规范
组件标签靠近小程序规范，详见uni-app 组件规范
接口能力（JS API）靠近微信小程序规范，但需将前缀 wx 替换为 uni，详见uni-app接口规范
数据绑定及事件处理同 Vue.js 规范，同时补充了App及页面的生命周期
为兼容多端运行，建议使用flex布局进行开发
```

### 9.项目目录结构
```
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录
├─platforms             存放各平台专用页面的目录
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─wxcomponents          存放小程序组件的目录
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息
└─pages.json            配置页面路由、导航条、选项卡等页面类信息
```
**Tips**

```
static 目录下的 js 文件不会被编译，如果里面有 es6 的代码，不经过转换直接运行，在手机设备上会报错。
css、less/scss 等资源同样不要放在 static 目录下，建议这些公用的资源放在 common 目录下。
HbuilderX 1.9.0+ 支持在根目录创建 ext.json sitemap.json 文件。
```
### 10.资源路径说明

**模板内引入静态资源**

```
<!-- 绝对路径，/static指根目录下的static目录，在cli项目中/static指src目录下的static目录 -->
<image class="logo" src="/static/logo.png"></image>
<image class="logo" src="@/static/logo.png"></image>
<!-- 相对路径 -->
<image class="logo" src="../../static/logo.png"></image>
```

*注意*

```
@开头的绝对路径以及相对路径会经过base64转换规则校验
引入的静态资源在非h5平台，均不转为base64。

H5平台，小于4kb的资源会被转换成base64，其余不转。

自HBuilderX 2.6.6-alpha起template内支持@开头路径引入静态资源，旧版本不支持此方式

App平台自HBuilderX 2.6.9-alpha起template节点中引用静态资源文件时（如：图片），
调整查找策略为【基于当前文件的路径搜索】，与其他平台保持一致

支付宝小程序组件内 image 标签不可使用相对路径
```
**js文件引入**
js文件或script标签内（包括renderjs等）引入js文件时，可以使用相对路径和绝对路径，形式如下

```
// 绝对路径，@指向项目根目录，在cli项目中@指向src目录
import add from '@/common/add.js'
// 相对路径
import add from '../../common/add.js'
```

*注意*

```
js文件不支持使用/开头的方式引入
```

**css引入静态资源**

```
/* 绝对路径 */
@import url('/common/uni.css');
@import url('@/common/uni.css');
/* 相对路径 */
@import url('../../common/uni.css');
```

*注意*

css文件或style标签内引用的图片路径可以使用相对路径也可以使用绝对路径，需要注意的是，有些小程序端css文件不允许引用本地文件（请看注意事项）。

```
/* 绝对路径 */
background-image: url(/static/logo.png);
background-image: url(@/static/logo.png);
/* 相对路径 */
background-image: url(../../static/logo.png);
```

**Tips**

```
引入字体图标请参考，字体图标
@开头的绝对路径以及相对路径会经过base64转换规则校验
不支持本地图片的平台，小于40kb，一定会转base64。（共四个平台mp-weixin, mp-qq, mp-toutiao, app v2）
h5平台，小于4kb会转base64，超出4kb时不转。
其余平台不会转base64
```

### 11.生命周期
#### 应用声明周期

函数名 | 说明
---|---
onLaunch | 当uni-app 初始化完成时触发（全局只触发一次）
onShow | 当 uni-app 启动，或从后台进入前台显示
onHide | 当 uni-app 从前台进入后台
onError | 当 uni-app 报错时触发
onUniNViewMessage |	对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯


```
应用生命周期仅可在App.vue中监听，在其它页面监听无效。
onlaunch里进行页面跳转，如遇白屏报错，请参考https://ask.dcloud.net.cn/article/35942
```

#### 页面生命周期

函数名 | 说明 | 平台差异说明 | 最低版本
---|---|---|---
onLoad|	监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）|	| |	
onShow | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 | | |	
onReady	| 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发 | | |	
onHide | 监听页面隐藏 | | |		
onUnload | 监听页面卸载 | | |		
onResize | 监听窗口尺寸变化 | App、微信小程序 | |	onPullDownRefresh | 监听用户下拉动作，一般用于下拉刷新 | | |		
onReachBottom |	页面上拉触底事件的处理函数 | | |	
onTabItemTap | 点击 tab 时触发，参数为Object，具体见下方注意事项 |	微信小程序、百度小程序、H5、App（自定义组件模式） | |	
onShareAppMessage | 用户点击右上角分享 |	微信小程序、百度小程序、头条小程序、支付宝小程序 | | 
onPageScroll | 监听页面滚动，参数为Object | | |		
onNavigationBarButtonTap | 监听原生标题栏按钮点击事件，参数为Object | 5+ App、H5 | |
onBackPress	| 监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：onBackPress 详解 | App、H5 | |
onNavigationBarSearchInputChanged |	监听原生标题栏搜索输入框输入内容变化事件 |	App、H5	1.6.0 | |
onNavigationBarSearchInputConfirmed |	监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。 | App、H5 | 1.6.0 |
onNavigationBarSearchInputClicked |	监听原生标题栏搜索输入框点击事件 | App、H5	| 1.6.0

### 12.路由
uni-app页面路由为框架统一管理，开发者需要在pages.json里配置每个路由页面的路径及页面样式。类似小程序在app.json中配置页面路由一样。所以 uni-app 的路由用法与 Vue Router 不同，如仍希望采用 Vue Router 方式管理路由，可在插件市场搜索 Vue-Router。

### 13.路由跳转
#### 使用navigator组件跳转
#### 调用API跳转

### 14.页面栈
框架以栈的形式管理当前所有页面， 当发生路由切换的时候，页面栈的表现如下：

路由方式 | 页面栈表现 | 触发时机
--- | --- | ---
初始化 | 新页面入栈 | uni-app 打开的第一个页面
打开新页面 | 新页面入栈 | 调用 API   uni.navigateTo  、使用组件  <navigator open-type="navigate"/>
页面重定向 | 当前页面出栈，新页面入栈 | 调用 API   uni.redirectTo  、使用组件  <navigator open-type="redirectTo"/>
页面返回 | 页面不断出栈，直到目标返回页 | 调用 API  uni.navigateBack   、使用组件 <navigator open-type="navigateBack"/> 、用户按左上角返回按钮、安卓用户点击物理back按键
Tab 切换 | 页面全部出栈，只留下新的 Tab 页面 | 调用 API  uni.switchTab  、使用组件  <navigator open-type="switchTab"/>  、用户切换 Tab
重加载 | 页面全部出栈，只留下新的页面 | 调用 API  uni.reLaunch  、使用组件  <navigator open-type="reLaunch"/>

### 15.运行环境判断
uni-app 可通过 process.env.NODE_ENV 判断当前环境是开发环境还是生产环境。一般用于连接测试服务器或生产服务器的动态切换。

在HBuilderX 中，点击“运行”编译出来的代码是开发环境，点击“发行”编译出来的代码是生产环境。

cli模式下，是通行的编译环境处理方式。

```
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
}else{
    console.log('生产环境')
}
```
### 16.判断平台
#### 平台判断有2种场景，一种是在编译期判断，一种是在运行期判断。

##### 编译期判断 编译期判断，即条件编译，不同平台在编译出包后已经是不同的代码。

```
// #ifdef H5
    alert("只有h5平台才有alert方法")
// #endif
```
如上代码只会编译到H5的发行包里，其他平台的包不会包含如上代码。

##### 运行期判断 运行期判断是指代码已经打入包中，仍然需要在运行期判断平台，此时可使用 uni.getSystemInfoSync().platform 判断客户端环境是 Android、iOS 还是小程序开发工具（在百度小程序开发工具、微信小程序开发工具、支付宝小程序开发工具中使用 uni.getSystemInfoSync().platform 返回值均为 devtools）。

```
switch(uni.getSystemInfoSync().platform){
    case 'android':
       console.log('运行Android上')
       break;
    case 'ios':
       console.log('运行iOS上')
       break;
    default:
       console.log('运行在开发者工具上')
       break;
}
```

如有必要，也可以在条件编译里自己定义一个变量，赋不同值。在后续运行代码中动态判断环境。

### 17.页面样式与布局
#### 尺寸单位
uni-app 支持的通用 css 单位包括 px、rpx

```
px 即屏幕像素
rpx 即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。
屏幕变宽，rpx 实际显示效果会等比放大。
```

vue页面支持普通H5单位，但在nvue里不支持，nvue还不支持百分比单位。

```
rem 默认根字体大小为 屏幕宽度/20（微信小程序、头条小程序、App、H5）
vh viewpoint height，视窗高度，1vh等于视窗高度的1%
vw viewpoint width，视窗宽度，1vw等于视窗宽度的1%
```

App端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，只支持 px。注意此时不支持 rpx

nvue中，uni-app 模式（nvue 不同编译模式介绍）可以使用 px 、rpx，表现与 vue 中一致。weex 模式目前遵循weex的单位，它的单位比较特殊：

px:，以750宽的屏幕为基准动态计算的长度单位，与 vue 页面中的 rpx 理念相同。（一定要注意 weex 模式的 px，和 vue 里的 px 逻辑不一样。）
wx：与设备屏幕宽度无关的长度单位，与 vue 页面中的 px 理念相同


**设计师在提供设计图时，一般只提供一个分辨率的图。**

**rpx 是相对于基准宽度的单位，可以根据屏幕宽度进行自适应。uni-app 规定屏幕基准宽度 750rpx。**

**rpx 是相对于基准宽度的单位，可以根据屏幕宽度进行自适应。uni-app 规定屏幕基准宽度 750rpx。**

```
设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx
```

页面元素宽度在 uni-app 中的宽度计算公式:

```
750 * 元素在设计稿中的宽度 / 设计稿基准宽度
```

```
若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：
750 * 100 / 750，结果为：100rpx。

若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：
750 * 100 / 640，结果为：117rpx。

若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 uni-app 里面的宽度应该设为：
750 * 200 / 375，结果为：400rpx。
```

```
注意 rpx 是和宽度相关的单位，屏幕越宽，该值实际像素越大。如不想根据屏幕宽度缩放，
则应该使用 px 单位。

如果开发者在字体或高度中也使用了 rpx ，那么需注意这样的写法意味着随着屏幕变宽，
字体会变大、高度会变大。如果你需要固定高度，则应该使用 px 。

rpx不支持动态横竖屏切换计算，使用rpx建议锁定屏幕方向

设计师可以用 iPhone6 作为视觉稿的标准。

如果设计稿不是750px，HBuilderX提供了自动换算的工具，
详见：https://ask.dcloud.net.cn/article/35445。

App端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，
只支持 px，不支持 rpx。

早期 uni-app 提供了 upx ，目前已经推荐统一改为 rpx 了
```

#### 样式导入
使用@import语句可以导入外联样式表，@import后跟需要导入的外联样式表的相对路径，用;表示语句结束;

```
<style>
    @import "../../common/uni.css";

    .uni-card {
        box-shadow: none;
    }
</style>
```

#### 内联样式
框架组件上支持使用 style、class 属性来控制组件的样式。

```
<view :style="{color:color}" />
```

```
<view class="normal_view" />
```

#### 选择器

选择器 | 样例 | 样例描述
-- | -- | --
.class | .intro | 选择所有拥有 class="intro" 的组件
#id	| #firstname | 选择拥有 id="firstname" 的组件
element | view | 选择所有 view 组件
element, element | view, checkbox | 选择所有文档的 view 组件和所有的 checkbox 组件
::after | view::after | 在 view 组件后边插入内容，仅微信小程序和App生效
::before | view::before | 在 view 组件前边插入内容，仅微信小程序和App生效

在 uni-app 中不能使用 * 选择器。
page 相当于 body 节点，例如：

```
<!-- 设置页面背景颜色 -->
page {
  background-color:#ccc;
}
```

#### 全局样式与局部样式
定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。

注意：

```
App.vue 中通过 @import 语句可以导入外联样式，一样作用于每一个页面。
nvue页面暂不支持全局样式
```

#### CSS变量

CSS变量 | 描述 | App | 小程序 | H5
--|--|--|--|--
--status-bar-height | 系统状态栏高度 | 系统状态栏高度、nvue注意见下 | 25px | 0
--window-top | 内容区域距离顶部的距离 | 0 | 0 | NavigationBar 的高度
--window-bottom | 内容区域距离底部的距离 | 0 | 0 | TabBar 的高度

```
var(--status-bar-height) 此变量在微信小程序环境为固定 25px，在 App 里为手机实际状态栏高度。

当设置 "navigationStyle":"custom" 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。
此时可以使用一个高度为 var(--status-bar-height) 的 view 放在页面顶部，避免页面内容出现在状态栏。

由于在H5端，不存在原生导航栏和tabbar，也是前端div模拟。如果设置了一个固定位置的居底view，
在小程序和App端是在tabbar上方，但在H5端会与tabbar重叠。此时可使用--window-bottom，不管在哪个端，
都是固定在tabbar上方。

目前 nvue 在App端，还不支持 --status-bar-height变量，替代方案是在页面onLoad时通过
uni.getSystemInfoSync().statusBarHeight获取状态栏高度，然后通过style绑定方式给
占位view设定高度。
```

```
<template>
    <!-- HBuilderX 2.6.3+ 新增 page-meta, 详情：https://uniapp.dcloud.io/component/page-meta -->
    <page-meta>
        <navigation-bar />
    </page-meta>
    <view>
        <view class="status_bar">
            <!-- 这里是状态栏 -->
        </view>
        <view> 状态栏下的文字 </view>
    </view>
</template>    
<style>
    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }
</style>
```

nvue页面获取状态栏高度

```
<template>
    <view class="content">
        <view :style="{ height: iStatusBarHeight + 'px'}"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                iStatusBarHeight:0
            }
        },
        onLoad() {
            this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
        }
    }
</script>
```

#### 固定值
uni-app 中以下组件的高度是固定的，不可修改：

组件 | 描述 | App | H5
--|--|--|--
NavigationBar | 导航栏 | 44px | 44px
TabBar | 底部选项卡 | HBuilderX 2.3.4之前为56px，2.3.4起和H5调为一致，统一为 50px。但可以自主更改高度） | 50px

各小程序平台，包括同小程序平台的iOS和Android的高度也不一样。

#### Flex布局
为支持跨平台，框架建议使用Flex布局

#### 背景图片
uni-app 支持使用在 css 里设置背景图片，使用方式与普通 web 项目大体相同，但需要注意以下几点：

```
支持 base64 格式图片。

支持网络路径图片。

小程序不支持在css中使用本地文件，包括本地的背景图和字体文件。需以base64方式方可使用。
App端在v3模式以前，也有相同限制。v3编译模式起支持直接使用本地背景图和字体。

使用本地路径背景图片需注意：

    为方便开发者，在背景图片小于 40kb 时，uni-app 编译到不支持本地背景图的平台时，
    会自动将其转化为 base64 格式；

    图片大于等于 40kb，会有性能问题，不建议使用太大的背景图，如开发者必须使用，
    则需自己将其转换为 base64格式使用，或将其挪到服务器上，从网络地址引用。

    本地背景图片的引用路径推荐使用以 ~@ 开头的绝对路径。

    .test2 {
        background-image: url('~@/static/logo.png');
    }
```

**微信小程序不支持相对路径（真机不支持，开发工具支持）**

#### 字体图标
uni-app 支持使用字体图标，使用方式与普通 web 项目相同，需要注意以下几点：

```
支持 base64 格式字体图标。

支持网络路径字体图标。

小程序不支持在css中使用本地文件，包括本地的背景图和字体文件。需以base64方式方可使用。

App端在v3模式以前，也有相同限制。v3编译模式起支持直接使用本地背景图和字体。

网络路径必须加协议头 https。

从 http://www.iconfont.cn 上拷贝的代码，默认是没加协议头的。

使用本地路径图标字体需注意

    1.为方便开发者，在字体文件小于 40kb 时，uni-app 会自动将其转化为 base64 格式；
    2.字体文件大于等于 40kb，仍转换为 base64 方式使用的话可能有性能问题，如开发者必须使用，则需自己将其转换为 base64 格式使用，或将其挪到服务器上，从网络地址引用；
    3.字体文件的引用路径推荐使用以 ~@ 开头的绝对路径。
    @font-face {
        font-family: test1-icon;
        src: url('~@/static/iconfont.ttf');
    }
```

#### template 和 block

uni-app 支持在 template 模板中嵌套 

```
<template/> 和 <block/>
```

用来进行 列表渲染 和 条件渲染。

```
<template>
    <view>
        <template v-if="test">
            <view>test 为 true 时显示</view>
        </template>
        <template v-else>
            <view>test 为 false 时显示</view>
        </template>
    </view>
</template>
```

```
<template>
    <view>
        <block v-for="(item,index) in list" :key="index">
            <view>{{item}} - {{index}}</view>
        </block>
    </view>
</template>
```

### 18.ES6 支持
uni-app 在支持绝大部分 ES6 API 的同时，也支持了 ES7 的 await/async。
### 19.NPM 支持
uni-app支持使用npm安装第三方包。

**初始化npm工程**

若项目之前未使用npm管理依赖（项目根目录下无package.json文件），先在项目根目录执行命令初始化npm工程：

```
npm init -y
```

cli项目默认已经有package.json了。HBuilderX创建的项目默认没有，需要通过初始化命令来创建。

**安装依赖**

在项目根目录执行命令安装npm包：

```
npm install packageName --save
```

**使用**

安装完即可使用npm包，js中引入npm包：

```
import package from 'packageName'
const package = require('packageName')
```
**注意**

```
为多端兼容考虑，建议优先从 uni-app插件市场获取插件。直接从 npm 下载库很容易只兼容H5端。

非 H5 端不支持使用含有 dom、window 等操作的 vue 组件和 js 模块，安装的模块及其依赖的模块
使用的 API 必须是 uni-app 已有的 API（兼容小程序 API），比如：支持高德地图微信小程序 SDK。
类似jQuery 等库只能用于H5端。

node_modules 目录必须在项目根目录下。不管是cli项目还是HBuilderX创建的项目。

支持安装 mpvue 组件，但npm方式不支持小程序自定义组件（如 wxml格式的vant-weapp），
使用小程序自定义组件请参考：小程序组件支持。

关于ui库的获取，[详见多端UI库](https://note.youdao.com/)
```

### 20.TypeScript 支持
在 uni-app 中使用 ts 开发，请参考 Vue.js TypeScript 支持 说明。

在 vue 文件的 script 节点声明 lang="ts"

```
<script lang="ts">
    // 仅展示需要修改的核心代码，完整代码请参考原来的组件。
    import Vue from 'vue';
    export default Vue.extend({
        props: {
            type: {
                type: String,
                default: 'default'
            },
            inverted: {
                type: Boolean,
                default: false
            },
            text: {
                type: [String, Number],
                default: ''
            },
            size: {
                type: String,
                default: 'normal'
            }
        },
        computed: {
            setClass(): string {
                const classList: string[] = ['uni-badge-' + this.type, 'uni-badge-size-' + this.size];
                if (this.inverted === true) {
                    classList.push('uni-badge-inverted')
                }
                return classList.join(" ")
            }
        },
        methods: {
            onClick() {
                this.$emit('click')
            }
        }
    })
</script>
```

```
<script lang="ts">
    import Vue from 'vue';
    import uniBadge from '../../components/uni-badge.vue';
    export default Vue.extend({
        data() {
            return {
                title: 'Hello'
            }
        },
        components:{
            uniBadge
        }
    });
</script>
```

### 21.小程序组件支持
uni-app 支持在 App 和 小程序 中使用小程序自定义组件，从HBuilderX2.4.7起，H5端也可以运行微信小程序组件。

平台差异说明

平台 | 支持情况 | 小程序组件存放目录
--|--|--
H5 | 支持微信小程序组件（2.4.7+） | wxcomponents
App（不含nvue） | 支持微信小程序组件 | wxcomponents
微信小程序 | 支持微信小程序组件 | wxcomponents
支付宝小程序 | 支持支付宝小程序组件 | mycomponents
百度小程序 | 支持百度小程序组件 | swancomponents
头条小程序 | 支持头条小程序组件 | ttcomponents
QQ小程序 | 支持QQ小程序组件 | wxcomponents

目录结构

```
┌─wxcomponents                  微信小程序自定义组件存放目录
│   └──custom                   微信小程序自定义组件
│        ├─index.js
│        ├─index.wxml
│        ├─index.json
│        └─index.wxss
├─mycomponents                  支付宝小程序自定义组件存放目录
│   └──custom                   支付宝小程序自定义组件
│        ├─index.js
│        ├─index.axml
│        ├─index.json
│        └─index.wxss
├─swancomponents                百度小程序自定义组件存放目录
│   └──custom                   百度小程序自定义组件
│        ├─index.js
│        ├─index.swan
│        ├─index.json
│        └─index.wxss
├─pages
│  └─index
│        └─index.vue
│
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

##### 使用方式

在 pages.json 对应页面的 style -> usingComponents 引入组件：

```
{
    "pages": [
        {
            "path": "index/index",
            "style": {
                "usingComponents": {
                    // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
                     "custom": "/wxcomponents/custom/index"
                    // #endif
                    // #ifdef MP-BAIDU
                     "custom": "/swancomponents/custom/index"
                    // #endif
                    // #ifdef MP-ALIPAY
                     "custom": "/mycomponents/custom/index"
                    // #endif
                }
            }
        }
    ]
}
```

```
<!-- 页面模板 (index.vue) -->
<view>
    <!-- 在页面中对自定义组件进行引用 -->
    <custom name="uni-app"></custom>
</view>
```
**注意**
```
小程序组件需要放在项目特殊文件夹 wxcomponents（或 mycomponents、swancomponents）。
HBuilderX 建立的工程 wxcomponents 文件夹在 项目根目录下。vue-cli 建立的工程 wxcomponents 
文件夹在 src 目录下。可以在 vue.config.js 中自定义其他目录

小程序组件的性能，不如vue组件。使用小程序组件，需要自己手动setData，很难自动管理差量数据更新。
而使用vue组件会自动diff更新差量数据。所以如无明显必要，建议使用vue组件而不是小程序组件。
比如某些小程序ui组件，完全可以用更高性能的uni ui替代。

当需要在 vue 组件中使用小程序组件时，注意在 pages.json 的 globalStyle 中配置 
usingComponents，而不是页面级配置。

注意数据和事件绑定的差异，使用时应按照 vue 的数据和事件绑定方式

    属性绑定从 attr="{{ a }}"，改为 :attr="a"；从 title="复选框{{ item }}" 改为 
    :title="'复选框' + item"

    事件绑定从 bind:click="toggleActionSheet1" 改为 @click="toggleActionSheet1"

    阻止事件冒泡 从 catch:tap="xx" 改为 @tap.native.stop="xx"

    wx:if 改为 v-if

    wx:for="{{ list }}" wx:key="{{ index }}" 改为v-for="(item,index) in list"

    原事件命名以短横线分隔的需要手动修改小程序组件源码为驼峰命名，比如：this.$emit('left-click') 修改为 this.$emit('leftClick')（HBuilderX 1.9.0+ 不再需要修改此项）
```

### 22.WXS
WXS是一套运行在视图层的脚本语言

它的特点是运行在视图层。当需要避免逻辑层和渲染层交互通信折损时，可采用wxs。

与wxs类似，百度小程序提供了Filter、阿里小程序提供了SJS，uni-app也支持使用这些功能，并将它们编译到百度和阿里的小程序端。不过它们的功能还不如wxs强大。此外头条系小程序自身不支持类似功能。

App	H5 | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序
-- | -- | -- | -- | -- | --
√(不支持nvue) | √ | √ | SJS | Filter | x | √

### 23.renderjs
renderjs是一个运行在视图层的js。它比WXS更加强大。它只支持app-vue和h5。

renderjs的主要作用有2个：

大幅降低逻辑层和视图层的通讯损耗，提供高性能视图交互能力
在视图层操作dom，运行for web的js库。

### 24.使用vue.js注意事项
uni-app 在发布到H5时支持所有vue的语法；发布到App和小程序时，由于平台限制，无法实现全部vue语法，但uni-app仍是是对vue语法支持度最高的跨端框架。

相比Web平台， Vue.js 在 uni-app 中使用差异主要集中在两个方面：

```
新增：uni-app除了支持Vue实例的生命周期，还支持应用启动、页面显示等生命周期
受限：相比web平台，在小程序和App端部分功能受限
v3版本App端可以使用更多的vue特性
```

### 25.条件编译
#### 跨端兼容
uni-app 已将常用的组件、JS API 封装到框架中，开发者按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。

但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。

```
大量写 if else，会造成代码执行性能低下和管理混乱。
编译到不同的工程后二次修改，会让后续升级变的很麻烦。
```

在 C 语言中，通过 #ifdef、#ifndef 的方式，为 windows、mac 等不同 os 编译不同的代码。 uni-app 参考这个思路，为 uni-app 提供了条件编译手段，在一个工程里优雅的完成了平台个性化实现。

#### 条件编译
条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

以 #ifdef 或 #ifndef 加 %PLATFORM% 开头，以 #endif 结尾。

```
#ifdef：if defined 仅在某平台存在
#ifndef：if not defined 除了某平台均存在
%PLATFORM%：平台名称
```

支持的文件
.vue  
.js  
.css  
pages.json  
各预编译语言文件，如：.scss、.less、.stylus、.ts、.pug；

```
注意： 条件编译是利用注释实现的，在不同语法里注释写法不一样，js使用 // 注释、css 使用 /* 注释 */、vue/nvue 模板里使用 <!-- 注释 -->；
```

#### API 的条件编译

```
// #ifdef  %PLATFORM%
平台特有的API实现
// #endif
```

APP下

![uniapp002](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp002.jpg)

H5下

![uniapp003](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp003.jpg)

多平台同时编译，使用 || 来分隔平台名称

![uniapp004](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp004.jpg)

#### 组件的条件编译

```
<!--  #ifdef  %PLATFORM% -->
平台特有的组件
<!--  #endif -->
```

![uniapp005](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp005.jpg)

#### 样式的条件编译

```
/*  #ifdef  %PLATFORM%  */
平台特有样式
/*  #endif  */
```

样式的条件编译，无论是 css 还是 sass/scss/less/stylus 等预编译语言中，必须使用 /*注释*/ 的写法。

![uniapp006](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp006.jpg)

#### pages.json 的条件编译
下面的页面，只有运行至 App 时才会编译进去。

![uniapp007](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp007.jpg)

不同平台下的特有功能，以及小程序平台的分包，都可以通过 pages.json 的条件编译来更好地实现。这样，就不会在其它平台产生多余的资源，进而减小包体积。

json的条件编译，如不同平台的key名称相同，cli项目下开发者自己安装的校验器会报错，需自行关闭这些校验器对json相同key的校验规则。如果使用HBuilderX的校验器，无需在意此问题，HBuilderX的语法校验器为此优化过。

#### static 目录的条件编译
在不同平台，引用的静态资源可能也存在差异，通过 static 的的条件编译可以解决此问题，static 目录下新建不同平台的专有目录（目录名称同 %PLATFORM% 值域,但字母均为小写），专有目录下的静态资源只有在特定平台才会编译进去。

如以下目录结构，a.png 只有在微信小程序平台才会编译进去，b.png 在所有平台都会被编译。

```
┌─static                
│  ├─mp-weixin
│  │  └─a.png     
│  └─b.png
├─main.js        
├─App.vue      
├─manifest.json 
└─pages.json    
```

#### 整体目录条件编译
如果想把各平台的页面文件更彻底的分开，也可以在uni-app项目根目录创建platforms目录，然后在下面进一步创建APP-PLUS、MP-WEIXIN等子目录，存放不同平台的文件。

#### HBuilderX 支持
##### 代码块支持
在 HBuilderX 中开发 uni-app 时，通过输入 ifdef 可快速生成条件编译的代码片段。

![uniapp008](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp008.jpg)

##### 语法高亮
![uniapp009](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp009.jpg)
##### 正确注释和快速选中

在 HBuilderX 中，ctrl+alt+/ 即可生成正确注释（js：// 注释、css：/* 注释 */、vue/nvue模板： <!-- 注释 -->）。

![uniapp010](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp010.jpg)

点击 ifdef 或 endif 可快速选中条件编译部分；点击左侧的折叠图标，可折叠条件编译部分代码。
![uniapp011](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/uniapp011.jpg)

**注意**

```
Android 和 iOS 平台不支持通过条件编译来区分，
如果需要区分 Android、iOS 平台，
请通过调用 uni.getSystemInfo 来获取平台信息。在HBuilderX1.9.10起，
支持ifios、ifAndroid代码块，可方便编写判断。
有些跨端工具可以提供js的条件编译或多态，
但这对于实际开发远远不够。uni-app不止是处理js，
任何代码都可以多端条件编译，才能真正解决实际项目的
跨端问题。另外所谓多态在实际开发中会造成大量冗余
代码，很不利于复用和维护。举例，微信小程序主题色
是绿色，而百度支付宝小程序是蓝色，你的应用想分平
台适配颜色，只有条件编译是代码量最低、最容易维护的。
有些公司的产品运营总是给不同平台提不同需求，
但这不是拒绝uni-app的理由。关键在于项目里，
复用的代码多还是个性的代码多，正常都是复用的代码多，
所以仍然应该多端。而个性的代码放到不同平台的目录下，
差异化维护。
```

### 26.uni-app 跨端开发注意事项
#### H5正常但App异常的可能性

```
1.css异常
2.不支持的选择器 非H5端不支持*选择器；
```

#### H5正常但小程序异常的可能性

```
1.同上
2.v-html在h5和app-vue(v3编译模式)均支持，但小程序不支持
3.小程序要求连接的网址都要配白名单
```

#### 小程序正常但App异常的可能性
#### 小程序或App正常，但H5异常的可能性
#### App正常，小程序、H5异常的可能性

```
1.代码中使用了App端特有的plus、Native.js、subNVue、原生插件等功能
```

#### vendor.js过大的处理方式

使用运行时代码压缩

HBuilderX创建的项目勾选运行-->运行到小程序模拟器-->
运行时是否压缩代码
cli创建的项目可以在pacakge.json中添加参数--minimize，
示例：

```
"dev:mp-weixin": "cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch --minimize"
```

使用分包优化，关于分包优化的说明

### 27.高效率开发技巧
#### 使用代码块直接创建组件模板
为提升开发效率，HBuilderX将 uni-app 常用代码封装成了以 u 开头的代码块，如在 template 标签内输入 ulist 回车，会自动生成如下代码：

```
<view class="uni-list">
    <view class="uni-list-cell">
        <view class="uni-list-cell-navigate uni-navigate-right" v-for="(item,index) in list" :key="index">
            {{item.value}}
        </view>
    </view>
</view>
```

代码块分为Tag代码块、JS代码块，如在 script 标签内输入 uShowToast 回车，会自动生成如下代码：

```
uni.showToast({
    title: '',
    mask: false
    duration: 1500
});
```

#### 使用 Chrome 调试 H5
进入 uni-app 项目，点击工具栏的运行 -> 运行到浏览器 -> 选择 Chrome，即可将 uni-app运行到 浏览器，可参考 运行uni-app，运行到浏览器后，就能和普通 web 项目一样进行预览和调试了。

#### 使用各家小程序开发工具调试

#### 关于 App 的调试debug

#### 持续集成

很多公司的开发人员提交代码后，需要自动打包或持续集成。

此时需要在服务器安装uni-app的cli版本来发布小程序和H5版。

HBuilderX版与cli版互转指南参考：https://ask.dcloud.net.cn/article/35750

如果是发布App，则需要使用离线打包，配置原生环境，来实现持续集成。（目前HBuilderX还不支持命令行生成wgt资源和云打包，欢迎到需求墙投票：https://dev.dcloud.net.cn/wish/）

### 28.性能优化
#### 使用自定义组件模式
使用自定义组件模式，在manifest中配置自定义组件模式

在复杂页面中，页面中嵌套大量组件，如果是非自定义组件模式，更新一个组件会导致整个页面数据更新。而自定义组件模式则可以单独更新一个组件的数据。

在App端，除了上述好处，自定义组件模式还新增了一个独立的js引擎，加快启动速度、减少js阻塞。

#### 避免使用大图
页面中若大量使用大图资源，会造成页面切换的卡顿，导致系统内存升高，甚至白屏崩溃。

尤其是不要把多张大图缩小后显示在一个屏幕内，比如上传图片前选了数张几M体积的照片，然后缩小在一个屏幕中展示多张几M的大图，非常容易白屏崩溃。

#### 优化数据更新
在 uni-app 中，定义在 data 里面的数据每次变化时都会通知视图层重新渲染页面。 所以如果不是视图所需要的变量，可以不定义在 data 中，可在外部定义变量或直接挂载在vue实例上，以避免造成资源浪费。

#### 长列表
长列表中如果每个item有一个点赞按钮，点击后点赞数字+1，此时点赞组件必须是一个单独引用的组件，才能做到差量数据更新。否则会造成整个列表数据重载。（要求自定义组件模式）

长列表中每个item并不一定需要做成组件，取决于你的业务中是否需要差量更新某一行item的数据，如没有此类需求则不应该引入大量组件。（点击item后背景变色，属于css调整，没有更新data数据和渲染，不涉及这个问题）

app端nvue的长列表应该使用list组件，有自动的渲染资源回收机制。vue页面使用页面滚动的性能，好于使用scroll-view的区域滚动。uni ui封装了uList组件，强烈推荐开发者使用，避免自己写的不好产生性能问题。

如需要左右滑动的长列表，请在HBuilderX新建uni-app项目选新闻模板，那是一个标杆实现。自己用swiper和scroll-view做很容易引发性能问题。

#### 减少一次性渲染的节点数量
页面初始化时，逻辑层如果一次性向视图层传递很大的数据，使视图层一次性渲染大量节点，可能造成通讯变慢、页面切换卡顿，所以建议以局部更新页面的方式渲染页面。如：服务端返回100条数据，可进行分批加载，一次加载50条，500ms 后进行下一次加载。

#### 减少节点嵌套层级
深层嵌套的节点在页面初始化构建时往往需要更多的内存占用，并且在遍历节点时也会更慢些，所以建议减少深层的节点嵌套。

避免视图层和逻辑层频繁进行通讯

减少 scroll-view 组件的 scroll 事件监听，当监听 scroll-view 的滚动事件时，视图层会频繁的向逻辑层发送数据；

监听 scroll-view 组件的滚动事件时，不要实时的改变 scroll-top/scroll-left 属性，因为监听滚动时，视图层向逻辑层通讯，改变 scroll-top/scroll-left 时，逻辑层又向视图层通讯，这样就可能造成通讯卡顿。

注意 onPageScroll 的使用，onPageScroll 进行监听时，视图层会频繁的向逻辑层发送数据；

多使用css动画，而不是通过js的定时器操作界面做动画

如果是canvas里做跟手操作，建议使用web-view组件。web-view里的页面没有逻辑层和视图层分离的概念，自然也不会有通信折损。

#### 优化页面切换动画
页面初始化时若存在大量图片或原生组件渲染和大量数据通讯，会发生新页面渲染和窗体进入动画抢资源，造成页面切换卡顿、掉帧。建议延时100ms~300ms渲染图片或复杂原生组件，分批进行数据通讯，以减少一次性渲染的节点数量。

App端动画效果可以自定义。popin/popout的双窗体联动挤压动画效果对资源的消耗更大，如果动画期间页面里在执行耗时的js，可能会造成动画掉帧。此时可以使用消耗资源更小的动画效果，比如slide-in-right/slide-out-right。

#### 优化背景色闪白
如果页面背景是深色，在vue页面中可能会发生新窗体刚开始动画时是灰白色背景，动画结束时才变为深色背景，造成闪屏。这是因为webview的背景生效太慢的问题。此时需将样式写在 App.vue 里，可以加速页面样式渲染速度。App.vue 里面的样式是全局样式，每次新开页面会优先加载 App.vue 里面的样式，然后加载普通 vue 页面的样式。

还可以在pages.json的globalStyle->style->app-plus->background下配置全局背景色

```
"style": {  
  "app-plus": {  
      "background":"#000000"
  }  
}
```

#### 使用nvue代替vue
在 App 端 uni-app 的 nvue 页面可是基于 weex 定制的原生渲染引擎，实现了页面原生渲染能力、提高了页面流畅性。若对页面性能要求较高可以使用此方式开发，详见：nvue。

#### 优化启动速度
工程代码越多，包括背景图和本地字体文件越大，对App的启动速度有影响，应注意控制体积。组件引用的前景图不影响性能。

App端的 splash 关闭有白屏检测机制，如果首页一直白屏或首页本身就是一个空的中转页面，可能会造成 splash 10秒才关闭，可参考此文解决https://ask.dcloud.net.cn/article/35565

App端使用自定义组件模式时启动速度更快，首页为nvue页面时启动速度更快

App设置为纯nvue项目（manifest里设置app-plus下的renderer:"native"），这种项目的启动速度更快，2秒即可完成启动。因为它整个应用都使用原生渲染，不加载基于webview的那套框架。

#### 优化包体积
uni-app发行到小程序时，自带引擎只有几十K，主要是一个定制过的vue.js核心库。如果使用了es6转es5、css对齐的功能，可能会增大代码体积，可以配置这些编译功能是否开启。

uni-app的H5端，自带了vue.js、vue-router及部分es6 polyfill库，这部分的体积gzip后只有92k，和web开发使用vue基本一致。而内置组件ui库（如picker、switch等）、小程序的对齐js api等，相当于一个完善的大型ui库。但大多数应用不会用到所有内置组件和API。由此uni-app提供了摇树优化机制，未摇树优化前的uni-app整体包体积约500k，服务器部署gzip后162k。开启摇树优化需在manifest配置，详情。

uni-app的App端，因为自带了一个独立v8引擎和小程序框架，所以比HTML5Plus或mui等普通hybrid的App引擎体积要大。Android基础引擎约15M。App还提供了扩展模块，比如地图、蓝牙等，打包时如不需要这些模块，可以裁剪掉，以缩小发行包体积。在 manifest.json-App模块权限 里可以选择。

App端支持如果选择纯nvue项目（manifest里设置app-plus下的renderer:"native"），包体积可以进一步减少2M左右。

uni-app的App端默认包含arm32和x86两个cpu的支持so库。这会增大包体积。如果你在意体积控制，可以在manifest里去掉x86 cpu的支持（manifest可视化界面-App其他设置里选择cpu），这可以减少包体积到9M。但代价是不支持intel的cpu了。一般手机都是arm的，仅个别少见的Android pad使用x86 cpu。另外as的模拟器里如果选择x86时也无法运行这种apk。

### 29.开放生态
1.uni-app插件市场

2.兼容 微信小程序 JS SDK 丰富的小程序生态内容可直接引入uni-app，并且在App侧通用。以前的跨平台开发框架普遍缺少三方SDK，由于大量SDK厂商均原厂维护小程序SDK，使得uni-app成为跨平台开发框架里生态最丰富的平台参考

3.兼容 微信小程序自定义组件 小程序自定义组件是一种ui组件，uni-app里可以在App、H5、微信小程序、QQ小程序同时兼容微信小程序自定义组件

4.兼容 NPM 包管理系统 uni-app完整支持 NPM 

5.兼容 mpvue 项目及组件 mpvue同样基于vue语法，但支持完善度不如uni-app，是uni-app的子集。mpvue的组件可以在uni-app里直接使用并全端通用。项目代码可以快速移植到uni-app

6.兼容 weex 插件生态 uni-app内置了weex，weex的原生插件或ui库均可使用。注意weex的生态不如uni-app丰富，一般情况建议使用uni-app的插件市场。

7.兼容 普通 web 库 uni-app的H5端支持所有浏览器API。但众所周知，由于小程序的js不运行在浏览器里，所以小程序里不支持 HTML 和 DOM 的 API。

```
App端支持各种调用原生能力的方式
支持 原生混合开发
支持 比小程序能力更多的plus JSAPI
支持 Native.js 直接调用原生api
支持 原生插件扩展
支持 云打包原生插件。

App端支持双渲染引擎 uni-app逻辑层在独立jscore，而渲染层可选
webview渲染和weex引擎渲染。

使用webview渲染则整个架构与小程序相同，
此时页面后缀为vue文件。
使用weex引擎（经过改造）渲染，则整个架构
与快应用相同，此时页面后缀为nvue文件。
使用webview渲染时，可以指定由系统webview渲染
还是由x5引擎渲染。
```

### 30.开源项目汇总
[开源项目汇总](https://uniapp.dcloud.io/casecode)

### 31.uni-app 全局变量的几种实现方式
#### 公用模块
定义一个专用的模块，用来组织和管理这些全局的变量，在需要的页面引入。

注意这种方式只支持多个vue页面或多个nvue页面之间公用，vue和nvue之间不公用。

#### 挂载 Vue.prototype
将一些使用频率较高的常量或者方法，直接扩展到 Vue.prototype 上，每个 Vue 对象都会“继承”下来。

注意这种方式只支持vue页面

在 main.js 中挂载属性/方法

```
Vue.prototype.websiteUrl = 'http://uniapp.dcloud.io';  
Vue.prototype.now = Date.now || function () {  
    return new Date().getTime();  
};  
Vue.prototype.isArray = Array.isArray || function (obj) {  
    return obj instanceof Array;  
};
```

然后在 pages/index/index.vue 中调用

```
<script>  
    export default {  
        data() {  
            return {};  
        },  
        onLoad(){  
            console.log('now:' + this.now());  
        },  
        methods: {  
        }  
    }  
</script>
```

这种方式，只需要在 main.js 中定义好即可在每个页面中直接调用。

**注意**

```
每个页面中不要在出现重复的属性或方法名。
建议在 Vue.prototype 上挂载的属性或方法，可以加一个统一的前缀。比如 $url、global_url 这样，在阅读代码时也容易与当前页面的内容区分开。
```

#### globalData
小程序中有个globalData概念，可以在 App 上声明全局变量。 Vue 之前是没有这类概念的，但 uni-app 引入了globalData概念，并且在包括H5、App等平台都实现了。
在 App.vue 可以定义 globalData ，也可以使用 API 读写这个值。

globalData支持vue和nvue共享数据。

globalData是一种比较简单的全局变量使用方式。

定义：App.vue

```
<script>  
    export default {  
        globalData: {  
            text: 'text'  
        },  
        onLaunch: function() {  
            console.log('App Launch')  
        },  
        onShow: function() {  
            console.log('App Show')  
        },  
        onHide: function() {  
            console.log('App Hide')  
        }  
    }  
</script>  

<style>  
    /*每个页面公共css */  
</style>  
```

js中操作globalData的方式如下：

赋值：getApp().globalData.text = 'test'

取值：console.log(getApp().globalData.text) // 'test'

如果需要把globalData的数据绑定到页面上，可在页面的onshow声明周期里进行变量重赋值。HBuilderX 2.0.3起，nvue页面在uni-app编译模式下，也支持onshow。

#### Vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

在 uni-app 项目根目录下新建 store 目录，在 store 目录下创建 index.js 定义状态值

```
const store = new Vuex.Store({  
    state: {  
        login: false,  
        token: '',  
        avatarUrl: '',  
        userName: ''  
    },  
    mutations: {  
        login(state, provider) {  
            console.log(state)  
            console.log(provider)  
            state.login = true;  
            state.token = provider.token;  
            state.userName = provider.userName;  
            state.avatarUrl = provider.avatarUrl;  
        },  
        logout(state) {  
            state.login = false;  
            state.token = '';  
            state.userName = '';  
            state.avatarUrl = '';  
        }  
    }  
})
```

然后，需要在 main.js 挂载 Vuex

```
import store from './store'  
Vue.prototype.$store = store
```

最后，在 pages/index/index.vue 使用

```
<script>  
    import {  
        mapState,  
        mapMutations  
    } from 'vuex';  

    export default {  
        computed: {  
            ...mapState(['avatarUrl', 'login', 'userName'])  
        },  
        methods: {  
            ...mapMutations(['logout'])  
        }  
    }  
</script>
```

注意：对比前面的方式，该方式更加适合处理全局的并且值会发生变化的情况。

#### 注意事项
.vue 和 .nvue 并不是一个规范，因此一些在 .vue 中适用的方案并不适用于 .nvue。 Vue 上挂载属性，不能在 .nvue 中使用。

### 32.可用UI框架
uni-app内置组件是最常用的，与微信内置组件相同。
不要把简单的button都使用三方组件库来做，那样会降低性能。

建议使用uni ui最好，原生性能好。

### 33.uni-app导航栏开发指南
[uni-app导航栏开发](https://ask.dcloud.net.cn/article/34921)

### 34.uni-app 引用 npm 第三方库
[引用 npm 第三方库](https://ask.dcloud.net.cn/article/19727)

### 35.uni-app 中使用微信小程序第三方 SDK 及资源汇总
[第三方 SDK 及资源汇总](https://ask.dcloud.net.cn/article/35070)

### 36.原生控件层级过高无法覆盖的解决方案
[原生控件层级过高无法覆盖的解决方案](https://uniapp.dcloud.io/component/native-component)

### 37.uni-app 选择和上传非图像、视频文件
[uni-app 选择和上传非图像、视频文件](https://ask.dcloud.net.cn/article/35547)

### 38.uni-app国际化/多语言指南
[uni-app国际化/多语言指南](https://ask.dcloud.net.cn/article/35872)

### 39.App/uni-app离线本地存储方案
[App/uni-app离线本地存储方案](https://ask.dcloud.net.cn/article/166)

### 40.uni-app 整包升级/更新方案
[uni-app 整包升级/更新方案](https://ask.dcloud.net.cn/article/34972)

### 41.uni-app 资源在线升级/热更新
[uni-app 资源在线升级/热更新](https://ask.dcloud.net.cn/article/35667)

### 42.App全面屏、安全区、刘海屏适配
[App全面屏、安全区、刘海屏适配](https://ask.dcloud.net.cn/article/35564)

### 43.App权限判断和提示
[App权限判断和提示](https://ask.dcloud.net.cn/article/35564)

### 44.Android平台隐私与政策提示框配置方法
[Android平台隐私与政策提示框配置方法](Android平台隐私与政策提示框配置方法)

### 45.Android平台应用启动时读写手机存储、访问设备信息(如IMEI)等权限策略及提示信息
[Android平台应用启动时读写手机存储、访问设备信息(如IMEI)等权限策略及提示信息](https://ask.dcloud.net.cn/article/36549)

### 46.App打包前端代码进行加密
[App打包前端代码进行加密](https://ask.dcloud.net.cn/article/36437)

### 47.uni-app 中使用 5+ 的原生界面控件（包括map、video、livepusher、barcode、nview）
[uni-app 中使用 5+ 的原生界面控件（包括map、video、livepusher、barcode、nview）](https://ask.dcloud.net.cn/article/35036)

### 48.App分享到微信时分享为小程序
[使用plus.share，设置分享类型为miniProgram](https://www.html5plus.org/doc/zh_cn/share.html#plus.share.WeixinMiniProgramOptions)

注意uni-app不需要plus ready，将plus ready里的代码写到页面的onLoad生命周期即可

### 49.App启动微信小程序
[使用plus.share的launchMiniProgram](https://www.html5plus.org/doc/zh_cn/share.html#plus.share.ShareService.launchMiniProgram)

注意uni-app不需要plus ready，将plus ready里的代码写到页面的onLoad生命周期即可

### 50.App初期启动的引导轮播
因为是App专用，为了更好的性能，推荐使用nvue制作。参考插件市场已经封装的插件.
[App初期启动的引导轮播](https://ext.dcloud.net.cn/plugin?id=676)

### 51.原生App和uni-app混合开发
[原生App和uni-app混合开发](https://uniapp.dcloud.io/hybrid)

### 52.uni-app 的 H5版使用注意事项
[开发微信公众号（H5）JSSDK](https://ask.dcloud.net.cn/article/35232)

### 53.开发微信公众号（H5）JSSDK
[开发微信公众号（H5）JSSDK](https://ask.dcloud.net.cn/article/35380)
<br>
<br>
<br>
<br>
<br>
<br>



## 二、uni-app框架
### 1.pages.json
pages.json 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。

它类似微信小程序中app.json的页面管理部分。注意定位权限申请等原属于app.json的内容，在uni-app中是在manifest中配置。

属性 | 类型 | 必填 | 描述 | 平台兼容
-- | -- | -- | -- | --
globalStyle | Object | 否 | 设置默认页面的窗口表现	
pages | Object Array | 是 | 设置页面路径及窗口表现	
easycom | Object | 否 | 组件自动引入规则 | 2.5.5+
tabBar | Object | 否 | 设置底部 tab 的表现	
condition | Object | 否 | 启动模式配置	
subPackages | Object Array | 否	分包加载配置	
preloadRule | Object | 否 | 分包预下载规则 | 微信小程序
workers | String | 否 | Worker 代码放置的目录 | 微信小程序

```
{
    "pages": [{
        "path": "pages/component/index",
        "style": {
            "navigationBarTitleText": "组件"
        }
    }, {
        "path": "pages/API/index",
        "style": {
            "navigationBarTitleText": "接口"
        }
    }, {
        "path": "pages/component/view/index",
        "style": {
            "navigationBarTitleText": "view"
        }
    }],
    "condition": { //模式配置，仅开发期间生效
        "current": 0, //当前激活的模式（list 的索引项）
        "list": [{
            "name": "test", //模式名称
            "path": "pages/component/view/index" //启动页面，必选
        }]
    },
    "globalStyle": {
        "navigationBarTextStyle": "black",
        "navigationBarTitleText": "演示",
        "navigationBarBackgroundColor": "#F8F8F8",
        "backgroundColor": "#F8F8F8",
        "usingComponents":{
            "collapse-tree-item":"/components/collapse-tree-item"
        },
    "pageOrientation": "portrait"//横屏配置，全局屏幕旋转设置(仅 APP/微信/QQ小程序)，支持 auto / portrait / landscape
    },
    "tabBar": {
        "color": "#7A7E83",
        "selectedColor": "#3cc51f",
        "borderStyle": "black",
        "backgroundColor": "#ffffff",
        "height": "50px",
        "fontSize": "10px",
        "iconWidth": "24px",
        "spacing": "3px",
        "list": [{
            "pagePath": "pages/component/index",
            "iconPath": "static/image/icon_component.png",
            "selectedIconPath": "static/image/icon_component_HL.png",
            "text": "组件"
        }, {
            "pagePath": "pages/API/index",
            "iconPath": "static/image/icon_API.png",
            "selectedIconPath": "static/image/icon_API_HL.png",
            "text": "接口"
        }],
        "midButton": {
            "width": "80px",
            "height": "50px",
            "text": "文字",
            "iconPath": "static/image/midButton_iconPath.png",
            "iconWidth": "24px",
            "backgroundImage": "static/image/midButton_backgroundImage.png"
        }
    },
  "easycom": {
    "autoscan": true, //是否自动扫描组件
    "custom": {//自定义扫描规则
      "uni-(.*)": "@/components/uni-$1.vue"
    }
  }
}
```

### 2.manifest.json 文件是应用的配置文件，用于指定应用的名称、图标、权限等。

属性 | 类型 | 默认值 | 描述 | 最低版本
-- | -- | -- | -- | -- | --
name | String |  | 应用名称 | 
appid | String | 新建 uni-app 项目时，DCloud 云端分配。用途详见 | 应用标识 | 	
description | String |  | 应用描述 | 
versionName | String |  | 版本名称，例如：1.0.0。详见下方Tips说明 | 	
versionCode | String |  | 版本号，例如：36 | 	
transformPx | Boolean | true | 是否转换项目的px，为true时将px转换为rpx，为false时，px为传统的实际像素 | 	
networkTimeout | Object  |  | 网络超时时间，详见 | 	
debug | Boolean | false | 是否开启 debug 模式，开启后调试信息以 info 的形式给出，其信息有页面的注册，页面路由，数据更新，事件触发等 | 
uniStatistics | Object |  | 是否开启 uni 统计，全局配置 | 2.2.3+
app-plus | Object |  | App 特有配置 | 
h5 | Object |  | H5 特有配置 | 	
quickapp | Object |  | 快应用特有配置，即将支持 | 	
mp-weixin | Object |  | 微信小程序特有配置 | 	
mp-alipay | Object |  | 支付宝小程序未提供可配置项 | 
mp-baidu | Object |  | 百度小程序特有配置 | 
mp-toutiao | Object |  | 字节跳动小程序特有配置 | 1.6.0
mp-qq | Object |  | qq 小程序特有配置 | 2.1.0

### 3.package.json
通过在package.json文件中增加uni-app扩展节点，可实现自定义条件编译平台（如钉钉小程序、微信服务号等平台）。

package.json扩展配置用法（拷贝代码记得去掉注释！）：

```
{
    /**
     package.json其它原有配置 
     */
    "uni-app": {// 扩展配置
        "scripts": {
            "custom-platform": { //自定义编译平台配置，可通过cli方式调用
                "title":"自定义扩展名称", // 在HBuilderX中会显示在 运行/发行 菜单中
                "BROWSER":"",  //运行到的目标浏览器，仅当UNI_PLATFORM为h5时有效
                "env": {//环境变量
                    "UNI_PLATFORM": ""  //基准平台 
                 },
                "define": { //自定义条件编译
                    "CUSTOM-CONST": true //自定义条件编译常量，建议为大写
                }
            }
        }    
    }
}
```

### 4.vue.config.js
vue.config.js是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被自动加载，一般用于配置 webpack 等编译选项

### 5.uni.scss
uni.scss文件的用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格，uni.scss文件里预置了一批scss变量预置。

uni-app 官方扩展插件（uni ui）及 插件市场 上很多三方插件均使用了这些样式变量，如果你是插件开发者，建议你使用 scss 预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App。

uni.scss是一个特殊文件，在代码中无需 import 这个文件即可在scss代码中使用这里的样式变量。uni-app的编译器在webpack配置中特殊处理了这个uni.scss，使得每个scss文件都被注入这个uni.scss，达到全局可用的效果。如果开发者想要less、stylus的全局使用，需要在vue.config.js中自行配置webpack策略。

### 6.App.vue
App.vue是uni-app的主组件，所有页面都是在App.vue下进行切换的，是页面入口文件。但App.vue本身不是页面，这里不能编写视图元素。

这个文件的作用包括：调用应用生命周期函数、配置全局样式、配置全局的存储globalData

应用生命周期仅可在App.vue中监听，在页面监听无效。

### 7.main.js
main.js是uni-app的入口文件，主要作用是初始化vue实例、定义全局组件、使用需要的插件如vuex。

### 8.框架接口
#### 日志打印

```
console.debug()
console.log()
console.info()
console.warn()
console.error()
```

#### 定时器

参数说明
参数 | 类型 | 必填 | 说明
-- | -- | -- | --
callback | Function | 是 | 回调函数
delay | Number | 否 | 延迟的时间，函数的调用会在该延迟之后发生，单位 ms
rest | Any | 否 | param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数

返回值

返回值 | 类型 | 说明
-- | -- | --
timeoutID | Number | 定时器的编号，这个值可以传递给 clearTimeout 来取消该定时
```
setTimeout(callback, delay, rest)

clearTimeout(timeoutID)

setInterval(callback, delay, rest)

clearInterval(intervalID)
```

#### 生命周期
##### 应用生命周期

函数名 | 说明
-- | --
onLaunch | 当uni-app 初始化完成时触发（全局只触发一次）
onShow | 当 uni-app 启动，或从后台进入前台显示
onHide | 当 uni-app 从前台进入后台
onError | 当 uni-app 报错时触发
onUniNViewMessage | 对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯

应用生命周期仅可在App.vue中监听，在其它页面监听无效

```
<script>
    // 只能在App.vue里监听应用的生命周期
    export default {
        onLaunch: function() {
            console.log('App Launch')
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>
```

##### 页面生命周期

函数名 | 说明 | 平台差异说明 | 最低版本
-- | -- | -- | --
onLoad | 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参），参考示例 |  | 		
onShow | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面		
onReady | 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发 |  | 	
onHide | 监听页面隐藏 |  | 	
onUnload | 监听页面卸载 |  | 	
onResize | 监听窗口尺寸变化 | App、微信小程序 | 	
onPullDownRefresh | 监听用户下拉动作，一般用于下拉刷新，参考示例 |  | 	
onReachBottom | 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项 |  | 	
onTabItemTap | 点击 tab 时触发，参数为Object，具体见下方注意事项 | 微信小程序、支付宝小程序、百度小程序、H5、App（自定义组件模式） | 
onShareAppMessage | 用户点击右上角分享 | 微信小程序、百度小程序、字节跳动小程序、支付宝小程序 | 
onPageScroll | 监听页面滚动，参数为Object | nvue暂不支持 | 
onNavigationBarButtonTap | 监听原生标题栏按钮点击事件，参数为Object | App、H5 | 
onBackPress | 监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：onBackPress 详解。支付宝小程序只有真机能触发，只能监听非navigateBack引起的返回，不可阻止默认行为。 | app、H5、支付宝小程序 | 
onNavigationBarSearchInputChanged | 监听原生标题栏搜索输入框输入内容变化事件 | App、H5 | 1.6.0
onNavigationBarSearchInputConfirmed | 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。 | App、H5 | 1.6.0
onNavigationBarSearchInputClicked | 监听原生标题栏搜索输入框点击事件 | App、H5 | 1.6.0

##### 组件生命周期
uni-app 组件支持的生命周期，与vue标准组件的生命周期相同。这里没有页面级的onLoad等生命周期：

函数名 | 说明 | 平台差异说明 | 最低版本
-- | -- | -- | --
beforeCreate | 在实例初始化之后被调用。详见 |  | 		
created | 在实例创建完成后被立即调用。详见 |  | 	
beforeMount | 在挂载开始之前被调用。详见 |  | 	
mounted | 挂载到实例上去之后调用。详见 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用$nextTickVue官方文档 |  | 	
beforeUpdate | 数据更新时调用，发生在虚拟 DOM 打补丁之前。详见 | 仅H5平台支持 | 
updated | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。详见 | 仅H5平台支持 | 
beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。详见		
destroyed	Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。详见 |  | 

#### 页面
##### getApp()
getApp()函数用于获取当前应用实例，一般用于获取globalData 。

##### getCurrentPages()
getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。

##### $getAppWebview()
uni-app 在 getCurrentPages()获得的页面里内置了一个方法 $getAppWebview() 可以得到当前webview的对象实例，从而实现对 webview 更强大的控制。在 html5Plus 中，plus.webview具有强大的控制能力

#### 页面通讯
##### uni.$emit(eventName,OBJECT)
触发全局的自定事件。附加参数都会传给监听器回调。

```
uni.$emit('update',{msg:'页面更新'})
```

##### uni.$on(eventName,callback)
监听全局的自定义事件。事件可以由 uni.$emit 触发，回调函数会接收所有传入事件触发函数的额外参数。

```
uni.$on('update',function(data){
    console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
})
```

##### uni.$once(eventName,callback)
监听全局的自定义事件。事件可以由 uni.$emit 触发，但是只触发一次，在第一次触发之后移除监听器。

```
uni.$once('update',function(data){
    console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
})
```

##### uni.$off([eventName, callback])
移除全局自定义事件监听器。
