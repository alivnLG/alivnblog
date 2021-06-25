---
title: vue项目常见问题解决方案
date: 2020-11-16 15:59:00
top: true
tags:
- VUE
categories:
- VUE
---
### 一、页面权限控制
#### 1.1 思路
页面权限控制是什么意思呢？
<!--more-->
就是一个网站有不同的角色，比如管理员和普通用户，要求不同的角色能访问的页面是不一样的。如果一个页面，有角色越权访问，这时就得做出限制了。

一种方法是通过动态添加路由和菜单来做控制，不能访问的页面不添加到路由表里，这是其中一种办法。具体细节请看下一节的《动态菜单》。

另一种办法就是所有的页面都在路由表里，只是在访问的时候要判断一下角色权限。如果有权限就允许访问，没有权限就拒绝，跳转到 404 页面。

**在每一个路由的 meta 属性里，将能访问该路由的角色添加到 roles 里。用户每次登陆后，将用户的角色返回。然后在访问页面时，把路由的 meta 属性和用户的角色进行对比，如果用户的角色在路由的 roles 里，那就是能访问，如果不在就拒绝访问。**

#### 1.2 代码实现
路由信息

```js
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

```js
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

### 二、登录验证
网站一般只要登陆过一次后，接下来该网站的其他页面都是可以直接访问的，不用再次登陆。 我们可以通过 token 或 cookie 来实现，下面用代码来展示一下如何用 token 控制登陆验证。

```js
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

### 三、动态菜单
#### 3.1 动态添加路由
利用 vue-router 的 addRoutes 方法可以动态添加路由。

先看一下官方介绍：

router.addRoutes

```js
router.addRoutes(routes: Array<RouteConfig>)
```

动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。

举个例子：

```js
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

```js
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

```js
{path: '*', redirect: '/404'}
```

#### 3.2 动态生成菜单
假设后台返回来的数据长这样：

```js
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

```vue
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
                    <MenuItem class="menu-level-3" v-for="(threeItem, k) in subItem.children" 
                    :name="threeItem.name" :key="index + i + k">
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

```js
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

### 四、前进刷新后退不刷新

#### 4.1 需求一

在一个列表页中，第一次进入的时候，请求获取数据。

点击某个列表项，跳到详情页，再从详情页后退回到列表页时，不刷新。

也就是说从其他页面进到列表页，需要刷新获取数据，从详情页返回到列表页时不要刷新。

**解决方案**

在 App.vue设置：

```html
<keep-alive include="list">
    <router-view/>
</keep-alive>
```

假设列表页为 list.vue，详情页为 detail.vue，这两个都是子组件。

我们在 keep-alive 添加列表页的名字，缓存列表页。

然后在列表页的 created 函数里添加 ajax 请求，这样只有第一次进入到列表页的时候才会请求数据，当从列表页跳到详情页，再从详情页回来的时候，列表页就不会刷新。

#### 4.2 需求二
在需求一的基础上，再加一个要求：可以在详情页中删除对应的列表项，这时返回到列表页时需要刷新重新获取数据。

**解决方案二一**
我们可以在路由配置文件上对 detail.vue 增加一个 meta 属性。

```js
{
    path: '/detail',
    name: 'detail',
    component: () => import('../view/detail.vue'),
    meta: {isRefresh: true}
},
```

这个 meta 属性，可以在详情页中通过 this.$route.meta.isRefresh 来读取和设置。

设置完这个属性，还要在 App.vue 文件里设置 watch 一下 $route 属性。

```js
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

```html
<keep-alive>
    <router-view :key="$route.fullPath"/>
</keep-alive>
```

首先 keep-alive 让所有页面都缓存，当你不想缓存某个路由页面，要重新加载它时，可以在跳转时传一个随机字符串，这样它就能重新加载了。

例如从列表页进入了详情页，然后在详情页中删除了列表页中的某个选项，此时从详情页退回列表页时就要刷新，我们可以这样跳转：

```js
this.$router.push({
    path: '/list',
    query: { 'randomID': 'id' + Math.random() },
})
```

### 五、多个请求下 loading 的展示与关闭
一般情况下，在 vue 中结合 axios 的拦截器控制 loading 展示和关闭，是这样的：

在 App.vue 配置一个全局 loading。

```html
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

```js
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

```js
loadingCount: 0
```

再增加两个方法，来对 loadingCount 进行增减操作。

```js
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

```js
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

### 六、表格打印
打印需要用到的组件为 print-js

*普通表格打印*

一般的表格打印直接仿照组件提供的例子就可以了。

```js
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

