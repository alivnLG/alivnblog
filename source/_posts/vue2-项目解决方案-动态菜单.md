---
title: vue2-项目解决方案-动态菜单
date: 2021-06-25 16:02:32
top: true
tags:
categories:
- VUE
---
### 一、动态菜单

#### 1.1 动态添加路由
<!--more-->
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

#### 1.2 动态生成菜单

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
