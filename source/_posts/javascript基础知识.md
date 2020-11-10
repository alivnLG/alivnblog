---
title: JavaScript基础知识
date: 2020-06-03 14:26:45
tags:
- JavaScript
categories:
- JavaScript
---
##### 1.HTML 定义了网页的内容；CSS 描述了网页的布局；JavaScript 网页的行为  
<!--more-->
##### 2.JavaScript 是一种轻量级的编程语言。
##### 3.alert() 函数在 JavaScript 中并不常用，但它对于代码测试非常方便。
##### 4.DOM (Document Object Model)（文档对象模型）是用于访问 HTML 元素的正式 W3C 标准。
##### 5.ECMAScript是javascript的规范。javascript是ECMAScript的实现
##### 6.ECMAScript 6 也称为 ECMAScript 2015。ECMAScript 7 也称为 ECMAScript 2016。
##### 7.把函数放入 <head> 部分中，或者放在页面底部。这样就可以把它们安置到同一处位置，不会干扰页面的内容。
##### 8.如果在文档已完成加载后执行 document.write，整个 HTML 页面将被覆盖。
##### 9.在编程语言中，一般固定值称为字面量；变量用于存储数据值。JavaScript 使用关键字 var 来定义变量，使用等号来为变量赋值；变量是一个名称。字面量是一个值。
##### 10.JavaScript 关键字必须以字母、下划线（_）或美元符（$）开始。
##### 11.JavaScript 对大小写是敏感的。
##### 12.JavaScript 中，常见的是驼峰法的命名规则，如 lastName (而不是lastname)。
##### 13.JavaScript 是脚本语言。浏览器会在读取代码时，逐行地执行脚本代码。而对于传统编程来说，会在执行前对所有代码进行编译。
##### 14.单行注释//   多行注释 /*   */
##### 15.变量是存储数据的容器。
##### 16.一个好的编程习惯是，在代码开始处，统一对需要的变量进行声明。
##### 17.变量 carname 的值将是 undefined：
```
var carname;
```
##### 18.数据类型
```
1.值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol。

2.引用数据类型：对象(Object)、数组(Array)、函数(Function)。
```
##### 19.JavaScript 变量均为对象。当您声明一个变量时，就创建了一个新的对象。
##### 20.JavaScript 对象是变量的容器。
##### 21.JavaScript 对象是属性和方法的容器。对象就拥有相应的属性和方法
##### 22.不带返回值和带返回值函数
##### 23.变量生命周期
全局变量从创建到窗口或标签关闭,生命周期长，所以将占据更多的内存,当项目比较大的时候，就可能出现性能问题。

局部变量从创建到函数调用结束而销毁。

调用函数结束，局部变量确实会销毁。但并不是完全销毁，而是一直函数的内部环境中存活着，当函数再度被调用时，变量就“复活”了，所以局部变量还是非常方便的，不会影响二次使用。

在局部环境中，出现全局变量与局部变量重名的时候，起作用的是局部变量，全局变量被屏蔽掉。这是因为上文说过作用域链的原因，先由局部开始搜索变量，当局部找到该变量的时候，就不会再我继续往父级找变量了。

##### 24.非严格模式下给未声明变量赋值创建的全局变量，是全局对象的可配置属性，可以删除。
```
var var1 = 1; // 不可配置全局属性
var2 = 2; // 没有使用 var 声明，可配置全局属性

console.log(this.var1); // 1
console.log(window.var1); // 1

delete var1; // false 无法删除
console.log(var1); //1

delete var2; 
console.log(delete var2); // true
console.log(var2); // 已经删除 报错变量未定义
```
##### 25.在 JavaScript 中, 作用域为可访问变量，对象，函数的集合。
##### 26.变量作用域。
变量在函数内声明，变量为局部作用域,只能在函数内部访问。 

全局变量有全局作用域,网页中所有脚本和函数均可使用。
##### 27.你的全局变量或者函数，可以覆盖 window 对象的变量或者函数。局部变量，包括 window 对象可以覆盖全局变量和函数。
##### 28.HTML DOM事件，以下为常用：
```
//鼠标事件
onclick	      //当用户点击某个对象时调用的事件句柄
oncontextmenu //在用户点击鼠标右键打开上下文菜单时触发
ondblclick	  //当用户双击某个对象时调用的事件句柄
onmousedown	  //鼠标按钮被按下
onmouseenter  //当鼠标指针移动到元素上时触发
onmouseleave  //当鼠标指针移出元素时触发
onmousemove	  //鼠标被移动
onmouseover	  //鼠标移到某元素之上
onmouseout	  //鼠标从某元素移开
onmouseup	  //鼠标按键被松开

//键盘事件
onkeydown	//某个键盘按键被按下
onkeypress	//某个键盘按键被按下并松开
onkeyup	    //某个键盘按键被松开

//框架-对象（Frame/Object）事件
onload	    //一张页面或一幅图像完成加载
onresize	//窗口或框架被重新调整大小
onscroll	//当文档被滚动时发生的事件
onunload	//用户退出页面。 ( <body> 和 <frameset>)

//表单事件
onblur	    //元素失去焦点时触发
onchange	//该事件在表单元素的内容改变时触发( <input>, <keygen>, <select>, 和 <textarea>)
onfocus	    //元素获取焦点时触发
onfocusin	//元素即将获取焦点时触发
onfocusout	//元素即将失去焦点时触发
oninput	    //元素获取用户输入时触发
onreset	    //表单重置时触发
onsearch	//用户向搜索域输入文本时触发 ( <input="search">)	 
onselect	//用户选取文本时触发 ( <input> 和 <textarea>)
onsubmit	//表单提交时触发
```
##### 29.事件对象
```
currentTarget  //返回其事件监听器触发该事件的元素
target	       //返回触发此事件的元素（事件的目标节点）
timeStamp	   //返回事件生成的日期和时间
type	       //返回当前 Event 对象表示的事件的名称
```
例如：
```
//事件属性
function myFunction(e){
    alert(e.currentTarget);
    alert(e.target);
    alert(e.timeStamp);
    alert(e.type)
}
```
```
//目标事件对象
addEventListener()	//允许在目标事件中注册监听事件(IE8 = attachEvent())
dispatchEvent()	//允许发送事件到监听器上 (IE8 = fireEvent())
removeEventListener()	//运行一次注册在事件目标上的监听事件(IE8 = detachEvent())
```
```
var event = new Event('click');//创建一个click事件
elem.addEventListener('click', function(e){}, false);//为元素绑定事件监听
elem.dispatchEvent(event);//派发事件
```
```
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
</head>
<body>
    <button id="click">Click me!</button>
</body>
    <script type="text/javascript">
        window.onload = function(){
            var btn = document.querySelector('#click');
            btn.addEventListener('click', function(e){
                alert('okk!');
            }, false);
            var event = new Event('click');
            btn.dispatchEvent(event);
        }
    </script>
</html>
```
```
//鼠标/键盘事件对象
altKey	//返回当事件被触发时，"ALT" 是否被按下
button	//返回当事件被触发时，哪个鼠标按钮被点击
clientX	//返回当事件被触发时，鼠标指针的水平坐标
clientY	//返回当事件被触发时，鼠标指针的垂直坐标
ctrlKey	//返回当事件被触发时，"CTRL" 键是否被按下
Location	//返回按键在设备上的位置
charCode	//返回onkeypress事件触发键值的字母代码
key	//在按下按键时返回按键的标识符
keyCode	//返回onkeypress事件触发的键的值的字符代码，或者 onkeydown 或 onkeyup 事件的键的代码
which	//返回onkeypress事件触发的键的值的字符代码，或者 onkeydown 或 onkeyup 事件的键的代码
metaKey	//返回当事件被触发时，"meta" 键是否被按下
relatedTarget	//返回与事件的目标节点相关的节点
screenX	//返回当某个事件被触发时，鼠标指针的水平坐标
screenY	//返回当某个事件被触发时，鼠标指针的垂直坐标
shiftKey /*返回当事件被触发时，"SHIFT" 键是否被按下*/
```
##### 30.可以使用索引位置来访问字符串中的每个字符；特殊字符使用转义字符\
```
\'	单引号
\"	双引号
\\	反斜杠
\n	换行
\r	回车
\t	tab(制表符)
\b	退格符
\f	换页符
```
##### 31.少使用构造函数创建对象，它会拖慢执行速度，并可能产生其他副作用。
##### 32.字符串属性和方法
```
//字符串属性
constructor	//返回创建字符串属性的函数
length	//返回字符串的长度
prototype	//允许您向对象添加属性和方法
```