```js
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

### 七、下载二进制文件
平时在前端下载文件有两种方式，一种是后台提供一个 URL，然后用 window.open(URL) 下载，另一种就是后台直接返回文件的二进制内容，然后前端转化一下再下载。

由于第一种方式比较简单，在此不做探讨。本文主要讲解一下第二种方式怎么实现。

第二种方式需要用到 Blob 对象， mdn 文档上是这样介绍的：

- Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据

```js
axios({
  method: 'post',
  url: '/export',
})
.then(res => {
  // 假设 data 是返回来的二进制数据
  const data = res.data
  const url = window.URL.createObjectURL(new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  }))
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

```js
axios({
  method: 'post',
  url: '/export',
  responseType: 'arraybuffer',
})
.then(res => {
  // 假设 data 是返回来的二进制数据
  const data = res.data
  const url = window.URL.createObjectURL(new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  }))
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

```js
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

### 八、自动忽略 console.log 语句

```js
export function rewirteLog() {
    console.log = (function (log) {
        return process.env.NODE_ENV == 'development'? log : function() {}
    }(console.log))
}
```

在 main.js 引入这个函数并执行一次，就可以实现忽略 console.log 语句的效果。

### 九、列表进入详情页的传参问题

例如商品列表页面前往商品详情页面，需要传一个商品id;

```html
<router-link :to="{path: 'detail', query: {id: 1}}">前往detail页面</router-link>
```

c页面的路径为```http://localhost:8080/#/detail?id=1```，可以看到传了一个参数id=1，并且就算刷新页面id也还会存在。此时在c页面可以通过id来获取对应的详情数据，获取id的方式是this.$route.query.id

vue传参方式有：query、params+动态路由传参。说下两者的区别：    

1.query通过path切换路由，params通过name切换路由

```html
// query通过path切换路由
<router-link :to="{path: 'Detail', query: { id: 1 }}">前往Detail页面</router-link>
// params通过name切换路由
<router-link :to="{name: 'Detail', params: { id: 1 }}">前往Detail页面</router-link>
```

2.query通过this.$route.query来接收参数，params通过this.$route.params来接收参数。

```js
// query通过this.$route.query接收参数
created () {
    const id = this.$route.query.id;
}

// params通过this.$route.params来接收参数
created () {
    const id = this.$route.params.id;
}
```

3.query传参的url展现方式：/detail?id=1&user=123&identity=1&更多参数

params＋动态路由的url方式：/detail/123

4.params动态路由传参，一定要在路由中定义参数，然后在路由跳转的时候必须要加上参数，否则就是空白页面：

```js
{      
    path: '/detail/:id',      
    name: 'Detail',      
    component: Detail    
},
```

注意，params传参时，如果没有在路由中定义参数，也是可以传过去的，同时也能接收到，但是一旦刷新页面，这个参数就不存在了。这对于需要依赖参数进行某些操作的行为是行不通的，因为你总不可能要求用户不能刷新页面吧。 例如：

```html
// 定义的路由中，只定义一个id参数
{
    path: 'detail/:id',
    name: 'Detail',
    components: Detail
}

// template中的路由传参，
// 传了一个id参数和一个token参数
// id是在路由中已经定义的参数，而token没有定义
<router-link :to="{name: 'Detail', params: { id: 1, token: '123456' }}">前往Detail页面</router-link>

// 在详情页接收
created () {
    // 以下都可以正常获取到
    // 但是页面刷新后，id依然可以获取，而token此时就不存在了
    const id = this.$route.params.id;
    const token = this.$route.params.token;
}
```

### 十、本地开发环境请求服务器接口跨域的问题

![vueProject001.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject001.jpg)

上面的这个报错大家都不会陌生，报错是说没有访问权限（跨域问题）。本地开发项目请求服务器接口的时候，因为客户端的同源策略，导致了跨域的问题。

下面先演示一个没有配置允许本地跨域的的情况：

![vueProject002.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject002.jpg)

![vueProject003.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject003.jpg)

![vueProject004.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject004.jpg)

可以看到，此时我们点击获取数据，浏览器提示我们跨域了。所以我们访问不到数据。

那么接下来我们演示设置允许跨域后的数据获取情况：

![vueProject005.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject005.jpg)

![vueProject006.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject006.jpg)

![vueProject007.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject007.jpg)

注意：配置好后一定要关闭原来的server，重新npm run dev启动项目。不然无效。

