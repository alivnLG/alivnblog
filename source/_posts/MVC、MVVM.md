---
title: MVC、MVVM
date: 2020-05-26 11:09:47
tags:
- MVC
- MVVM
categories:
- 编程框架
---
#### 一、MVC
MVC:分别所指Model、View、Controller。
MVC为标准的设计模式，是官方推荐的权威的规范模式。
<!--more-->
视图（View）：用户交互界面。  
控制器（Controller）：调节Modle和View的交互。  
模型（Model）：业务逻辑模型(并非数据模型)  

注意：这里大家容易误解Model，可能通常大家模型对象感觉非常的简单，就只是做数据模型，使Model的量级特别的轻，这样就加重了Controller对业务逻辑的处理，加重了Controller的量级。

而根据Apple的文档，model应包括数据和操作数据的业务逻辑。所以在我们在写Model部分的时候一定要注意，不是每个Controller只能对应一个Model，减少在Controller的业务逻辑，加重Model的量级。

![mvcmvvm001.png](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mvcmvvm001.jpg)

如图所示，这是一个基本的MVC模式示意图。在MVC1中，Controller和其他部分之间的通信都是双向的。而View和model之间没有任何通信关系。
#### 二、MVVM
MVVM:分别所指Model、View | Controller、ViewModel。
在MVVM中，view 和 view controller结合在一起，我们把它们看做一个部分。

视图（View | Controller）：调用ViewModel的方法并响应变化。  
视图模型（ViewModel）：业务逻辑。  
模型（Model）：数据模型  

在MVVM 中，view 和 view controller正式联系在一起，我们把它们视为一个组件

![mvcmvvm002.png](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mvcmvvm002.jpg)

如图所示，这是一个基本的MVVM模式示意图。从图中我们可以得知
*ViewModel和Model之间的通信是双向的。
*View和ViewController都不能直接引用Model，而是引用视图模型ViewModel


ViewModel用来放置用户交互验证逻辑；视图显示逻辑；发起网络请求和其他代码。

注意: 使用MVVM会一定程度的增加程序的代码量，但总体上减少了代码的复杂性，并能很好的减轻Controller的量级。View引用ViewModel，但反过来不行,任何视图本身的引用都不应该放在viewModel中。ViewController尽量不涉及业务逻辑，让ViewModel去做这些事情。ViewModel应避免过于臃肿，否则重蹈Controller的“覆辙”，变得更难以维护。

##### 优点:MVC

易懂: 简单易懂，我想用这四个字来形容MVC在合适不过了。  
层次分明: 共三个部分，各自完成各自的内容，在有Controller将大家协调在一起。

##### 弊端:MVC

量级重 : ViewController处理过多的业务逻辑如协调模型和视图之间的所有交互，导致量级重，维护成本很高。  
过轻的Model对象:在实践中往往大家都把Model的量级设计的非常轻，总容易当做数据模型来对待。

至于很开发者所说的无法添加的网络逻辑，我个人认为完全可以设计添加到Model中。但要注意根据需求来选择“同步或异步”。
##### 优点: MVVM

低耦合: View可以独立于Model变化和修改，一个ViewModel可以绑定到不同的View 上。  
可重用性: 可以把一些视图逻辑放在一个ViewModel里面，让很多View重用这段视图逻辑。

##### 弊端:MVVM

数据绑定后使得Bug很难被调试。  
数据绑定和数据转化需要花费更多的内存成本。