```
//字符串方法
charAt()	   //返回指定索引位置的字符
charCodeAt()	//返回指定索引位置字符的 Unicode 值
concat()	//连接两个或多个字符串，返回连接后的字符串
fromCharCode()	//将 Unicode 转换为字符串
indexOf()	//返回字符串中检索指定字符第一次出现的位置
lastIndexOf()	//返回字符串中检索指定字符最后一次出现的位置
localeCompare()	//用本地特定的顺序来比较两个字符串
match()	//找到一个或多个正则表达式的匹配
replace()	//替换与正则表达式匹配的子串
search()	//检索与正则表达式相匹配的值
slice()	//提取字符串的片断，并在新的字符串中返回被提取的部分
split()	//把字符串分割为子字符串数组
substr()	//从起始索引号提取字符串中指定数目的字符
substring()	//提取字符串中两个指定的索引号之间的字符
toLocaleLowerCase()	//根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射
toLocaleUpperCase()	//根据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射
toLowerCase()	//把字符串转换为小写
toString()	//返回字符串对象值
toUpperCase()	//把字符串转换为大写
trim()	//移除字符串首尾空白
valueOf()	//返回某个字符串对象的原始值
```
##### 33.javascript运算符
算术运算符  + - * / % ++ --  
赋值运算符  = += -= *= /= %=  
拼接   +  
比较逻辑运算符  == === != !== > >= < <=  
条件运算符 ? :
##### 34.javascript循环
for - 循环代码块一定的次数  
for/in - 循环遍历对象的属性  
while - 当指定的条件为 true 时循环指定的代码块  
do/while - 同样当指定的条件为 true 时循环指定的代码块
##### 35.JavaScript Break 和 Continue 语句
break 语句用于跳出循环。  
continue 用于跳过循环中的一个迭代。
##### 36.在JavaScript中，数组是一种特殊的对象类型。 因此 typeof [1,2,3,4] 返回 object。
##### 37.null
在 JavaScript 中 null 表示 "什么都没有"。  
null是一个只有一个值的特殊类型。表示一个空对象引用。  
用 typeof 检测 null 返回是object。
```
你可以设置为 null 来清空对象:

实例
var person = null;           // 值为 null(空), 但类型为对象

你可以设置为 undefined 来清空对象:

实例
var person = undefined;     // 值为 undefined, 类型为 undefined
```
##### 38.undefined
在 JavaScript 中, undefined 是一个没有设置值的变量。  
typeof 一个没有值的变量会返回 undefined。

##### 39.undefined 和 null 的区别
null 和 undefined 的值相等，但类型不等
##### 40.constructor 属性返回所有 JavaScript 变量的构造函数。
```
"John".constructor                 // 返回函数 String()  { [native code] }
(3.14).constructor                 // 返回函数 Number()  { [native code] }
false.constructor                  // 返回函数 Boolean() { [native code] }
[1,2,3,4].constructor              // 返回函数 Array()   { [native code] }
{name:'John', age:34}.constructor  // 返回函数 Object()  { [native code] }
new Date().constructor             // 返回函数 Date()    { [native code] }
function () {}.constructor         // 返回函数 Function(){ [native code] }
```
##### 41.数据类型转换
##### 42.正则表达式
正则表达式（英语：Regular Expression，在代码中常简写为regex、regexp或RE）使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。

搜索模式可用于文本搜索和文本替换。

