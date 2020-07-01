---
title: Ubuntu下Jenkins的安装-配置-构建
date: 2020-06-28 10:14:07
tags:
- jenkins
- 自动化部署
- 持续集成
categories:
- 持续集成与自动化部署
---
### 一、了解Linux基础知识
#### 1. Linux系统根目录下各个文件夹含义及作用
<!--more-->
不管你是手动安装还是自动安装, 得先知道安装在哪吧, 并且安装完后初次启用为安全考虑, 软件需要用户输入其自动生成的密码.

- /bin 该目录中存放Linux的常用命令
- /boot 该目录默认下存放的是Linux的启动文件和内核
- /dev 该目录包含了Linux系统中使用的所有外部设备，它实际上是访问这些外部设备的端口，访问这些外部设备与访问一个文件或一个目录没有区别
- /etc 该目录存放系统管理时要用到的各种配置文件和子目录，例如网络配置文件、文件系统、X系统配置文件、设备配置信息、设置用户信息等
- /home 如果建立一个名为“xx”的用户，那么在/home目录下就有一个对应的“/home/xx”路径，用来存放该用户的主目录
- /lib 该目录用来存放系统动态链接共享库，几乎所有的应用程序都会用到该目录下的共享库
- /mnt 临时将别的文件系统挂在该目录下
- /opt 第三方软件在安装时默认会找这个目录,所以你没有安装此类软件时它是空的,但如果你一旦把它删除了,以后在安装此类软件时就有可能碰到麻烦
- /proc 可以在该目录下获取系统信息，这些信息是在内存中由系统自己产生的，该目录的内容不在硬盘上而在内存里
- /root 如果你是以超级用户的身份登录的，这个就是超级用户的主目录
- /sbin 该目录用来存放系统管理员使用的管理程序
- /tmp 用来存放不同程序执行时产生的临时文件，该目录会被系统自动清理干净
- /usr 用户的应用程序和文件几乎都存放在该目录下
- /var 该目录存放那些经常被修改的文件，包括各种日志、数据文件

#### 2. 寻找Java的安装路径
在后面安装完Jenkins后需要配置相关构建工具的路径,这时候你就需要知道你之前的安装的git, Java之流在哪里了

```
update-alternatives --config java
```

有可能会得到几个路径,打星那个就是你当前的执行版本

通过

```
ls -l /**/**
```

来进行路径定位,确保得到的不是软链接

还有一个通用的方法:whereis java 配合which java也可以得到路径, 包括git和gradle都适用
### 二、安装java SDK
Jenkins是基于Java的

由于默认的更新源比较慢，修改为阿里云的更新源

```
vim /etc/apt/sources.list
```

清空文件内容，添加如下内容：

```
deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted
deb http://mirrors.aliyun.com/ubuntu/ xenial universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu xenial-security main restricted
deb http://mirrors.aliyun.com/ubuntu xenial-security universe
deb http://mirrors.aliyun.com/ubuntu xenial-security multiverse
```

正式安装java jdk

```
apt-get update
sudo apt-get install -y openjdk-8-jdk
apt-get clean all
```

### 三、安装Jenkins
#### 安装方式
安装方式有三种:
- 下载.deb文件进行自动安装
- 下载war文件丢到tomcat的webapp下
- 下载war文件, 运行java -jar jenkins.war即可.

这个时候浏览器输入localhost:8080即可进入软件首页

#### 自动安装
包含在默认Ubuntu软件包中的Jenkins版本往往落后于项目本身的最新版本。 为了利用最新的修复和功能，我们将使用项目维护的软件包来安装Jenkins。

首先，我们将存储库密钥添加到系统。

```
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
```

添加密钥后，系统将返回OK 。 接下来，我们将Debian包存储库地址附加到服务器的sources.list：

```
echo deb http://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list
```

当这两个都到位时，我们将运行update ，以便apt-get将使用新的存储库：

```
sudo apt-get update
```

最后，我们将安装Jenkins及其依赖项，包括Java：

```
sudo apt-get install -y jenkins
```

