---
title: vue项目常见问题解决方案
date: 2020-11-16 15:59:00
tags:
- VUE
categories:
- VUE
---
#### 一、页面权限控制
##### 1.1 思路
页面权限控制是什么意思呢？

就是一个网站有不同的角色，比如管理员和普通用户，要求不同的角色能访问的页面是不一样的。如果一个页面，有角色越权访问，这时就得做出限制了。

一种方法是通过动态添加路由和菜单来做控制，不能访问的页面不添加到路由表里，这是其中一种办法。具体细节请看下一节的《动态菜单》。

另一种办法就是所有的页面都在路由表里，只是在访问的时候要判断一下角色权限。如果有权限就允许访问，没有权限就拒绝，跳转到 404 页面。

**在每一个路由的 meta 属性里，将能访问该路由的角色添加到 roles 里。用户每次登陆后，将用户的角色返回。然后在访问页面时，把路由的 meta 属性和用户的角色进行对比，如果用户的角色在路由的 roles 里，那就是能访问，如果不在就拒绝访问。**

##### 1.2 代码实现
路由信息

```
routes: [
    {
        path: '/login',
        name: 'login',
        meta: {
            roles: ['admin', 'user']
        },
        component: () => import('../components/Login.vue')
    },
    {
        path: 'home',
        name: 'home',
        meta: {
            roles: ['admin']
        },
        component: () => import('../views/Home.vue')
    },
]
```

页面控制

```
// 假设角色有两种：admin 和 user
// 这里是从后台获取的用户角色
const role = 'user'
// 在进入一个页面前会触发 router.beforeEach 事件
router.beforeEach((to, from, next) => {
    if (to.meta.roles.includes(role)) {
        next()
    } else {
        next({path: '/404'})
    }
})
```

#### 二、登录验证
网站一般只要登陆过一次后，接下来该网站的其他页面都是可以直接访问的，不用再次登陆。 我们可以通过 token 或 cookie 来实现，下面用代码来展示一下如何用 token 控制登陆验证。

```
router.beforeEach((to, from, next) => {
    // 如果有token 说明该用户已登陆
    if (localStorage.getItem('token')) {
        // 在已登陆的情况下访问登陆页会重定向到首页
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            next({path: to.path || '/'})
        }
    } else {
        // 没有登陆则访问任何页面都重定向到登陆页
        if (to.path === '/login') {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})
```

#### 三、动态菜单
##### 3.1 动态添加路由
利用 vue-router 的 addRoutes 方法可以动态添加路由。

先看一下官方介绍：

router.addRoutes

```
router.addRoutes(routes: Array<RouteConfig>)
```

动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。

举个例子：

```
const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../components/Login.vue')
        },
        {path: '/', redirect: '/home'},
    ]   
})
```

上面的代码和下面的代码效果是一样的

```
const router = new Router({
    routes: [
        {path: '/', redirect: '/home'},
    ]   
})

router.addRoutes([
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    }
])
```

在动态添加路由的过程中，如果有 404 页面，一定要放在最后添加，否则在登陆的时候添加完页面会重定向到 404 页面。

类似于这样，这种规则一定要最后添加。

```
{path: '*', redirect: '/404'}
```

##### 3.2 动态生成菜单
假设后台返回来的数据长这样：

```
// 左侧菜单栏数据
menuItems: [
    {
        name: 'home', // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: 'md-home', // icon类型
        text: '主页' // 文本内容
    },
    {
        text: '二级菜单',
        type: 'ios-paper',
        children: [
            {
                type: 'ios-grid',
                name: 't1',
                text: '表格'
            },
            {
                text: '三级菜单',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-notifications-outline',
                        name: 'msg',
                        text: '查看消息'
                    },
                ]
            }
        ]
    }
]
```

来看看怎么将它转化为菜单栏，我在这里使用了 iview 的组件，不用重复造轮子。

```
<!-- 菜单栏 -->
<Menu ref="asideMenu" theme="dark" width="100%" @on-select="gotoPage" 
accordion :open-names="openMenus" :active-name="currentPage" @on-open-change="menuChange">
    <!-- 动态菜单 -->
    <div v-for="(item, index) in menuItems" :key="index">
        <Submenu v-if="item.children" :name="index">
            <template slot="title">
                <Icon :size="item.size" :type="item.type"/>
                <span v-show="isShowAsideTitle">{{item.text}}</span>
            </template>
            <div v-for="(subItem, i) in item.children" :key="index + i">
                <Submenu v-if="subItem.children" :name="index + '-' + i">
                    <template slot="title">
                        <Icon :size="subItem.size" :type="subItem.type"/>
                        <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                    </template>
                    <MenuItem class="menu-level-3" v-for="(threeItem, k) in subItem.children" :name="threeItem.name" :key="index + i + k">
                        <Icon :size="threeItem.size" :type="threeItem.type"/>
                        <span v-show="isShowAsideTitle">{{threeItem.text}}</span>
                    </MenuItem>
                </Submenu>
                <MenuItem v-else v-show="isShowAsideTitle" :name="subItem.name">
                    <Icon :size="subItem.size" :type="subItem.type"/>
                    <span v-show="isShowAsideTitle">{{subItem.text}}</span>
                </MenuItem>
            </div>
        </Submenu>
        <MenuItem v-else :name="item.name">
            <Icon :size="item.size" :type="item.type" />
            <span v-show="isShowAsideTitle">{{item.text}}</span>
        </MenuItem>
    </div>
</Menu>
```