1.正则表达式修饰符  
```
i	//执行对大小写不敏感的匹配。
g	//执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
m	//执行多行匹配。
```
2.正则表达式模式  
```
//方括号
[abc]	//查找方括号之间的任何字符。
[^abc]	//查找任何不在方括号之间的字符。
[0-9]	//查找任何从 0 至 9 的数字。
[a-z]	//查找任何从小写 a 到小写 z 的字符。
[A-Z]	//查找任何从大写 A 到大写 Z 的字符。
[A-z]	//查找任何从大写 A 到小写 z 的字符。
[adgk]	//查找给定集合内的任何字符。
[^adgk]	//查找给定集合外的任何字符。
(red|blue|green)	//查找任何指定的选项。

//元字符
.	//查找单个字符，除了换行和行结束符。
\w	//查找单词字符。
\W	//查找非单词字符。
\d	//查找数字。
\D	//查找非数字字符。
\s	//查找空白字符。
\S	//查找非空白字符。
\b	//匹配单词边界。
\B	//匹配非单词边界。
\0	//查找 NULL 字符。
\n	//查找换行符。
\f	//查找换页符。
\r	//查找回车符。
\t	//查找制表符。
\v	//查找垂直制表符。
\xxx	//查找以八进制数 xxx 规定的字符。
\xdd	//查找以十六进制数 dd 规定的字符。
\uxxxx	//查找以十六进制数 xxxx 规定的 Unicode 字符。

//量词
n+	
//匹配任何包含至少一个 n 的字符串。

例如，/a+/ 匹配 "candy" 中的 "a"，"caaaaaaandy" 中所有的 "a"。

n*	
//匹配任何包含零个或多个 n 的字符串。

例如，/bo*/ 匹配 "A ghost booooed" 中的 "boooo"，"A bird warbled" 中的 "b"，但是不匹配 "A goat grunted"。

n?	
//匹配任何包含零个或一个 n 的字符串。

例如，/e?le?/ 匹配 "angel" 中的 "el"，"angle" 中的 "le"。

n{X}	
//匹配包含 X 个 n 的序列的字符串。

例如，/a{2}/ 不匹配 "candy," 中的 "a"，但是匹配 "caandy," 中的两个 "a"，且匹配 "caaandy." 中的前两个 "a"。

n{X,}	
//X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。

例如，/a{2,}/ 不匹配 "candy" 中的 "a"，但是匹配 "caandy" 和 "caaaaaaandy." 中所有的 "a"。

n{X,Y}	
//X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。

例如，/a{1,3}/ 不匹配 "cndy"，匹配 "candy," 中的 "a"，"caandy," 中的两个 "a"，匹配 "caaaaaaandy" 中的前面三个 "a"。注意，当匹配 "caaaaaaandy" 时，即使原始字符串拥有更多的 "a"，匹配项也是 "aaa"。

n$	//匹配任何结尾为 n 的字符串。
^n	//匹配任何开头为 n 的字符串。
?=n	//匹配任何其后紧接指定字符串 n 的字符串。
?!n	//匹配任何其后没有紧接指定字符串 n 的字符串。
```
3.RegExp 对象  
在 JavaScript 中，RegExp 对象是一个预定义了属性和方法的正则表达式对象。

test() 方法是一个正则表达式方法。  
test() 方法用于检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。

exec() 方法是一个正则表达式方法。  
exec() 方法用于检索字符串中的正则表达式的匹配。  
该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。


toString	返回正则表达式的字符串。

4.支持正则表达式的 String 对象的方法
```
search	//检索与正则表达式相匹配的值
match	//找到一个或多个正则表达式的匹配
replace	//替换与正则表达式匹配的子串
split	//把字符串分割为字符串数组
```
5.RegExp 对象属性
```
constructor	//返回一个函数，该函数是一个创建 RegExp 对象的原型。
global	//判断是否设置了 "g" 修饰符
ignoreCase	//判断是否设置了 "i" 修饰符
lastIndex	//用于规定下次匹配的起始位置
multiline	//判断是否设置了 "m" 修饰符
source	//返回正则表达式的匹配模式
```
##### 43.JavaScript 错误 - throw、try 和 catch
try 语句测试代码块的错误。

catch 语句处理错误。

throw 语句创建自定义错误。

finally 语句在 try 和 catch 语句之后，无论是否有触发异常，该语句都会执行。

##### 44.调试
console.log() 方法  

设置断点

debugger 关键字

##### 45.变量提升
JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。

JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
```
x = 5; // 变量 x 设置为 5

elem = document.getElementById("demo"); // 查找元素 
elem.innerHTML = x;                     // 在元素中显示 x

var x; // 声明 x
```
```
var x; // 声明 x
x = 5; // 变量 x 设置为 5

elem = document.getElementById("demo"); // 查找元素 
elem.innerHTML = x;                     // 在元素中显示 x
```
JavaScript 只有声明的变量会提升，初始化的不会。

JavaScript 严格模式(strict mode)不允许使用未声明的变量。
##### 46.严格模式
严格模式通过在脚本或函数的头部添加 "use strict"; 表达式来声明。

作用：  
消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;  
消除代码运行的一些不安全之处，保证代码运行的安全；  
提高编译器效率，增加运行速度；  
为未来新版本的Javascript做好铺垫。  
##### 47.JavaScript this 关键字
面向对象语言中 this 表示当前对象的一个引用。

但在 JavaScript 中 this 不是固定不变的，它会随着执行环境的改变而改变。

###### 在方法中，this 表示该方法所属的对象。  
###### 如果单独使用，this 表示全局对象。  
###### 在函数中，this 表示全局对象。  
###### 在函数中，在严格模式下，this 是未定义的(undefined)。  
###### 在事件中，this 表示接收事件的元素。  
###### 类似 call() 和 apply() 方法可以将 this 引用到任何对象。

##### 48.JavaScript JSON
JSON 是用于存储和传输数据的格式。

JSON 通常用于服务端向网页传递数据 。

JSON 使用 JavaScript 语法，但是 JSON 格式仅仅是一个文本。
文本可以被任何编程语言读取及作为数据格式传递。

实例：
```
{"sites":[
    {"name":"Runoob", "url":"www.runoob.com"}, 
    {"name":"Google", "url":"www.google.com"},
    {"name":"Taobao", "url":"www.taobao.com"}
]}
```
JSON 格式在语法上与创建 JavaScript 对象代码是相同的。

由于它们很相似，所以 JavaScript 程序可以很容易的将 JSON 数据转换为 JavaScript 对象。
```
JSON.parse()	//用于将一个 JSON 字符串转换为 JavaScript 对象。
JSON.stringify()	//用于将 JavaScript 值转换为 JSON 字符串。
```
##### 49.javascript:void(0) 中最关键的是 void 关键字， void 是 JavaScript 中非常重要的关键字，该操作符指定要计算一个表达式但是不返回值。javascript:void(0), 仅仅表示一个死链接。
##### 50.代码规范

##### 51.函数定义
Function() 构造函数，在 JavaScript 中，很多时候，你需要避免使用 new 关键字。

提升（Hoisting）是 JavaScript 默认将当前作用域提升到前面去的的行为。

提升（Hoisting）应用在变量的声明与函数的声明。

因此，函数可以在声明之前调用;

函数也是对象，有属性和方法

ES6箭头函数
##### 52.自调用函数
函数表达式可以 "自调用"。

自调用表达式会自动调用。

如果表达式后面紧跟 () ，则会自动调用。

不能自调用声明的函数。

通过添加括号，来说明它是一个函数表达式：

实例
```
(function () {
    var x = "Hello!!";      // 我将调用自己
})();
```
##### 53.函数参数
形参和实参

形参，是在定义函数时使用的参数，目的是用来接收调用该函数时传进来的实际参数。 