现在Jenkins及其依赖项已经到位，我们将启动Jenkins服务器。

### 四、启动jenkins
使用systemctl我们将启动Jenkins：

```
sudo systemctl start jenkins
```

由于systemctl不显示输出，我们将使用其status命令来验证它是否成功启动：

```
sudo systemctl status jenkins
```

如果一切顺利，输出的开始应显示服务处于活动状态，并配置为启动时启动：

```
● jenkins.service - LSB: Start Jenkins at boot time
   Loaded: loaded (/etc/init.d/jenkins; bad; vendor preset: enabled)
   Active: active (exited) since 四 2019-08-08 20:27:37 CST; 33s ago
     Docs: man:systemd-sysv-generator(8)
```

现在Jenkins正在运行，我们将调整防火墙规则，以便我们可以从网络浏览器到达Jenkins以完成初始设置。

### 五、设置Jenkins
请注意已经关闭了防火墙，我们将使用服务器域名或IP地址访问Jenkins的默认端口8080：

```
http://ip_address_or_domain_name:8080
```

我们应该看到“解锁Jenkins”屏幕，显示初始密码的位置
![jenkins001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins001.jpg)

在终端窗口中，我们将使用cat命令显示密码：

```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

从终端复制32个字符的字母数字密码，并将其粘贴到“管理员密码”字段中，然后单击“继续”。 下一个屏幕提供安装建议的插件或选择特定插件的选项。

![jenkins002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins002.jpg)

点击“安装建议的插件”选项，这将立即开始安装过程：

![jenkins003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins003.jpg)

安装完成后，系统将提示您设置第一个管理用户。 可以跳过此步骤，并使用上面使用的初始密码作为admin继续，但是我们将花一点时间创建用户。

注意：默认Jenkins服务器未加密，因此使用此表单提交的数据不受保护。 当您准备好使用此安装时，请按照指南如何使用Nginx反向代理将SSL配置为Jenkins 。 这将保护用户凭据和关于通过Web界面发送的构建的信息。

![jenkins004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins004.jpg)

创建一个admin用户，密码自己定义

![jenkins005](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins005.jpg)

确认实例配置

![jenkins006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins006.jpg)

一旦第一个管理员用户到位，你应该看到一个“Jenkins准备好了！” 确认屏幕。

![jenkins007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins007.jpg)

点击“开始使用Jenkins”来访问主要的Jenkins仪表板：

![jenkins008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins008.jpg)

查看

```
root@ubuntu:~# sudo netstat -plntu
激活Internet连接 (仅服务器)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1020/sshd       
tcp6       0      0 :::22                   :::*                    LISTEN      1020/sshd       
tcp6       0      0 :::8080                 :::*                    LISTEN      8944/java       
udp        0      0 0.0.0.0:68              0.0.0.0:*                           928/dhclient    
udp6       0      0 :::33848                :::*                                8944/java       
udp6       0      0 :::5353                 :::*                                8944/java
```

此时，Jenkins已经成功安装。

**注意：**

默认端口是8080，有时候由于端口占用需要修改如下：

- 1.检查 /etc/init.d/jenkins 脚本，修改 do_start 函数的 check_tcp_port 命令，端口号从 8080 换成 8082：

- 2.修改 /etc/default/jenkins 文件，将端口 8080 改成 8082

```
HTTP_PORT=8082
```

- 3.重启Jenkins

```
sudo systemctl restart jenkins
```

### 六、配置构建后发送邮件
#### 1.在系统配置中配置邮件通知

![jenkins009](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins009.jpg)

#### 2.测试邮件服务是否配置成功

![jenkins010](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins010.jpg)

#### 3.在项目中添加构建后步骤

##### 默认邮件

添加构建步骤

![jenkins011](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins011.jpg)

设置邮件地址

![jenkins012](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins012.jpg)

**注意**

默认邮件只有在构建不稳定、失败情况下才会发送邮件，如果失败或不稳定发送邮件，之后第一次构建成功发送邮件，连续构建成功第二次后不发送邮件。

##### 可编辑邮件

设置可编辑邮件时，需要在系统配置中配置Extended E-mail Notification，不然不会成功发送。

![jenkins013](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins013.jpg)

添加构建步骤

![jenkins014](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins014.jpg)

编辑邮件内容

![jenkins015](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins015.jpg)

参考资料

https://tech-automation.blogspot.com/2018/05/how-to-configure-and-send-email-with_24.html

https://www.wandouip.com/t5i113024/

### 七、锁定资源
#### 1.定义
用来阻止多个构建在同一时间试图使用同一个资源。这里的资源可能是一个节点、一个代理节点、一组节点或代理节点的集合，或者仅仅是一个用于上锁的名字。如果指定的资源没有在全局配置中定义，那么它将会被自动地添加到系统中。

#### 2.全局配置中定义可锁定的资源
![jenkins016](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins016.jpg)

#### 3.实践
构建流程项目
假如有两个项目，只能同时构建一个，则需要添加一个资源锁，在项目配置中添加

![jenkins017](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins017.jpg)

设置一个项目构建完成后构建另一个项目

![jenkins018](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins018.jpg)

![jenkins019](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins019.jpg)

### 八、添加构建状态到github
#### 1.方式一
系统配置中配置github server

![jenkins020](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins020.jpg)

配置github
![jenkins021](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins021.jpg)

![jenkins022](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins022.jpg)

![jenkins023](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins023.jpg)

![jenkins024](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins024.jpg)

![jenkins025](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins025.jpg)

![jenkins026](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins026.jpg)

![jenkins027](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins027.jpg)

![jenkins028](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins028.jpg)

![jenkins029](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins029.jpg)

![jenkins030](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins030.jpg)

![jenkins031](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins031.jpg)

![jenkins032](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins032.jpg)


项目中增加构建配置

![jenkins033](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins033.jpg)

![jenkins034](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins034.jpg)

提交结果

![jenkins035](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins035.jpg)

参考资料：

https://stackoverflow.com/questions/14274293/show-current-state-of-jenkins-build-on-github-repo

#### 2.方式二
安装插件

点击Manage Plugins 安装Hudson Post Build Task

![jenkins036](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins036.jpg)

配置github

同上

增加构建配置

![jenkins037](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins037.jpg)

![jenkins038](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins038.jpg)

SUCCESS构建命令

```
curl "https://api.GitHub.com/repos/<GitHubUserName>/<REPO_NAME>/statuses/$GIT_COMMIT?access_token=<YOUR_GITHUB_TOKEN>" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"state\": \"failure\",\"context\": \"continuous-integration/jenkins\", \"description\": \"Jenkins\", \"target_url\": \"<YOUR_JENKINS_URL>/job/<JenkinsProjectName>/$BUILD_NUMBER/console\"}"
```

FAILURE构建命令

```
curl "https://api.GitHub.com/repos/<GitHubUserName>/<REPO_NAME>/statuses/$GIT_COMMIT?access_token=<YOUR_GITHUB_TOKEN>" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"state\": \"failure\",\"context\": \"continuous-integration/jenkins\", \"description\": \"Jenkins\", \"target_url\": \"<YOUR_JENKINS_URL>/job/<JenkinsProjectName>/$BUILD_NUMBER/console\"}"
```
```
<GitHubUserName> – from GitHub
<REPO_NAME> – from GitHub
<YOUR_GITHUB_TOKEN>
<YOUR_JENKINS_URL>
<JenkinsProjectName> – your Jenkins project name
```

提交结果

![jenkins035](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins035.jpg)

参考资料：

https://stackoverflow.com/questions/14274293/show-current-state-of-jenkins-build-on-github-repo

https://applitools.com/blog/how-to-update-jenkins-build-status-in-github-pull-requests-step-by-step-tutorial/

### 九、构建触发器
当github项目有更新可以触发jenkins自动构建

![jenkins039](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins039.jpg)

配置github webhooks

![jenkins040](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins040.jpg)

![jenkins041](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins041.jpg)

![jenkins042](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jenkins042.jpg)