代码不用看得太仔细，理解原理即可，其实就是通过三次 v-for 不停的对子数组进行循环，生成三级菜单。

不过这个动态菜单有缺陷，就是只支持三级菜单。一个更好的做法是把生成菜单的过程封装成组件，然后递归调用，这样就能支持无限级的菜单。在生菜菜单时，需要判断一下是否还有子菜单，如果有就递归调用组件。

动态路由因为上面已经说过了用 addRoutes 来实现，现在看看具体怎么做。

首先，要把项目所有的页面路由都列出来，再用后台返回来的数据动态匹配，能匹配上的就把路由加上，不能匹配上的就不加。
最后把这个新生成的路由数据用 addRoutes 添加到路由表里。

```
const asyncRoutes = {
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    't1': {
        path: 't1',
        name: 't1',
        component: () => import('../views/T1.vue')
    },
    'password': {
        path: 'password',
        name: 'password',
        component: () => import('../views/Password.vue')
    },
    'msg': {
        path: 'msg',
        name: 'msg',
        component: () => import('../views/Msg.vue')
    },
    'userinfo': {
        path: 'userinfo',
        name: 'userinfo',
        component: () => import('../views/UserInfo.vue')
    }
}

// 传入后台数据 生成路由表
menusToRoutes(menusData)

// 将菜单信息转成对应的路由信息 动态添加
function menusToRoutes(data) {
    const result = []
    const children = []

    result.push({
        path: '/',
        component: () => import('../components/Index.vue'),
        children,
    })

    data.forEach(item => {
        generateRoutes(children, item)
    })

    children.push({
        path: 'error',
        name: 'error',
        component: () => import('../components/Error.vue')
    })

    // 最后添加404页面 否则会在登陆成功后跳到404页面
    result.push(
        {path: '*', redirect: '/error'},
    )

    return result
}

function generateRoutes(children, item) {
    if (item.name) {
        children.push(asyncRoutes[item.name])
    } else if (item.children) {
        item.children.forEach(e => {
            generateRoutes(children, e)
        })
    }
}
```

动态菜单的代码实现放在 github 上，分别放在这个项目的 src/components/Index.vue、src/permission.js 和 src/utils/index.js 文件里。

#### 四、前进刷新后退不刷新

##### 4.1 需求一

在一个列表页中，第一次进入的时候，请求获取数据。

点击某个列表项，跳到详情页，再从详情页后退回到列表页时，不刷新。

也就是说从其他页面进到列表页，需要刷新获取数据，从详情页返回到列表页时不要刷新。

**解决方案**

在 App.vue设置：

```
<keep-alive include="list">
    <router-view/>
</keep-alive>
```

假设列表页为 list.vue，详情页为 detail.vue，这两个都是子组件。

我们在 keep-alive 添加列表页的名字，缓存列表页。

然后在列表页的 created 函数里添加 ajax 请求，这样只有第一次进入到列表页的时候才会请求数据，当从列表页跳到详情页，再从详情页回来的时候，列表页就不会刷新。

##### 4.2 需求二
在需求一的基础上，再加一个要求：可以在详情页中删除对应的列表项，这时返回到列表页时需要刷新重新获取数据。

**解决方案二一**
我们可以在路由配置文件上对 detail.vue 增加一个 meta 属性。

```
{
    path: '/detail',
    name: 'detail',
    component: () => import('../view/detail.vue'),
    meta: {isRefresh: true}
},
```

这个 meta 属性，可以在详情页中通过 this.$route.meta.isRefresh 来读取和设置。

设置完这个属性，还要在 App.vue 文件里设置 watch 一下 $route 属性。

```
watch: {
    $route(to, from) {
        const fname = from.name
        const tname = to.name
        if (from.meta.isRefresh || (fname != 'detail' && tname == 'list')) {
            from.meta.isRefresh = false
      // 在这里重新请求数据
        }
    }
},
```

这样就不需要在列表页的 created 函数里用 ajax 来请求数据了，统一放在 App.vue 里来处理。

