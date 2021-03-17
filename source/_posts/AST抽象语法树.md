---
title: AST抽象语法树
date: 2020-06-03 15:24:38
tags:
- AST
categories:
- Web前端
---
#### AST抽象语法树
##### 定义
<!--more-->
抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

单理解为 它就是你所写代码的的树状结构化表现形式

有了这棵树，我们就可以通过操纵这颗树，精准的定位到声明语句、赋值语句、运算语句等等，实现对代码的分析、优化、变更等操作。

webpack，eslint 等很多插件或者包都有涉及

##### 作用
IDE的错误提示、代码格式化、代码高亮、代码自动补全等

JSLint、JSHint对代码错误或风格的检查等

webpack、rollup进行代码打包等

CoffeeScript、TypeScript、JSX等转化为原生Javascript

##### 生成AST
JS Parser其实是一个解析器，它是将js源码转化为抽象语法树（AST）的解析器。

###### 解析过程：
```
分词：将整个代码字符串分割成最小语法单元数组
语法分析：在分词基础上建立分析语法单元之间的关系
```
*语法单元*

语法单元是被解析语法当中具备实际意义的最小单元，简单的来理解就是自然语言中的词语。

Javascript 代码中的语法单元主要包括以下这么几种:
```
关键字：例如 var、let、const等

标识符：没有被引号括起来的连续字符，可能是一个变量，也可能是 
if、else 这些关键字，又或者是 true、false 这些内置常量

运算符： +、-、 *、/ 等

数字：像十六进制，十进制，八进制以及科学表达式等语法

字符串：因为对计算机而言，字符串的内容会参与计算或显示

空格：连续的空格，换行，缩进等

注释：行注释或块注释都是一个不可拆分的最小语法单元

其他：大括号、小括号、分号、冒号等
```
分词后
```
[
    {
        "type": "Keyword",
        "value": "var"
    },
    {
        "type": "Identifier",
        "value": "a"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "Numeric",
        "value": "1"
    },
    {
        "type": "Punctuator",
        "value": ";"
    }
]
```

*语法分析*

将分词的结果，进行一个立体的组合，确定词语之间的关系，确定词语最终的表达含义。

简单来说语法分析是对语句和表达式识别，确定之前的关系，这是个递归过程。

```
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "init": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "script"
}
```

babel 中的很多功能都是靠修改 AST 实现的。
