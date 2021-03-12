---
title: 常用git命令
date: 2020-06-02 14:55:03
tags:
- Git
categories:
- 版本控制
---
1.git status  

2.git add -A  
<!--more-->
3.git commit -m ""  

4.git branch  

5.git push origin master:master

![git001](https://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/git001.jpg)


```
1  fork了别人的代码，原作者改动了，自己的github想要同步到最新版。

2 你是前端，拉取了小组的master,但是现在你需要和你配合的A工的代码。

操作：

1    打开本地仓库位置，Git Bash here

2    把想要同步的这个仓库关联到本地 upstream 

执行：git remote add upstream https://github.com/*******.git     

3    查看状态确认是否配置成功

执行：remote -v         

4 拉取仓库下所有分支

执行： git fetch upstream 

5 把上游的远程代码合并到本地的 master分支

git checkout master

git merge upstream/master 
6 现在你的本地master就同步到最新版了。执行： git push 推到你的远程就好了
原理：

这样理解比较简单，你在本地代码库新建了upstream一个分支，不过这个分支对应的是别人的整个仓库，
执行Git fetch的时候就是拉取整个仓库到自己的upstream分支,下面就是想合并到哪儿就合并到哪儿。

```