触发请求数据有两个条件：

- 从其他页面（除了详情页）进来列表时，需要请求数据。
- 从详情页返回到列表页时，如果详情页 meta 属性中的 isRefresh 为 true，也需要重新请求数据。

当我们在详情页中删除了对应的列表项时，就可以将详情页 meta 属性中的 isRefresh 设为 true。这时再返回到列表页，页面会重新刷新。

**解决方案二**

对于需求二其实还有一个更简洁的方案，那就是使用 router-view 的 key 属性。

```
<keep-alive>
    <router-view :key="$route.fullPath"/>
</keep-alive>
```

首先 keep-alive 让所有页面都缓存，当你不想缓存某个路由页面，要重新加载它时，可以在跳转时传一个随机字符串，这样它就能重新加载了。

例如从列表页进入了详情页，然后在详情页中删除了列表页中的某个选项，此时从详情页退回列表页时就要刷新，我们可以这样跳转：

```
this.$router.push({
    path: '/list',
    query: { 'randomID': 'id' + Math.random() },
})
```

#### 五、多个请求下 loading 的展示与关闭
一般情况下，在 vue 中结合 axios 的拦截器控制 loading 展示和关闭，是这样的：

在 App.vue 配置一个全局 loading。

```
<div class="app">
    <keep-alive :include="keepAliveData">
        <router-view/>
    </keep-alive>
    <div class="loading" v-show="isShowLoading">
        <Spin size="large"></Spin>
    </div>
</div>
```

同时设置 axios 拦截器。

```
 // 添加请求拦截器
 this.$axios.interceptors.request.use(config => {
     this.isShowLoading = true
     return config
 }, error => {
     this.isShowLoading = false
     return Promise.reject(error)
 })

 // 添加响应拦截器
 this.$axios.interceptors.response.use(response => {
     this.isShowLoading = false
     return response
 }, error => {
     this.isShowLoading = false
     return Promise.reject(error)
 })
```

这个拦截器的功能是在请求前打开 loading，请求结束或出错时关闭 loading。

如果每次只有一个请求，这样运行是没问题的。但同时有多个请求并发，就会有问题了。

*举例：*

假如现在同时发起两个请求，在请求前，拦截器 this.isShowLoading = true 将 loading 打开。

现在有一个请求结束了。this.isShowLoading = false 拦截器关闭 loading，但是另一个请求由于某些原因并没有结束。

造成的后果就是页面请求还没完成，loading 却关闭了，用户会以为页面加载完成了，结果页面不能正常运行，导致用户体验不好。

*解决方案*

增加一个 loadingCount 变量，用来计算请求的次数。

```
loadingCount: 0
```

再增加两个方法，来对 loadingCount 进行增减操作。

```
methods: {
    addLoading() {
        this.isShowLoading = true
        this.loadingCount++
    },

    isCloseLoading() {
        this.loadingCount--
        if (this.loadingCount == 0) {
            this.isShowLoading = false
        }
    }
}
```

现在拦截器变成这样：

```
// 添加请求拦截器
this.$axios.interceptors.request.use(config => {
    this.addLoading()
    return config
}, error => {
    this.isShowLoading = false
    this.loadingCount = 0
    this.$Message.error('网络异常，请稍后再试')
    return Promise.reject(error)
})

// 添加响应拦截器
this.$axios.interceptors.response.use(response => {
    this.isCloseLoading()
    return response
}, error => {
    this.isShowLoading = false
    this.loadingCount = 0
    this.$Message.error('网络异常，请稍后再试')
    return Promise.reject(error)
})
```

这个拦截器的功能是：

每当发起一个请求，打开 loading，同时 loadingCount 加1。

每当一个请求结束， loadingCount 减1，并判断  loadingCount 是否为 0，如果为 0，则关闭 loading。

这样即可解决，多个请求下有某个请求提前结束，导致 loading 关闭的问题。

#### 六、表格打印
打印需要用到的组件为 print-js

*普通表格打印*

一般的表格打印直接仿照组件提供的例子就可以了。

```
printJS({
    printable: id, // DOM id
    type: 'html',
    scanStyles: false,
})
```

*element-ui 表格打印（其他组件库的表格同理）*

element-ui 的表格，表面上看起来是一个表格，实际上是由两个表格组成的。

表头为一个表格，表体又是个表格，这就导致了一个问题：打印的时候表体和表头错位。

![vue016](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue016.jpg)

另外，在表格出现滚动条的时候，也会造成错位。

![vue017](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue017.jpg)

*解决方案*

我的思路是将两个表格合成一个表格，print-js 组件打印的时候，实际上是把 id 对应的 DOM 里的内容提取出来打印。
所以，在传入 id 之前，可以先把表头所在的表格内容提取出来，插入到第二个表格里，从而将两个表格合并，这时候打印就不会有错位的问题了。