实参：是在调用时传递给函数的参数 
```
function myfun(a,b,c){
    ...  
}
myfun(1,2,3);
```
这里a,b,c就是形参。1,2,3为实参。 

形参和实参是不同的变量，他们在内存中处于不同的位置，形参在函数运行结束时将被释放

函数参数传递包含两种方式：值传递和引用传递。

值传递：形参是实参值的一个副本，对形参的改变不会影响实参

ES6扩展，解构赋值
##### 54.函数调用
作为一个函数调用  
```
function myFunction(a, b) {
    return a * b;
}
myFunction(10, 2);           // myFunction(10, 2) 返回 20
```
函数作为方法调用  
```
var myObject = {
    firstName:"John",
    lastName: "Doe",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
myObject.fullName();         // 返回 "John Doe"
```
使用构造函数调用函数  
```
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}
 
// This    creates a new object
var x = new myFunction("John","Doe");
x.firstName;                             // 返回 "John"
```
作为函数方法调用函数
```
function myFunction(a, b) {
    return a * b;
}
myObject = myFunction.call(myObject, 10, 2);     // 返回 20
```
通过 call() 或 apply() 方法你可以设置 this 的值, 且作为已存在对象的新方法调用。

##### 55.javascript闭包
能够访问另一个函数作用域的变量的函数

有时候需要得到函数内的局部变量，一般办不到，

解决方法：在函数的内部，再定义一个函数。
```
function test(){
    var name = 'hcoder';
    function getName(){
        return name;//把name作为返回值传递出去
    }
    return getName;
}
var funGetName = test();
var name = funGetName();
```
作用：  
1.可以读取函数内部的变量；  
2.让这些变量的值始终保持在内存中  

创建闭包的常见方式就是在一个函数内部创建另一个函数。

闭包可以把一些不想要暴露在全局的变量或方法封装在函数内部。

通常用面向对象思想能实现的功能，用闭包都能实现。

注意：  
内存消耗打大，闭包会在父函数外部，改变父函数内部变量的值，所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

闭包是一种保护私有变量的机制，在函数执行时形成私有的作用域，保护里面的私有变量不受外界干扰。

直观的说就是形成一个不销毁的栈环境。

##### 56.绝对不要在文档(DOM)加载完成之后使用 document.write()。这会覆盖该文档。

##### 57.JavaScript HTML DOM 元素 (节点)
appendChild()

insertBefore()

removeChild()

replaceChild()

##### 58.JavaScript HTML DOM 集合(Collection)
getElementsByTagName() 方法返回 HTMLCollection 对象。

HTMLCollection 对象类似包含 HTML 元素的一个数组。

HTMLCollection 对象的 length 属性定义了集合中元素的数量。

注意：  
HTMLCollection 不是一个数组！

HTMLCollection 看起来可能是一个数组，但其实不是。

你可以像数组一样，使用索引来获取元素。

HTMLCollection 无法使用数组的方法： valueOf(), pop(), push(), 或 join() 。

##### 59.JavaScript HTML DOM 节点列表
NodeList 对象是一个从文档中获取的节点列表 (集合) 。

NodeList 对象类似 HTMLCollection 对象。

所有浏览器的 childNodes 属性返回的是 NodeList 对象。

大部分浏览器的 querySelectorAll() 返回 NodeList 对象。

HTMLCollection 与 NodeList 的区别
HTMLCollection 是 HTML 元素的集合。

NodeList 是一个文档节点的集合。

NodeList 与 HTMLCollection 有很多类似的地方。

NodeList 与 HTMLCollection 都与数组对象有点类似，可以使用索引 (0, 1, 2, 3, 4, ...) 来获取元素。

NodeList 与 HTMLCollection 都有 length 属性。

HTMLCollection 元素可以通过 name，id 或索引来获取。

NodeList 只能通过索引来获取。

只有 NodeList 对象有包含属性节点和文本节点。
```
节点列表不是一个数组！

节点列表看起来可能是一个数组，但其实不是。

你可以像数组一样，使用索引来获取元素。

节点列表无法使用数组的方法： valueOf(), pop(), push(), 或 join() 。
```
##### 60.JavaScript 对象
JavaScript 中的所有事物都是对象：字符串、数值、数组、函数...,此外，JavaScript 允许自定义对象。

对象只是一种特殊的数据。对象拥有属性和方法。

##### 61.JavaScript prototype（原型对象）
所有的 JavaScript 对象都会从一个 prototype（原型对象）中继承属性和方法。

对象构造器：
```
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
 
var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");
```
###### prototype 继承
所有的 JavaScript 对象都会从一个 prototype（原型对象）中继承属性和方法：

Date 对象从 Date.prototype 继承。
Array 对象从 Array.prototype 继承。
Person 对象从 Person.prototype 继承。
所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

Date 对象, Array 对象, 以及 Person 对象从 Object.prototype 继承。

添加属性和方法
有的时候我们想要在所有已经存在的对象添加新的属性或方法。

另外，有时候我们想要在对象的构造函数中添加属性或方法。

使用 prototype 属性就可以给对象的构造函数添加新的属性：
```
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
 
Person.prototype.nationality = "English";
```
```
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
 
Person.prototype.name = function() {
  return this.firstName + " " + this.lastName;
};
```

##### 62.JavaScript Number 对象
###### 八进制和十六进制
如果前缀为 0，则 JavaScript 会把数值常量解释为八进制数，如果前缀为 0 和 "x"，则解释为十六进制数。

###### 绝不要在数字前面写零，除非您需要进行八进制转换。
使用 toString() 方法 输出16进制、8进制、2进制。
```
var myNumber=128;
myNumber.toString(16);   // 返回 80
myNumber.toString(8);    // 返回 200
myNumber.toString(2);    // 返回 10000000
```
###### NaN 属性是代表非数字值的特殊值。该属性用于指示某个值不是数字。可以把 Number 对象设置为该值，来指示其不是数字值。
```
//数字属性
MAX_VALUE
MIN_VALUE
NEGATIVE_INFINITY
POSITIVE_INFINITY
NaN
prototype
constructor

//数字方法
toExponential()
toFixed()
toPrecision()
toString()
valueOf()
```
##### 63.JavaScript 字符串（String）对象
```
//字符串属性:
length
prototype
constructor

//字符串方法:
charAt()
charCodeAt()
concat()
fromCharCode()
indexOf()
lastIndexOf()
match()
replace()
search()
slice()
split()
substr()
substring()
toLowerCase()
toUpperCase()
valueOf()
```