我们在1处设置了允许本地跨域，在2处，要注意我们访问接口时，写的是```/api```，此处的/api指代的就是我们要请求的接口域名。如果我们不想每次接口都带上```/api```，可以更改axios的默认配置```axios.defaults.baseURL = '/api'```;这样，我们请求接口就可以直接```this.$axios.get('app.php?m=App&c=Index&a=index')```，很简单有木有。此时如果你在network中查看xhr请求，你会发现显示的是```localhost:8080/api```的请求地址。这样没什么大惊小怪的，代理而已：

![vueProject008.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject008.jpg)

好了，最后附上proxyTable的代码：

```js
proxyTable: {
      // 用‘/api’开头，代理所有请求到目标服务器
      '/api': {
        target: 'http://jsonplaceholder.typicode.com', // 接口域名
        changeOrigin: true, // 是否启用跨域
        pathRewrite: { //
          '^/api': ''
        }
      }
}
```

注意：配置好后一定要关闭原来的server，重新npm run dev启动项目。不然无效。

### 十一、axios封装和api接口的统一管理

axios的封装，主要是用来帮我们进行请求的拦截和响应的拦截。

在请求的拦截中我们可以携带userToken，post请求头、qs对post提交数据的序列化等。

在响应的拦截中，我们可以进行根据状态码来进行错误的统一处理等等。

axios接口的统一管理，是做项目时必须的流程。这样可以方便我们管理我们的接口，在接口更新时我们不必再返回到我们的业务代码中去修改接口。

详情查看axios系列文章。

### 十二、UI库的按需加载

为什么要使用按需加载的方式而不是一次性全部引入，原因就不多说了。这里以vant的按需加载为例，演示vue中ui库怎样进行按需加载：

- 安装： cnpm i vant -S
- 安装babel-plugin-import插件使其按需加载：  cnpm i babel-plugin-import -D
- 在 .babelrc文件中中添加插件配置 ：

```js
libraryDirectory { 
    
    "plugins": [ 
        // 这里是原来的代码部分
        // …………

        // 这里是要我们配置的代码
        ["import", 
            { 
                "libraryName": "vant", 
                "libraryDirectory": "es", 
                "style": true 
            }
        ] 
    ] 
}
```

- 在main.js中按需加载你需要的插件：

```js
// 按需引入vant组件
import {   
    DatetimePicker,   
    Button,   
    List 
} from 'vant';
```

- 使用组件：

```js
// 使用vant组件
Vue.use(DatetimePicker)  
    .use(Button)  
    .use(List);
```

- 最后在在页面中使用：

```html
<van-button type="primary">按钮</van-button>
```

ps：除了vant库外，像antiUi、elementUi等，很多ui库都支持按需加载，可以去看文档，上面都会有提到。基本都是通过安装babel-plugin-import插件来支持按需加载的，使用方式与vant的如出一辙，可以去用一下。

### 十三、覆盖ui库中组件的样式

首先我们vue文件的样式都是写在<style lang="less" scoped></style>标签中的，加scoped是为了使得样式只在当前页面有效。那么问题来了，看图：

![vueProject009.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject009.jpg)

我们正常写的所有样式，都会被加上[data-v-23d425f8]这个属性（如1所示），但是第三方组件内部的标签并没有编译为附带[data-v-23d425f8]这个属性。

所以，我们想修改组件的样式，就没辙了。怎么办呢，有些小伙伴给第三方组件写个class，然后在一个公共的css文件中或者在当前页面再写一个没有socped属性的style标签，然后直接在里面修改第三方组件的样式。这样不失为一个方法，但是存在全局污染和命名冲突的问题。约定特定的命名方式，可以避免命名冲突。但是还是不够优雅。

下面说下优雅的解决方式：

通过深度选择器解决。例如修改上图中组件里的van-ellipsis类的样式，可以这样做：

```css
.van-tabs /deep/ .van-ellipsis { color: blue};
```

编译后的结果就是：

![vueProject010.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject010.jpg)

这样就不会给van-ellipsis也添加[data-v-23d425f8]属性了。至此你可以愉快的修改第三方组件的样式了。

当然了这里的深度选择器/deep/是因为我用的less语言，如果你没有使用less/sass等，可以用>>>符号。

### 十四、定时器问题

我在a页面写一个定时，让他每秒钟打印一个1，然后跳转到b页面，此时可以看到，定时器依然在执行。这样是非常消耗性能的。如下图所示：

![vueProject011.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject011.jpg)

![vueProject012.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject012.jpg)

解决方法1：

首先我在data函数里面进行定义定时器名称：

```js
data() {            
    return {                              
        timer: null  // 定时器名称          
    }        
},
```