```
function printHTML(id) {
    const html = document.querySelector('#' + id).innerHTML
    // 新建一个 DOM
    const div = document.createElement('div')
    const printDOMID = 'printDOMElement'
    div.id = printDOMID
    div.innerHTML = html

    // 提取第一个表格的内容 即表头
    const ths = div.querySelectorAll('.el-table__header-wrapper th')
    const ThsTextArry = []
    for (let i = 0, len = ths.length; i < len; i++) {
        if (ths[i].innerText !== '') ThsTextArry.push(ths[i].innerText)
    }

    // 删除多余的表头
    div.querySelector('.hidden-columns').remove()
    // 第一个表格的内容提取出来后已经没用了 删掉
    div.querySelector('.el-table__header-wrapper').remove()

    // 将第一个表格的内容插入到第二个表格
    let newHTML = '<tr>'
    for (let i = 0, len = ThsTextArry.length; i < len; i++) {
        newHTML += '<td style="text-align: center; font-weight: bold">' + ThsTextArry[i] + '</td>'
    }

    newHTML += '</tr>'
    div.querySelector('.el-table__body-wrapper table').insertAdjacentHTML('afterbegin', newHTML)
    // 将新的 DIV 添加到页面 打印后再删掉
    document.querySelector('body').appendChild(div)
    
    printJS({
        printable: printDOMID,
        type: 'html',
        scanStyles: false,
        style: 'table { border-collapse: collapse }' // 表格样式
    })

    div.remove()
}
```

#### 七、下载二进制文件
平时在前端下载文件有两种方式，一种是后台提供一个 URL，然后用 window.open(URL) 下载，另一种就是后台直接返回文件的二进制内容，然后前端转化一下再下载。

由于第一种方式比较简单，在此不做探讨。本文主要讲解一下第二种方式怎么实现。

第二种方式需要用到 Blob 对象， mdn 文档上是这样介绍的：

- Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据

```
axios({
  method: 'post',
  url: '/export',
})
.then(res => {
  // 假设 data 是返回来的二进制数据
  const data = res.data
  const url = window.URL.createObjectURL(new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', 'excel.xlsx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
})
```

打开下载的文件，看看结果是否正确。

![vue018](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vue018.jpg)

发现乱码

最后发现是参数 responseType 的问题，responseType 它表示服务器响应的数据类型。由于后台返回来的是二进制数据，所以我们要把它设为 arraybuffer， 接下来再看看结果是否正确。

```
axios({
  method: 'post',
  url: '/export',
  responseType: 'arraybuffer',
})
.then(res => {
  // 假设 data 是返回来的二进制数据
  const data = res.data
  const url = window.URL.createObjectURL(new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', 'excel.xlsx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
})
```

*根据后台接口内容决定是否下载文件*

具体需求如下

- 如果下载文件的数据量条数符合要求，正常下载（每个页面限制下载数据量是不一样的，所以不能在前端写死）。
- 如果文件过大，后台返回 { code: 199999, msg: '文件过大，请重新设置查询项', data: null }，然后前端再进行报错提示。

先来分析一下，首先根据上文，我们都知道下载文件的接口响应数据类型为 arraybuffer。返回的数据无论是二进制文件，还是 JSON 字符串，前端接收到的其实都是 arraybuffer。所以我们要对 arraybuffer 的内容作个判断，在接收到数据时将它转换为字符串，判断是否有 code: 199999。如果有，则报错提示，如果没有，则是正常文件，下载即可。具体实现如下：

```
axios.interceptors.response.use(response => {
    const res = response.data
    // 判断响应数据类型是否 ArrayBuffer，true 则是下载文件接口，false 则是正常接口
    if (res instanceof ArrayBuffer) {
        const utf8decoder = new TextDecoder()
        const u8arr = new Uint8Array(res)
        // 将二进制数据转为字符串
        const temp = utf8decoder.decode(u8arr)
        if (temp.includes('{code:199999')) {
            Message({
            	// 字符串转为 JSON 对象
                message: JSON.parse(temp).msg,
                type: 'error',
                duration: 5000,
            })

            return Promise.reject()
        }
    }
    // 正常类型接口，省略代码...
    return res
}, (error) => {
    // 省略代码...
    return Promise.reject(error)
})
```

#### 八、自动忽略 console.log 语句

```
export function rewirteLog() {
    console.log = (function (log) {
        return process.env.NODE_ENV == 'development'? log : function() {}
    }(console.log))
}
```

在 main.js 引入这个函数并执行一次，就可以实现忽略 console.log 语句的效果。


[转载自：https://juejin.im/post/6895497352120008717](https://juejin.im/post/6895497352120008717)