##### 64.JavaScript Date（日期） 对象
```
//Date 对象属性
constructor	//返回对创建此对象的 Date 函数的引用。
prototype	//使您有能力向对象添加属性和方法。

//Date 对象方法
getDate()	//从 Date 对象返回一个月中的某一天 (1 ~ 31)。
getDay()	//从 Date 对象返回一周中的某一天 (0 ~ 6)。
getFullYear()	//从 Date 对象以四位数字返回年份。
getHours()	//返回 Date 对象的小时 (0 ~ 23)。
getMilliseconds()	//返回 Date 对象的毫秒(0 ~ 999)。
getMinutes()	//返回 Date 对象的分钟 (0 ~ 59)。
getMonth()	//从 Date 对象返回月份 (0 ~ 11)。
getSeconds()	//返回 Date 对象的秒数 (0 ~ 59)。
getTime()	//返回 1970 年 1 月 1 日至今的毫秒数。
getTimezoneOffset()	//返回本地时间与格林威治标准时间 (GMT) 的分钟差。
getUTCDate()	//根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。
getUTCDay()	//根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。
getUTCFullYear()	//根据世界时从 Date 对象返回四位数的年份。
getUTCHours()	//根据世界时返回 Date 对象的小时 (0 ~ 23)。
getUTCMilliseconds()	//根据世界时返回 Date 对象的毫秒(0 ~ 999)。
getUTCMinutes()	//根据世界时返回 Date 对象的分钟 (0 ~ 59)。
getUTCMonth()	//根据世界时从 Date 对象返回月份 (0 ~ 11)。
getUTCSeconds()	//根据世界时返回 Date 对象的秒钟 (0 ~ 59)。
getYear()	//已废弃。 请使用 getFullYear() 方法代替。
parse()	//返回1970年1月1日午夜到指定日期（字符串）的毫秒数。
setDate()	//设置 Date 对象中月的某一天 (1 ~ 31)。
setFullYear()	//设置 Date 对象中的年份（四位数字）。
setHours()	//设置 Date 对象中的小时 (0 ~ 23)。
setMilliseconds()	//设置 Date 对象中的毫秒 (0 ~ 999)。
setMinutes()	//设置 Date 对象中的分钟 (0 ~ 59)。
setMonth()	//设置 Date 对象中月份 (0 ~ 11)。
setSeconds()	//设置 Date 对象中的秒钟 (0 ~ 59)。
setTime()	//setTime() 方法以毫秒设置 Date 对象。
setUTCDate()	//根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
setUTCFullYear()	//根据世界时设置 Date 对象中的年份（四位数字）。
setUTCHours()	//根据世界时设置 Date 对象中的小时 (0 ~ 23)。
setUTCMilliseconds()	//根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
setUTCMinutes()	//根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
setUTCMonth()	//根据世界时设置 Date 对象中的月份 (0 ~ 11)。
setUTCSeconds()	//setUTCSeconds() 方法用于根据世界时 (UTC) 设置指定时间的秒字段。
setYear()	//已废弃。请使用 setFullYear() 方法代替。
toDateString()	//把 Date 对象的日期部分转换为字符串。
toGMTString()	//已废弃。请使用 toUTCString() 方法代替。
toISOString()	//使用 ISO 标准返回字符串的日期格式。
toJSON()	//以 JSON 数据格式返回日期字符串。
toLocaleDateString()	//根据本地时间格式，把 Date 对象的日期部分转换为字符串。
toLocaleTimeString()	//根据本地时间格式，把 Date 对象的时间部分转换为字符串。
toLocaleString()	//据本地时间格式，把 Date 对象转换为字符串。
toString()	//把 Date 对象转换为字符串。
toTimeString()	//把 Date 对象的时间部分转换为字符串。
toUTCString()	//根据世界时，把 Date 对象转换为字符串。
UTC()	//根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。
valueOf()	//返回 Date 对象的原始值。

```

##### 65.JavaScript Array（数组） 对象
```
//数组属性
constructor	//返回创建数组对象的原型函数。
length	//设置或返回数组元素的个数。
prototype	//允许你向数组对象添加属性或方法。

//数组方法
concat()	//连接两个或更多的数组，并返回结果。
copyWithin()	//从数组的指定位置拷贝元素到数组的另一个指定位置中。
entries()	//返回数组的可迭代对象。
every()	//检测数值元素的每个元素是否都符合条件。
fill()	//使用一个固定值来填充数组。
filter()	//检测数值元素，并返回符合条件所有元素的数组。
find()	//返回符合传入测试（函数）条件的数组元素。
findIndex()	//返回符合传入测试（函数）条件的数组元素索引。
forEach()	//数组每个元素都执行一次回调函数。
from()	//通过给定的对象中创建一个数组。
includes()	//判断一个数组是否包含一个指定的值。
indexOf()	//搜索数组中的元素，并返回它所在的位置。
isArray()	//判断对象是否为数组。
join()	//把数组的所有元素放入一个字符串。
keys()	//返回数组的可迭代对象，包含原始数组的键(key)。
lastIndexOf()	//返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
map()	//通过指定函数处理数组的每个元素，并返回处理后的数组。
pop()	//删除数组的最后一个元素并返回删除的元素。
push()	//向数组的末尾添加一个或更多元素，并返回新的长度。
reduce()	//将数组元素计算为一个值（从左到右）。
reduceRight()	//将数组元素计算为一个值（从右到左）。
reverse()	//反转数组的元素顺序。
shift()	//删除并返回数组的第一个元素。
slice()	//选取数组的的一部分，并返回一个新数组。
some()	//检测数组元素中是否有元素符合指定条件。
sort()	//对数组的元素进行排序。
splice()	//从数组中添加或删除元素。
toString()	//把数组转换为字符串，并返回结果。
unshift()	//向数组的开头添加一个或更多元素，并返回新的长度。
valueOf()	//返回数组对象的原始值。
```
##### 66.JavaScript Boolean（布尔） 对象
```
//boolean属性
constructor	//返回对创建此对象的 Boolean 函数的引用
prototype	//使您有能力向对象添加属性和方法。

//boolean方法
toString()	//把布尔值转换为字符串，并返回结果。
valueOf()	//返回 Boolean 对象的原始值。
```
##### 67.JavaScript Math（算数） 对象
```
//Math对象属性
E	//返回算术常量 e，即自然对数的底数（约等于2.718）。
LN2	//返回 2 的自然对数（约等于0.693）。
LN10	//返回 10 的自然对数（约等于2.302）。
LOG2E	//返回以 2 为底的 e 的对数（约等于 1.4426950408889634）。
LOG10E	//返回以 10 为底的 e 的对数（约等于0.434）。
PI	//返回圆周率（约等于3.14159）。
SQRT1_2	//返回 2 的平方根的倒数（约等于 0.707）。
SQRT2	//返回 2 的平方根（约等于 1.414）。

//Math对象方法
abs(x)	//返回 x 的绝对值。
acos(x)	//返回 x 的反余弦值。
asin(x)	//返回 x 的反正弦值。
atan(x)	//以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
atan2(y,x)	//返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
ceil(x)	//对数进行上舍入。
cos(x)	//返回数的余弦。
exp(x)	//返回 Ex 的指数。
floor(x)	//对 x 进行下舍入。
log(x)	//返回数的自然对数（底为e）。
max(x,y,z,...,n)	//返回 x,y,z,...,n 中的最高值。
min(x,y,z,...,n)	//返回 x,y,z,...,n中的最低值。
pow(x,y)	//返回 x 的 y 次幂。
random()	//返回 0 ~ 1 之间的随机数。
round(x)	//四舍五入。
sin(x)	//返回数的正弦。
sqrt(x)	//返回数的平方根。
tan(x)	//返回角的正切。

```