然后这样使用定时器：

```js
this.timer = (() => {
    // 某些操作
}, 1000)
```

最后在beforeDestroy()生命周期内清除定时器：

```js
beforeDestroy() {
    clearInterval(this.timer);        
    this.timer = null;
}
```

方案1有两点不好的地方，引用尤大的话来说就是：

- 它需要在这个组件实例中保存这个 timer，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化的清理我们建立的所有东西。

解决方案2：

该方法是通过$once这个事件侦听器器在定义完定时器之后的位置来清除定时器。以下是完整代码：

```js
const timer = setInterval(() =>{                    
    // 某些定时器操作                
}, 500);            
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {            
    clearInterval(timer);                                    
})
```

类似于其他需要在当前页面使用，离开需要销毁的组件（例如一些第三方库的picker组件等等），都可以使用此方式来解决离开后以后在背后运行的问题。

综合来说，我们更推荐使用方案2，使得代码可读性更强，一目了然。如果不清楚$once、$on、$off的使用，这里送上官网的地址教程，在[程序化的事件侦听器](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8)那里。

### 十五、rem文件的导入问题

我们在做手机端时，适配是必须要处理的一个问题。例如，我们处理适配的方案就是通过写一个rem.js，原理很简单，就是根据网页尺寸计算html的font-size大小，基本上小伙伴们都知道，这里直接附上代码，不多做介绍。

```js
;(function(c,d){var e=document.documentElement||document.body,a="orientationchange" in window?"orientationchange":"resize",b=function(){var f=e.clientWidth;e.style.fontSize=(f>=750)?"100px":100*(f/750)+"px"};b();c.addEventListener(a,b,false)})(window);
```

这里说下怎么引入的问题，很简单。在main.js中，直接import './config/rem'导入即可。import的路径根据你的文件路径去填写。

### 十六、Vue-Awesome-Swiper解决轮播需求

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

### 十六、打包后.map文件过大的问题

项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。 而生成的.map后缀的文件，就可以像未加密的代码一样，准确的输出是哪一行哪一列有错可以通过设置来不生成该类文件。但是我们在生成环境是不需要.map文件的，所以可以在打包时不生成这些文件：

在config/index.js文件中，设置productionSourceMap: false,就可以不生成.map文件

![vueProject013.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject013.jpg)

### 十七、fastClick的300ms延迟解决方案

开发移动端项目，点击事件会有300ms延迟的问题。至于为什么会有这个问题，请自行百度即可。这里只说下常见的解决思路，不管vue项目还是jq项目，都可以使用fastClick解决。

安装 fastClick:

```shell
cnpm install fastclick -S
```

在main.js中引入fastClick和初始化:

```js
import FastClick from 'fastclick'; // 引入插件
FastClick.attach(document.body); // 使用 fastclick
```

### 十八、查看打包后各文件的体积，帮你快速定位大文件

如果你是vue-cli初始化的项目，会默认安装webpack-bundle-analyzer插件，该插件可以帮助我们查看项目的体积结构对比和项目中用到的所有依赖。也可以直观看到各个模块体积在整个项目中的占比。很霸道有木有~~

![vueProject014.gif](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject014.gif)

```
npm run build --report // 直接运行，然后在浏览器打开http://127.0.0.1:8888/即可查看
```

记得运行的时候先把之前npm run dev开启的本地关掉

### 十九、路由懒加载/延迟加载

路由懒加载可以帮我们在进入首屏时不用加载过度的资源，从而减少首屏加载速度。

路由文件中，

非懒加载写法：

```js
import Index from '@/page/index/index';
export default new Router({  
    routes: [    
        { 
            path: '/', 
            name: 'Index',     
            component: Index 
        }
    ]
})
```

路由懒加载写法：

```js
export default new Router({
  routes: [    
        { 
            path: '/', 
            name: 'Index', 
            component: resolve => require(['@/view/index/index'], resolve) 
        }
   ]
})
```

### 二十、开启gzip压缩代码

spa这种单页应用，首屏由于一次性加载所有资源，所有首屏加载速度很慢。解决这个问题非常有效的手段之一就是前后端开启gizp（其他还有缓存、路由懒加载等等）。gizp其实就是帮我们减少文件体积，能压缩到30%左右，即100k的文件gizp后大约只有30k。vue-cli初始化的项目中，是默认有此配置的，只需要开启即可。但是需要先安装插件：

```
// 2.0的版本设置不一样，本文写作时为v1版本。v2需配合vue-cli3cnpm i compression-webpack-plugin@1.1.11 
```

