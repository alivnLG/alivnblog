---
title: Mac命令
date: 2020-05-26 11:07:39
tags:
- Mac
categories: 
- 计算机网络
---
Mac终端使用技巧 或 Linux中常用操作命令
<!--more-->
```
ls                显示文件目录
mkdir             创建目录  mkdir work
cd                切换目录  按tab键提示  cd work
touch             创建空文件   touch index.html
echo              创建带内容的文件    echo  index.html
cat               查看文件内容    cat index.html
cp                复制文件到某个目录   
                  cp index.html css 复制index.html到css文件夹
                  cp –r test/ newtest  复制test下的所有文件到newtest目录下

mv                移动或重命名
rm                删除文件
find              找到文件
rmdir             删除空目录
pwd               显示当前目录


stat              显示文件详细信息 stat index.html  比ls信息更全
who               显示在线登录用户
whoami            当前操作用户
hostname          显示主机名
uname             显示系统信息
ps                查看进程状态
df                查看磁盘状态
ifconfig          查看网路情况
ping              测试网络连通
netstat           显示网络状态信息

man               查看某个命令用法    man ls
clear             清屏
kill              杀进程  可以先用ps 或 top命令查看进程的id，然后再用kill命令杀死进程


gzip，bzip2，tar打包命令

tar -cvf /home/abc.tar /home/abc              只打包，不压缩

tar -zcvf /home/abc.tar.gz /home/abc        打包，并用gzip压缩

tar -jcvf /home/abc.tar.bz2 /home/abc      打包，并用bzip2压缩

当然，如果想解压缩，就直接替换上面的命令  tar -cvf  / tar -zcvf  / tar -jcvf 中的“c” 换成“x” 就可以了。

shutdown
     -r             关机重启
     -h             关机不重启
     now            立刻关机
halt                关机
reboot              重启

:q                  退出
:q!                 强制退出
:wq                 保存并退出
:set number         显示行号
:set nonumber       隐藏行号
/apache             在文档中查找apache 按n跳到下一个，shift+n上一个
yyp                 复制光标所在行，并粘贴
h(左移一个字符←)、j(下一行↓)、k(上一行↑)、l(右移一个字符→)
```