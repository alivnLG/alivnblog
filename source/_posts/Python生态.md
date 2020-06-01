---
title: Python生态
date: 2020-05-29 10:54:44
tags:
- 网络编程
- WEB开发
- 爬虫
- 云计算
- 人工智能
- 自动化运维
- 金融分析
- 科学计算
- 游戏开发
categories:
- 编程语言
---
### 一、生态圈
#### 1.WEB开发
最火的Python web框架Django, 支持异步高并发的Tornado框架，短小精悍的flask,bottle, Django官方的标语把Django定义为the framework for perfectionist with deadlines(大意是一个为完全主义者开发的高效率web框架)
<!--more-->
#### 2.网络编程
支持高并发的Twisted网络框架， py3引入的asyncio使异步编程变的非常简单

#### 3.爬虫
爬虫领域，Python几乎是霸主地位，Scrapy\Request\BeautifuSoap\urllib等，想爬啥就爬啥

#### 4.云计算
目前最火最知名的云计算框架就是OpenStack,Python现在的火，很大一部分就是因为云计算

#### 5.人工智能
谁会成为AI 和大数据时代的第一开发语言？这本已是一个不需要争论的问题。如果说三年前，Matlab、Scala、R、Java 和 Python还各有机会，局面尚且不清楚，那么三年之后，趋势已经非常明确了，特别是前两天 Facebook 开源了 PyTorch 之后，Python 作为 AI 时代头牌语言的位置基本确立，未来的悬念仅仅是谁能坐稳第二把交椅。

#### 6。自动化运维
问问中国的每个运维人员，运维人员必须会的语言是什么？10个人相信会给你一个相同的答案，它的名字叫Python

#### 7.金融分析
我个人之前在金融行业，10年的时候，我们公司写的好多分析程序、高频交易软件就是用的Python,到目前,Python是金融分析、量化交易领域里用的最多的语言

#### 8.科学运算
你知道么,97年开始，NASA就在大量使用Python在进行各种复杂的科学运算，随着NumPy, SciPy, Matplotlib, Enthought librarys等众多程序库的开发，使的Python越来越适合于做科学计算、绘制高质量的2D和3D图像。和科学计算领域最流行的商业软件Matlab相比，Python是一门通用的程序设计语言，比Matlab所采用的脚本语言的应用范围更广泛

#### 9.游戏开发
在网络游戏开发中Python也有很多应用。相比Lua or C++,Python 比 Lua 有更高阶的抽象能力，可以用更少的代码描述游戏业务逻辑，与 Lua 相比，Python 更适合作为一种 Host 语言，即程序的入口点是在 Python 那一端会比较好，然后用 C/C++ 在非常必要的时候写一些扩展。Python 非常适合编写 1 万行以上的项目，而且能够很好地把网游项目的规模控制在 10 万行代码以内。另外据我所知，知名的游戏<文明> 就是用Python写的。

### 二、常用包
Item | Python包
--|--
数据分析和整理 | numpy、pandas
excel绘图 | xlsxwriter、xlrd、xlwt、openpyxl 、win32com.client.Dispatch(‘Excel.Application’)
word处理 | docx、win32com.client.Dispatch(‘Word.Application’)
txt等文本处理 | re
pcap数据包处理 | scapy
网站 网页请求 | requests、urllib3、httplib2
界面编程 | pyqt4/5、xypython
邮件 | smtplib、email
科学计算 | numpy、scipy
exe打包工具 | pyinstaller
绘图 | matplotlib、seaborn
机器学习 | scikit-learn、Xgboost
深度学习 | tensorflow、karas、pytorch、Spacy
web框架 | django、flask、tornanl、web2py
数据库 | mysqldb、redis、pymongo、sqlalchemy
爬虫、网页分析 | BeautifulSoup、PyQuery
图像处理 | PIL、opencv
游戏 | PyGame
html/xml处理 | xmltodict 、lxml
浏览器自动化 | selenium
pdf处理 | PDFMiner 、PyPDF2 、ReportLab
音频文件处理 | audiolazy
视频处理 | moviepy
地理位置 地图处理 | GeoIP
配置文件处理 | configparser