然后在config/index.js中开启即可:

```js
build: {
    // 其他代码
    …………
    productionGzip: true, // false不开启gizp，true开启
    // 其他代码
}
```

现在打包的时候，除了会生成之前的文件，还是生成.gz结束的gzip过后的文件。具体实现就是如果客户端支持gzip，那么后台后返回gzip后的文件，如果不支持就返回正常没有gzip的文件。

**注意：这里前端进行的打包时的gzip，但是还需要后台服务器的配置。配置是比较简单的，配置几行代码就可以了，一般这个操作可以叫运维小哥哥小姐姐去搞一下，没有运维的让后台去帮忙配置。

### 二十一、CSS的coped私有作用域和深度选择器

大家都知道当 ```<style>``` 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。那么他是怎么实现的呢，大家看一下编译前后的代码就明白了。

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

### 二十二、Hiper性能分析

![vueProject015.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject015.jpg)

如上图，是hiper工具的测试结果，从中我们可以看到DNS查询耗时、TCP连接耗时、第一个Byte到达浏览器的用时、页面下载耗时、DOM Ready之后又继续下载资源的耗时、白屏时间、DOM Ready 耗时、页面加载总耗时。在我们的编辑器终端中全局安装：

```
cnpm install hiper -g
```

使用：终端输入命令：hiper 测试的网址

```
# 当我们省略协议头时，默认会在url前添加`https://`

 # 最简单的用法
 hiper baidu.com

 # 如何url中含有任何参数，请使用双引号括起来
 hiper "baidu.com?a=1&b=2"

 #  加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2"

 #  禁用缓存加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" --no-cache

 #  禁JavaScript加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" --no-javascript
 
 #  使用GUI形式加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" -H false

 #  使用指定useragent加载网页100次
 hiper -n 100 "baidu.com?a=1&b=2" -u "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) 
 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
 ```

 这段用法示例，我直接拷贝的文档说明，具体的可以看下文档。当我们项目打开速度慢时，这个工具可以帮助我们快速定位出到底在哪一步影响的页面加载的速度。
 
 平时我们查看性能的方式，是在performance和network中看数据，记录下几个关键的性能指标，然后刷新几次再看这些性能指标。有时候我们发现，由于样本太少，受当前「网络」、「CPU」、「内存」的繁忙程度的影响很重，有时优化后的项目反而比优化前更慢。
 
 如果有一个工具，一次性地请求N次网页，然后把各个性能指标取出来求平均值，我们就能非常准确地知道这个优化是「正优化」还是「负优化」。
 
 hiper就是解决这个痛点的。

### 二十三、vue获取数据的两种方式的实践+简单骨架屏实现

在vue中获取数据有两种方式，引入尤大大的话就是：

- 导航完成之后获取

先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。

- 导航完成之前获取

导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。那么我们来实践一下这两种获取数据的方式，以及用户体验优化的一点思考。


#### 23.1 导航完成之后获取

这种方式是我们大部分都在使用的，（因为可能一开始我们只知道这种方式^V^）。使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。获取数据大家都会，这里说下用户体验的一些东西：

- 在数据获取到之前，页面组件已经加载，但是数据没有拿到并渲染，所以在此过程中，我们不能加载页面内展示数据的那块组件，而是要有一个loading的加载中的组件或者骨架屏。
- 当页面数据获取失败，可以理解为请求超时的时候，我们要展示的是断网的组件。
- 如果是列表页，还要考虑到空数据的情况，即为空提示的组件。

那么，我们的页面是要有这基本的三个部分的，放代码：

```html
<template>
    <div class="list">
        <!--加载中或者骨架屏-->
        <div v-if="loading">
       
        </div>

        <!--请求失败，即断网的提示组件-->
        <div v-if="error">
      
        </div>

        <!--页面内容-->
        <div v-if="requestFinished" class="content">
            <!--页面内容-->
            <div v-if="!isEmpty">
                <!--例如有个列表，当然肯定还会有其他内容-->
                <ul></ul>
            </div>

            <!--为空提示组件-->
            <div v-else>空空如也</div>
        </div>
    </div>
