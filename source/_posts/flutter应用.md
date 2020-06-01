---
title: flutter应用
date: 2020-06-01 10:59:50
tags:
- flutter
- dart
- APP
categories:
- 混合APP开发
---
#### 一、安装环境
##### MAC环境安装
1、升级 Macos 系统为最新系统  
<!--more-->
2、安装最新的 Xcode  
3、电脑上面需要安装 brew https://brew.sh/  
4、下载 Flutter SDK、配置 Flutter 环境变量、配置Flutter镜像  
5、运行 flutter doctor 命令检测环境  
6、命令行工具生成 Flutter 项目
```
sudo flutter create flutterdemo
```
7、修改 Flutter Sdk 目录的权限以及项目的权限
```
//可读可写可执行
sudo chmod -R 777 *
```
8、Xcode打开flutter项目模拟器运行项目  

9、在Vscode中配置开发Flutter项目  
安装flutter、dart插件  

10、运行项目
```
flutter run
```
#### 二、Flutter 目录结构
android  
android 平台相关代码

build  
运行时的编译目录

ios      
ios 平台相关代码

lib      
flutter 相关代码，我们主要编写的代 码就在这个文件夹

test  
用于存放测试代码

pubspec.yaml  
配置文件，一般存放一些第三方库的依 赖。

#### 三、Flutter 入口文件、入口方法
每一个 flutter 项目的 lib 目录里面都有一个 main.dart 这个文件就是 flutter 的入口文件

main.dart 里面的
```
void main(){ 

    runApp(MyApp());

}
```
也可以简写
```
void main()=>runApp(MyApp());
```
其中的 main 方法是 dart 的入口方法。runApp 方法是 flutter 的入口方法。 MyApp 是自定义的一个组件

#### 四、Flutter 把内容单独抽离成一个组件
在 Flutter 中自定义组件其实就是一个类，这个类需要继承 StatelessWidget/StatefulWidget 前期我们都继承 StatelessWidget。后期给大家讲 StatefulWidget 的使用。 StatelessWidget 是无状态组件，状态不可变的 widget
StatefulWidget 是有状态组件，持有的状态可能在 widget 生命周期改变
```
import 'package:flutter/material.dart';
void main(){ 

runApp(MyApp());

}
//StatelessWidget 无状态组件，状态不可改变
//StatefulWidget 是有状态组件，持有的状态可能在 widget 生命周期改变
class MyApp extends StatelessWidget{

@override
Widget build(BuildContext context) {
// TODO: implement build return Center(
child: Text( 
"我是一个文本内容", textDirection: TextDirection.ltr,
      ), 
    );
  }
}
```
#### 四、所有组件都是一个类
##### MaterialApp

##### Scaffold

##### AppBar

##### Center

##### Text

##### Container

##### Image（远程图片、本地图片）

圆形图片；

引入本地图片，在根目录新建images文件夹，子文件夹为2.0X（必须）、3.0X（必须）、4.0X，将图片分别放入根文件夹和子文件夹，flutter根据分辨率加载不同文件夹下的图片。在pubspec.yaml中声明添加图片文件，配置：
```
# The following section is specific to Flutter.
flutter:

  # The following line ensures that the Material Icons font is
  # included with your application, so that you can use the icons in
  # the material Icons class.
  uses-material-design: true  
  assets:
    - images/a.jpeg
    - images/2.0x/a.jpeg
    - images/3.0x/a.jpeg  
```
注意格式 空格 对齐；建议将图片放在container中；
加载本地图片时可能报错，重新运行即可。

##### ListView列表组件，配合ListTile使用，可以配合其他组件
###### 垂直列表

###### 垂直图文列表

###### 水平列表

###### 动态列表
循环语句实现、ListView.builder

##### GridView组件（矩阵式列表）GridView.builder
网格列表布局

##### Column组件 Row组件 Expanded（类似flex布局，结合Column和Row）

##### SizeBox组件（可用作上下空白间距）

##### Padding组件（有些组件不包含padding）

##### Icon图标组件

##### Stack层叠组件，定位布局，与Align组件、positioned组件实现

##### AspectRation组件、Card卡片组件

##### Wrap组件，实现流布局

##### RaisedButton按钮组件

##### CircleAvatar组件

##### Chip组件

##### BottomNavigationBar组件

##### 自定义Widget

##### 多查看源代码

##### 有状态组件 StatefulWidget

##### FloatingActionButton浮动按钮

##### 路由组件Navgator（普通路由、命名路由、路由传值）

##### IconButton组件

##### Drawer抽屉组件、DrawerHeader组件

##### Divider 线条组件

##### 按钮组件
RisedButton：凸起的按钮，Material Design风格Button

FlatButton：扁平化按钮

OutlineButton：线框按钮

IconButton：图标按钮

BUttonBar：按钮组

FloatActionButton：浮动按钮

##### From表单组件、TextFiled、CheckBox、CheckBoxListtile、Radio、RadioListTile、Switch、SwitchListTile




#### 注意：
修改了路由需要重启，不然会报错，路由未注入