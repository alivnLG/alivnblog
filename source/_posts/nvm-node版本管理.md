---
title: nvm node版本管理
date: 2020-08-13 14:44:25
tags:
- nvm
categories:
- 版本控制
---
### 一、定义
nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。

### 二、常用命令

```
nvm install 安装指定版本node，可模糊安装，如：安装v4.4.0，既可nvm install v4.4.0，又可nvm install 4.4

nvm uninstall 删除已安装的指定版本，语法与install类似

nvm use 切换使用指定的版本node

nvm ls 列出所有安装的版本

nvm ls-remote 列出所以远程服务器的版本（官方node version list）

nvm current 显示当前的版本

nvm alias 给不同的版本号添加别名

nvm unalias 删除已定义的别名

nvm reinstall-packages 在当前版本node环境下，重新全局安装指定版本号的npm包
```