</template>
```

这种获取数据的情况下，我们进来默认的是展示loading或者骨架屏的内容，然后如果获取数据失败（即请求超时或者断网），则加载error的那个组件，隐藏其他组件。如果数据请求成功，则加载内容的组件，隐藏其他组件。如果是列表页，可能在内容组件中还会有列表和为空提示两块内容，所以这时候也还要根据获取的数据来判断是加载内容还是加载为空提示。

#### 23.2 导航完成之前获取

这种方式是在页面的beforeRouteEnter钩子中请求数据，只有在数据获取成功之后才会跳转导航页面。

```js
beforeRouteEnter (to, from, next) {        
    api.article.articleDetail(to.query.id).then(res=> {            
        next(vm => {                
            vm.info = res.data;                
            vm.loadFinish = true            
        })        
    })    
},
```

1.大家都知道钩子中beforeRouteEnter钩子中this还不能使用，所以要想进行赋值操作或者调用方法，我们只能通过在next()方法的回调函数中处理，这个回调函数的第一个参数就代表了this，他会在组件初始化成功后进行操作。

2.我想，很多时候我们的api或者axios方法都是挂载到vue的原型上的，由于这里使用不了this，所以只能在页面组件内引入api或者我们的axios。

3.赋值操作也可以写在method方法中，但是调用这个赋值方法还是vm.yourFunction()的方式。

4.为空提示、断网处理等都和第一种方式一样，但是，由于是先获取到数据之后再跳转加载组件的，所以我们不需要在预期的页面内展示骨架屏或者loading组件。可以，我们需要在当前页面进入之前，即在上一个页面的时候有一个加载的提示，比如页面顶部的进度条。这样用户体验就比较友好了，而不至于因为请求的s速度慢一些导致半天没反应而用户又不知道的结果。全局的页面顶部进度条，可以在main.js中通过router.beforeEach(to, from, next) {}来设置，当页面路由变化时，显示页面顶部的进度条，进入新路由后隐藏掉进度条。

![vueProject016.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject016.jpg)

其实说到了这里，那么骨架屏的事情也就顺带已经解决了，一般页面骨架屏也就是一张页面骨架的图片，但是要注意这张图片要尽可能的小。

### 二十四、自定义组件（父子组件）的双向数据绑定

说到父子组件的通信，大家一定都不陌生了：父组件通过props向子组件传值，子组件通过emit触发父组件自定义事件。但是这里要说的是父子组件使用v-model实现的通信。相信大家在使用别人的组件库的时候，经常是通过v-model来控制一个组件显示隐藏的效果等，例如弹窗。下面就一步一步解开v-model的神秘面纱。抓~~稳~~喽~~，老司机弯道要踩油门了~~~

提到v-model首先想到的就是我们对于表单用户数据的双向数据绑定，操作起来很简洁很粗暴，例如：

```html
<input type="text" v-model="msg">

data () {            
    return {                
        msg: ''            
    }        
}
```

其实v-model是个语法糖，上面这一段代码和下面这一段代码是一样的效果：

```html
<input type="text" :value="msg" @input="msg = $event.target.value">
data () {
    return {
        msg: '' 
    }        
},
```

由此可以看出，v-model="msg"实则是 :value="msg" @input="msg = $event.target.value"的语法糖。这里其实就是监听了表单的input事件，然后修改:value对应的值。除了在输入表单上面可以使用v-model外，在组件上也是可以使用的，这点官网有提到，但是介绍的不是很详细，导致刚接触的小伙伴会有一种云里雾里不知所云的感觉。既然了解了v-model语法糖本质的用法，那么我们就可以这样实现父子组件的双向数据绑定：

以上原理实现方法，写法1：

父组件用法：

```
<empty v-model="msg"></empty>
```

子组件写法：

```html
// 点击该按钮触发父子组件的数据同步
<div class="share-btn" @click="confirm">确定</div>

// 接收父组件传递的value值
// 注意，这种实现方法，这里只能使用value属性名
props: {            
    value: {                
        type: Boolean,                
        default: false            
    }        
},
methods: {            
    confirm () {                
        // 双向数据绑定父组件:value对应的值 
        // 通过$emit触发父组件input事件，第二个参数为传递给父组件的值，这里传递了一个false值 
        // 可以理解为最上面展示的@input="msg = $event.target.value"这个事件
        // 即触发父组件的input事件，并将传递的值‘false’赋值给msg             
        this.$emit('input', false)            
    }        
}
```

这种方式实现了父子组件见v-model双向数据绑定的操作，例如你可以试一下实现一个全局弹窗组件的操作，通过v-model控制弹窗的显示隐藏，因为你要在页面内进行某些操作将他显示出来，控制其隐藏的代码是写在组件里面的，当组件隐藏了对应的也要父组件对应的值改变。

以上这种方式实现的父子组件的v-model通信，虽可行，但限制了我们必须popos接收的属性名为value和emit触发的必须为input，这样就容易有冲突，特别是在表单里面。所以，为了更优雅的使用v-model通信而解决冲突的问题，我们可以通过在子组件中使用model选项。

下面演示写法2：

父组件写法：

```
<empty v-model="msg"></empty>
```

子组件写法：

```html
<div class="share-btn" @click="confirm">确定</div>