##### 68.JavaScript RegExp 对象

##### 69.JavaScript Window - 浏览器对象模型
浏览器对象模型 (BOM) 使 JavaScript 有能力与浏览器"对话"。

###### Window 对象
所有浏览器都支持 window 对象。它表示浏览器窗口。

所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。

全局变量是 window 对象的属性。

全局函数是 window 对象的方法。

甚至 HTML DOM 的 document 也是 window 对象的属性之一

###### Window 尺寸
有三种方法能够确定浏览器窗口的尺寸。

对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：
```
window.innerHeight - 浏览器窗口的内部高度(包括滚动条)
window.innerWidth - 浏览器窗口的内部宽度(包括滚动条)
```
对于 Internet Explorer 8、7、6、5：
```
document.documentElement.clientHeight
document.documentElement.clientWidth
```
或者
```
document.body.clientHeight
document.body.clientWidth
```
###### 其他window方法
```
window.open() - 打开新窗口
window.close() - 关闭当前窗口
window.moveTo() - 移动当前窗口
window.resizeTo() - 调整当前窗口的尺寸
```
##### 70.JavaScript Window Screen
```
screen.availWidth - 可用的屏幕宽度
screen.availHeight - 可用的屏幕高度
```
##### 71.JavaScript Window Location
```
location.href //返回当前页面完整的 URL
location.hostname //返回 web 主机的域名
location.pathname //返回当前页面的路径和文件名
location.port //返回 web 主机的端口 （80 或 443）
location.protocol //返回所使用的 web 协议（http:// 或 https://）
Location Assign  //加载新的文档
```
##### 72.JavaScript Window History
```
history.back() - 与在浏览器点击后退按钮相同
history.forward() - 与在浏览器中点击向前按钮相同
```
##### 73.JavaScript Window Navigator
###### 注意
来自 navigator 对象的信息具有误导性，不应该被用于检测浏览器版本，这是因为：  
navigator 数据可被浏览器使用者更改  
一些浏览器对测试站点会识别错误  
浏览器无法报告晚于浏览器发布的新操作系统
##### 74.JavaScript 弹窗
```
window.alert() //警告框
window.confirm() //确认框
window.prompt() //提示框
```
##### 75.JavaScript 计时事件
setInterval() 和 setTimeout() 是 HTML DOM Window对象的两个方法。
```
setInterval()   //间隔指定的毫秒数不停地执行指定的代码。
setTimeout()   //在指定的毫秒数后执行指定代码。

clearInterval() //方法用于停止 setInterval() 方法执行的函数代码。
clearTimeout()  //方法用于停止执行setTimeout()方法的函数代码。
```
##### 76.JavaScript Cookie
Cookie 用于存储 web 页面的用户信息。

Cookie 是一些数据, 存储于你电脑上的文本文件中。

当 web 服务器向浏览器发送 web 页面时，在连接关闭后，服务端不会记录用户的信息。

Cookie 的作用就是用于解决 "如何记录客户端的用户信息":

当用户访问 web 页面时，他的名字可以记录在 cookie 中。
在用户下一次访问该页面时，可以在 cookie 中读取用户访问记录。

Cookie 以名/值对形式存储，如下所示:
```
username=John Doe
```
###### 设置 cookie 值的函数
```
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
```
###### 获取 cookie 值的函数
```
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
```
##### 77.javascript 相关框架
jquery

lodash

ajax

<br/>
<br/>  
<br/>
<br/> 
<br/> 
<br/> 
<br/> 

### 补充知识点
##### JavaScript 是一种基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。

##### 1.JavaScript 中精度问题以及解决方案
浮点数精度问题，比如 0.1 + 0.2 !== 0.3

大数精度问题，比如 9999 9999 9999 9999 == 1000 0000 0000 0000 1

toFixed 四舍五入结果不准确，比如 1.335.toFixed(2) == 1.33

解决方案：  

使用bignumber.js  decimal.js   big.js等库，解决了精度问题，支持大数据运算
##### 2.像素,实际尺寸,逻辑像素.ppi

##### 3.自然对数e
loge
##### 4.平方根
算术平方根  
比如: √4  根号4

##### 5.次幂
比如:2的2次方,3的4次方;  
Math.pow(2,2); Math.pow(3,4)
##### 6.位运算符
32位二进制表示,第32表示正负,0为正,1为负  
~  &  |  ^   <<  >>
##### 7.三角函数
正弦sin        对边/斜边  
余弦cos       邻边/斜边  
正切tan       对边/邻边  
余切cot       邻边/对边  
##### 8.自执行函数
立即调用函数
```
#括号
(function(arg){
    console.log(arg)
})(1)  //输出1
```
```
#叹号
!function(arg){
    console.log(arg)
})(1)  //输出1
```
```
#加号
+function(arg){
    console.log(arg)
})(1)  //输出1
```
```
#减号
-function(arg){
    console.log(arg)
})(1)  //输出1
```
###### 9.使用()()匿名自执行函数的好处
1.避免作用域命名污染  
2.提升性能（减少了对作用域的查找）  
3.避免全局命名冲突  
4.有利于代码压缩  
5.保存闭包状态  
6.颠倒代码执行顺序
##### 10.window.onload
```
window.onload = function
```
不能重复使用，同时存在多个的时候，就只执行一个。  
采用自执行函数，多次调用
##### 11.内存泄漏
内存泄露是指你用不到（访问不到）的变量，依然占居着内存空间，不能被再次利用起来。  
使用闭包函数时，回收不了闭包里面引用的变量，就会造成内存泄漏，
可以使用outColor = null; //释放内存
##### 12.js上下文
当前JavaScript代码被解析和执行时所在环境，当我们调用一个函数的时候就会创建一个函数的环境，我们可以称之为执行环境，简单点也可称之为环境。当然，咱们在这里叫作执行上下文。当然，每个函数都会有各自的执行上下文。简单来说，就是函数里面的执行环境。执行上下文定义了变量或函数有权访问其他数据，决定了他们各自的行为 。

