---
title: MarkDown基本语法
date: 2020-05-29 11:17:35
tags:
- markdown-it
categories:
- 学习笔记
---
#### 1.markdown标题
一级标题
<!--more-->
=
二级标题
-
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
#### 2.markdown段落
段落的换行是使用两个以上空格加上回车
#### 3.字体
*斜体文本*  
_斜体文本_  
**粗体文本**  
__粗体文本__  
***粗斜体文本***  
___粗斜体文本___
#### 4.分割线


* * *

***

- - -

---
#### 5.删除线
~~删除线~~
#### 6.下划线
<u>下划线</u>
#### 7.脚注
#### 8.列表
##### 无序列表
* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项


- 第一项
- 第二项
- 第三项
##### 有序列表
1. 第一项
2. 第二项
3. 第三项

##### 列表嵌套
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第一个元素

#### 9.区块
##### 普通区块
> 区块引用  
> 菜鸟教程  
> 学的不仅是技术更是梦想  
##### 嵌套区块
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
##### 区块中使用列表
> 区块中使用列表
> 1. 第一项
> 2. 第二项
> + 第一项
> + 第二项
> + 第三项
##### 列表中使用区块
* 第一项
    > 菜鸟教程
    > 学的不仅是技术更是梦想
* 第二项
#### markdown代码
`printf()` 函数
##### 代码区块
代码区块使用 4 个空格或者一个制表符（Tab 键）

    $(document).ready(function () {
        alert('RUNOOB');
    });

或者
```
$(document).ready(function () {
    alert('RUNOOB');
});
```
#### markdown链接
这是一个链接 [百度一下](https://www.baidu.com)

或者

<https://www.baidu.com>
#### markdown图片
![机器学习](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/machinelearning013.jpg)
#### Markdown 表格
-: 设置内容和标题栏居右对齐。  
:- 设置内容和标题栏居左对齐。  
:-: 设置内容和标题栏居中对齐。  

|  表头   | 表头  |
|  ---  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |


| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |

#### markdoen支持 HTML 元素
```
<kdb> 
<b> 
<i> 
<em> 
<sup> 
<sub> 
<br>
```
<div style='width:100px;height:100px;background:#f00'></div>

##### 转义字符

```
\   反斜线  
`   反引号  
*   星号  
_   下划线  
{}  花括号  
[]  方括号  
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```

**文本加粗**

\*\* 正常显示星号 \*\*

##### 公式