// model选项用来避免冲突
// prop属性用来指定props属性中的哪个值用来接收父组件v-model传递的值
// 例如这里用props中的show来接收父组件传递的v-model值
// event：为了方便理解，可以简单理解为父组件@input的别名，从而避免冲突
// event的值对应了你emit时要提交的事件名，你可以叫aa，也可以叫bb，但是要命名要有意义哦！！！
model: {            
    prop: 'show',            
    event: 'changed'        
},
props: {
    // 由于model选项中的prop属性指定了，所以show接收的是父组件v-model传递的值            
    show: {                
        type: Boolean,                
        default: false            
    }        
},        
methods: {            
    confirm () {                
        // 双向数据绑定父组件传递的值
        // 第一个参数，对应model选项的event的值，你可以叫aa，bbb，ccc，起名随你 
        this.$emit('changed', false)            
    }        
}
```

这种实现父子组件见v-model绑定值的方法，在我们开发中其实是很常用的，特别是你要封装公共组件的时候。

最后，实现双向数据绑定的方式其实还有.sync，这个属性一开始是有的，后来由于被认为或破坏单向数据流被删除了，但最后证明他还是有存在意义的，所以在2.3版本又加回来了。

例如：父组件：

```
<empty :oneprop.sync="msg"></empty>

data () {
    return {
        msg: ''
    }
}
```

子组件：

```html
<div class="share-btn" @click="changeMsg">改变msg值</div>

props: {            
    oneprop: {                
        type: String,                
        default: 'hello world'
    }        
},        
methods: {            
    changeMsg () {                
        // 双向数据流
        this.$emit('update:msg', 'helow world')           
    }        
}        
```

这样，便可以在子组件更新父组件的数据。由于v-model只使用一次，所以当需要双向绑定的值有多个的时候，.sync还是有一定的使用场景的。.sync是下面这种写法的语法糖，旨在简化我们的操作：

```
<empty
    :msg="message"
    @update:msg="message = $event"
></empty>
```

掌握了组件的v-model写法，在封装一些公共组件的时候就又轻松一些了吧。

这里再提一下：

- vm.$emit(event ,[...args])这个api，其主要作用就是用来触发当前实例上的事件。附加参数都会传给监听器回调。子组件也属于当前实例。第一个参数：要触发的事件名称。后续的参数可选：即作为参数传递给要触发的事件。
- 监听当前实例上的自定义事件，事件可以有$emit触发，也能通过hook监听到钩子函数，

vm.$on( event, callback )：一直监听；

vm.$once( event, callback )：监听一次；

vm.$off( [event, callback] )：移除监听；

监听$emit触发的自定义事件，上面已经有过用法了，监听钩子函数，在上面的定时器那块也有演示到。监听钩子函数的场景使用的不多，但是还是要知道的。

- vm.$attrs：可以获取到父组件传递的除class和style外的所有自定义属性。
- vm.$listeners：可以获取到父组件传递的所有自定义事件

例如：父组件:

```
<empty
    :msg="message"
    :title="articleTitle"
    @confirm="func1"
    @cancel="func2"
></empty>
```

就可以在子组件中获取父组件传递的属性和事件，而不用在props中定义。子组件简单演示如下：

```js
created() {            
    const msg = this.$attrs.msg; // 获取父组件传递的msg
    this.$listeners.confirm && this.$listeners.confirm(); //若组件传递事件confirm则执行
},
```

这在我们写一些高级组件时候，会有用到的。

### 二十五、路由拆分管理

这里说的路由拆分指的是将路由的文件，按照模块拆分，这样方便路由的管理，更主要的是方便多人开发。具体要不要拆分，那就要视你的项目情况来定了，如果项目较小的话，也就一二十个路由，那么是拆分是非常没必要的。但倘若你开发一些功能点较多的商城项目，路由可以会有一百甚至几百个，那么此时将路由文件进行拆分是很有必要的。不然，你看着index.js文件中一大长串串串串串串的路由，也是很糟糕的。

![vueProject017.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject017.jpg)

首先我们在router文件夹中创建一个index.js作为路由的入口文件，然后新建一个modules文件夹，里面存放各个模块的路由文件。例如这里储存了一个vote.js投票模块的路由文件和一个公共模块的路由文件。下面直接上index.js吧，而后在简单介绍：

```js
import Vue from 'vue'
import Router from 'vue-router'

