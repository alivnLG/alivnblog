---
title: git设置、查看、取消代理
date: 2020-07-03 10:38:55
tags:
- proxy
categories:
- 版本控制
---
### 设置代理

```
git config --global http.proxy 'socks5://127.0.0.1:1080' 
git config --global https.proxy 'socks5://127.0.0.1:1080'
```

### 查看代理

```
git config --global --get http.proxy
git config --global --get https.proxy
```

### 取消代理

```
git config --global --unset http.proxy
git config --global --unset https.proxy
```

针对docker容器的代理配置：

在创建(run)容器的时候，加上 --net=host 这个选项，就可以实现容器内外共享网络，然后再在容器内部配置git，就可以实现容器内代理了。