###### 全局执行上下文
记住全局执行上下文，只有一个即一个程序中只能有一个全局执行上下文，如果是在浏览器中，那么全局对象就是window对象，this指向就是这个全局对象

###### 函数执行上下文
函数执行上下文可以存在多个，甚至是无数个；只有在函数被调用时才会被创建（函数执行上下文），每次调用函数都会创建一个新的执行上下文

###### Eval函数执行上下文
在eval函数中的代码才有eval函数执行上下文，理解了执行上下文（即环境），那么需要了解在JavaScript程序中的执行流，以及控制机制（执行堆栈）流程。


##### 13.递归
自己调用自己，称为递归调用，在程序中函数直接或间接调用自己
使用递归函数一定要注意，处理不当就会进入死循环。递归函数只有在特定的情况下使用 ，比如阶乘问题 、遍历成树、多叉树。
```
function func(n) {
    if (n == 1) {
    }
    return n * func(n - 1);
}
arguments.callee
```
是一个指向正在执行的函数的指针，arguments.callee 返回正在被执行的对现象。通过使用arguments.callee代替函数名，
可以确保无论怎么调用函数都不会出现问题
```
function fact(num){ 
    if (num<=1){ 
        return 1; 
    }else{ 
        return num*arguments.callee(num-1); //此处更改了。 
    } 
} 
```
在严格模式下，不能通过脚本访问arguments.callee，访问这个属性会导致错误。不过可以使用命名函数表达式达成一致的效果。
```
var fn = function f(num){
         if(num<=1){
            reyurn 1;
         }else{
           return num*f(num-1)
         }
   }
```
##### 14.枚举
js弱类型语言

在计算机编程中，枚举类型是一个由一组叫做元素, 成员, 枚举成员的值组成的数据类型.枚举成员的名字在语言中通常充当常量的标识符.枚举类型的变量可以被任意的枚举成员所赋值.  
js中每个对象的属性（js里万物皆属性，对象的属性也是对象）都有一个属性叫enumerable（可枚举性），这个属性true/false决定了该对象的属性是否可枚举（就是让一些方法访问到这个属性）

枚举指对象的属性是否可以遍历出来，简单点说就是是否可以被列举出来。可枚举性决定了这个属性能否被for…in查找遍历到。
js中基本包装类型的原型属性是不可枚举的

###### 1.for...in操作
对所有可枚举属性(对象本身的可枚举属性，以及从其构造函数原型中继承的可枚举属性)
###### 2.Object.keys()方法（和for...in的区别就是Object.keys()不会返回对象原型链上的属性）
###### 3.JSON.stringify()方法。
###### 4.Object.assign()
以上三个自身可枚举属性才有效，Object.assign()对 Symbol 属性有效

判断属性是否可枚举：Object.propertyIsEnumerable()；但需要注意的一点是如果需要判断的属性在object的原型链上，不管它是否可枚举，Object.propertyIsEnumerable()都会返回false
hasOwnProperty()方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
##### 15.原型链
```
//构造函数
function Female(name){
     this.name = name;
    this.sex = 'female';  
 }
 ```
创建实例
```
var person1 = new Female("Summer")
```
构造函数Female就是实例对象person1的原型

构造函数可以设置prototype属性，这个属性就指向原型对象，用作共享属性和方法
实例对象的属性和方法一般分为两种：一种是自身的，一种是引用自prototype的。

每当代码读取某个对象的某个属性的时候，都会执行一次搜索。首先从对象实例本身开始，如果在实例中找到了该属性，则返回该属性的值，如果没有找到，则顺着原型链指针向上，到原型对象中去找，如果如果找到就返回该属性值。

js里完全依靠"原型链"(prototype chain)模式来实现继承
proto：事实上就是原型链指针！！
prototype：上面说到这个是指向原型对象的
constructor：每一个原型对象都包含一个指向构造函数的指针，就是constructor

为了实现继承，proto会指向上一层的原型对象，而上一层的结构依然类似，那么就利用proto一直指向Object的原型对象上！Object.prototype.__proto__ = null;表示到达最顶端。如此形成了原型链继承。

在js里，继承机制是原型继承。继承的起点是 对象的原型（Object prototype）。

一切皆为对象，只要是对象，就会有 proto 属性，该属性存储了指向其构造的指针。

Object prototype也是对象，其 proto 指向null。

对象分为两种：函数对象和普通对象，只有函数对象拥有『原型』对象（prototype）。

prototype的本质是普通对象。

Function prototype比较特殊，是没有prototype的函数对象。
new操作得到的对象是普通对象。

当调取一个对象的属性时，会先在本身查找，若无，就根据 proto 找到构造原型，若无，继续往上找。最后会到达顶层Object prototype，它的 proto 指向null，均无结果则返回undefined，结束。

由 proto 串起的路径就是『原型链』。
##### 16.promise对象
比如我们在高峰期去麦当劳点餐，告诉服务员要一个汉堡，服务员给你一个订单收据上面印着2204，告诉你先等着取餐。这里订单号即为一个Promise，保证最后我会得到我的汉堡。这时你要拿好你的订单收据，用来拿他和汉堡交换；而且在排队等餐的过程中，你可能会刷刷手机或是和朋友说要一起吃汉堡；你拿到订单号时也不会去想这个汉堡，尽管你很想吃，这是因为你已经把订单号当作了汉堡的占位符；从根本上来说，这个占位符，使这个值不再依赖时间，这是一个未来值。最终屏幕上印着取餐单号2204，你拿着订单收据，把他交给收银员，最后换来了汉堡。也就是说，一旦你需要的值（汉堡）准备好了，你就需要用承诺值(订单收据)来换取这个值本身。

但也有一种情况是，你去收银台拿汉堡时，服务员说，你要的汉堡卖完了。这时未来值还有一个重要特性：他可能成功、也会失败。每次点汉堡时，要么会得到一个汉堡，要么会得到一个售罄消息。