// 公共页面的路由文件
import PUBLIC from './modules/public' 
// 投票模块的路由文件
import VOTE from './modules/vote' 

Vue.use(Router)

// 定义路由
const router = new Router({  
    mode: 'history',  
    routes: [    
        ...PUBLIC,    
        ...VOTE,  
    ]
})

// 路由变化时
router.beforeEach((to, from, next) => {    
    if (document.title !== to.meta.title) {        
        document.title = to.meta.title;    
    }    
    next()
})

// 导出
export default router
```

首先引入vue和router最后导出，这就不多说了，基本的操作。

这里把router.beforeEach的操作写了router的index.js文件中，有些人可能会写在main.js中，这也没有错，只不过，个人而言，既然是路由的操作，还是放在路由文件中管理更好些。这里就顺便演示了，如何在页面切换时，自动修改页面标题的操作。

而后引入你根据路由模块划分的各个js文件，然后在实例化路由的时候，在routes数组中，将导入的各个文件通过结构赋值的方法取出来。最终的结果和正常的写法是一样的。然后看下我们导入的vote.js吧：

```js
/** 
 * 投票模块的router列表  
 */

export default [    
    // 投票模块首页    
    {        
        path: '/vote/index',        
        name: 'VoteIndex',        
        component: resolve => require(['@/view/vote/index'], resolve),        
        meta: {            
            title: '投票'        
        }    
    },    
    // 详情页    {        
    path: '/vote/detail',        
    name: 'VoteDetail',        
    component: resolve => require(['@/view/vote/detail'], resolve),
    meta: {            
        title: '投票详情'        
    }    
}] 
```

这里就是将投票模块的路由放在一个数组中导出去。整个路由拆分的操作，不是vue的知识，就是一个es6导入导出和结构的语法。具体要不要拆分，还是因项目和环境而异吧。

这里的路由用到了懒加载路由的方式，如果不清楚，文字上面有介绍到。

还有这里的meta元字段中，定义了一个title信息，用来存储当前页面的页面标题，即document.title。

### 二十六、mixins混入简化

我们在开发中经常会遇到金钱保留两位小数，时间戳转换等操作。每次我们会写成一个公共函数，然后在页面里面的filters进行过滤。这种方法每次，但是感觉每次需要用到，都要写一遍在filters，也是比较烦呢！！！但是，我们猿类的极致追究就是懒呀，那这怎么能行~~~

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

### 二十七、打包后文件、图片、背景图资源不存在或者路径错误的问题

![vueProject019.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject019.jpg)

先看下项目的config文件夹下的index.js文件，这个配置选项就好使我们打包后的资源公共路径，默认的值为‘/’，即根路径，所以打包后的资源路径为根目录下的static。由此问题来了，如果你打包后的资源没有放在服务器的根目录，而是在根目录下的mobile等文件夹的话，那么打包后的路径和你代码中的路径就会有冲突了，导致资源找不到。

所以，为了解决这个问题，你可以在打包的时候把上面这个路径由‘/’的根目录，改为‘./’的相对路径。

![vueProject020.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject020.jpg)

这样的的话，打包后的图片啊js等路径就是‘./static/img/asc.jpg’这样的相对路径，这就不管你放在哪里，都不会有错了。但是，凡是都有但是~~~~~这里一切正常，但是背景图的路径还是不对。因为此时的相对就变成了static/css/文件夹下的static/img/xx.jpg，但是实际上static/css/文件夹下没有static/img/xx.jpg，即static/css/static/img/xx.jpg是不存在的。此时相对于的当前的css文件的路径。所以为了解决这个问题，要把我们css中的背景图的加个公共路径‘../../’，即让他往上返回两级到和index.html文件同级的位置，那么此时的相对路径static/img/xx.jpg就能找到对应的资源了。那么怎么修改背景图的这个公共路径呢，因为背景图是通过loader解析的，所以自然在loader的配置中修改，打开build文件夹下的utils文件，找到exports.cssLoaders的函数，在函数中找到对应下面这些配置：

![vueProject021.jpg](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/vueProject021.jpg)

找到这个位置，添加一上配置，就是上图红框内的代码，就可以把它的公共路径修改为往上返回两级。这样再打包看下，就ok了！最后再郑重说一点，如果你的路由模式是history的，那么打包放在服务器，必须要后台服务器的配合，具体的可以看官方文档，这点很重要。不然你会发现白屏啊等各种莫名其妙的问题。牢记！！！