###### 异步任务中的流程控制机制
```
//现在值与未来值
var x,y=2
x+y // NaN  x没有被决议（resolved）
```
+运算符不会等待x，y都准备好，再进行运算。如果有一种方式，来判断两个值的准备状态，如果任何一个没有准备好，就等待二者都准备好，在进行后面的计算。promise为了统一处理现在和将来，所有的操作都成了异步。

###### 链式方法then()

###### promise是为解决异步处理回调金字塔问题而产生的

Promise：简单来说就是一个容器，里面保存着某个未来才会结束的事件(通常是一个异步操作)的结果。从语法上讲，Promise是一个对象，从它可以获取异步操作的消息；

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理更强大，它提供统一的API，各种异步操作都可以用同样的方法进行处理；

1）无法取消Promise,一旦新建它就会立即执行，无法中途取消  
2）如果不设置回调函数，Promise内部抛出的错误，不会反映到外部  
3）当处于pending状态时，无法得知目前进展到哪一个阶段，是刚刚开始还是即将完成

一门语言在运行的时候，需要一个环境，叫做宿主环境。对于JavaScript，宿主环境最常见的是web浏览器，浏览器提供了一个JavaScript运行的环境，这个环境里面，需要提供一些接口，好让JavaScript引擎能够和宿主环境对接。JavaScript引擎才是真正执行JavaScript代码的地方，常见的引擎有V8(目前最快JavaScript引擎、Google生产)、JavaScript core。JavaScript引擎主要做了下面几件事情：  

一套与宿主环境相联系的规则;  
JavaScript引擎内核（基本语法规范、逻辑、命令和算法);  
一组内置对象和API;  
其他约定。  

但是环境不是唯一的，也就是JavaScript不仅仅能够在浏览器里面跑，也能在其他提供了宿主环境的程序里面跑，最常见的就是nodejs。同样作为一个宿主环境，nodejs也有自己的JavaScript引擎--V8。
##### 17.==号左右的表达式分别为String类型和Boolean类型时，会将两边的表达式转化为Number类型进行比较：
```
true == '1'  //true
true == '2'  //false
```
true转化为1,false转化为0,String类型值则使用Number()函数进行强制类型转换。

##### 18.undefined是个全局变量
javascript产生undefined值的地方：
```
1.变量未初始化
2.函数无返回值
3.return后不带任何值
4.没有提供实参的函数形参
5.不存在的对象属性
6.不存在数组元素
7.未初始化的数组
...
```
不能对undefined值读取和设置属性，会报错。
##### 19.!!将一个值方便快速转化为布尔值
```
console.log( !!window===true );
```
##### 20.&&和||的用法 
```
if (!a) {
    a = {};
 }
 //替换
 a = a || {}; 
```
如果有a这个变量的声明的话 那么它还是原来的对象  如果没有就给它创建一个对象

##### 21.代码优化
与其这样书写：if(string.length > 0){..}

不如这样书写：if(string.length){..}
##### 22.NaN不等于任何值，包括它自身
##### 23.利用script标签保存任意信息
```
<script type="text" id="angelaScript">
    <h1>这个标题1是不会显示出来的，可以用这种方式保存信息哦！</h1>
    </script>
<script type="text/javascript">
    console.log(document.getElementById('angelaScript').innerHTML); 
</script>
```
控制台打印
##### 24.switch语句不光可以使用数字、字符做条件表达式，还可以使用字符串！
##### 25.html中设置了id的元素居然是js的全局变量
```
<div id="angelaDiv">
</div>
<script type="text/javascript">
    console.log(angelaDiv);
</script>
```
##### 26.解析URL
```
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}
```
##### 27.加载CDN文件时，可以省掉HTTP标识
```
<script src="//domain.com/path/to/script.js"></script>
```
##### 28.生成随机字符串
```
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
}

或者

const str = Math.random().toString(36).substr(2, 10);
console.log(str);
```

<br/>
<br/>
<br/>
<br/>
<br/>



#### 函数和方法的区别

函数（function）是可以执行的javascript代码块，由javascript程序定义或javascript实现预定义。函数可以带有实际参数或者形式参数，用于指定这个函数执行计算要使用的一个或多个值，而且还可以返回值，以表示计算的结果。

方法（method）是通过对象调用的javascript函数。也就是说，方法也是函数，只是比较特殊的函数。
```
1、函数要手动传self，方法不用传

2、如果是一个函数，用类名去调用，如果是一个额方法，用对象去调用
```
简单来讲，“类里叫方法，类外叫函数”。

函数是这类事情是怎么干的，方法是某种人(某个对象)是如何干这类事情的。

方法和对象相关；函数和对象无关。

Java中只有方法，C中只有函数，而C++里取决于是否在类中。


#### 构造函数

在一些面向对象的语言，如Java、C++、PHP中，构造函数是很常见的。在Javascript中构造函数首先是一个普通的函数，它可以使用new 操作符来调用，并生成一个特殊类型的对象。

使用构造函数，意味着所有的这些对象，都可以使用相同的基本结构创建

使用构造函数，意味着对象被明确的标记为函数的实例

在实例化构造函数的时候一定不要忘了使用new关键字，是否使用new关键字，对this对象的影响很大，不用new关键字的情况下，this对象会指向全局对象（window in browser and global in node）。因此定义构造函数时，建议函数名称首字母大写。

#### 日期类别

*GMT-格林尼治标准时间*

*UTC- 协调世界时*

*中国标准时间*
```
new date() Thu Feb 28 2019 17:11:43 GMT+0800 (中国标准时间)

JS默认中国标准时间是 GMT时间.由于我们国家采用的是东八区时间,因此是GMT +0800

ISO8601标准时间格式(前端开发比较少见),例如
2019-02-28T09:51:45.540Z,其中T表示合并,Z表示UTC时间
```

*时间戳(UNIX时间戳)*
```
时间戳是指是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒。
```

#### 类数组对象

类数组对象，最基本的要求就是具有length属性的对象

将类数组对象转换为真正数组：
```
let arrayLike = {
    0: 'tom', 
    1: '65',
    2: '男',
    3: ['jane','john','Mary'],
    'length': 4
}
let arr = Array.from(arrayLike)
console.log(arr) // ['tom','65','男',['jane','john','Mary']]
```
```
let arrayLike = {
    'name': 'tom', 
    'age': '65',
    'sex': '男',
    'friends': ['jane','john','Mary'],
    length: 4
}
let arr = Array.from(arrayLike)
console.log(arr)  // [ undefined, undefined, undefined, undefined ]
```
由此可见，要将一个类数组对象转换为一个真正的数组，必须具备以下条件：

该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。

该类数组对象的属性名必须为数值型或字符串型的数字

ps: 该类数组对象的属性名可以加引号，也可以不加引号