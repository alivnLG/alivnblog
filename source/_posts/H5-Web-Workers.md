---
title: H5 Web Workers
date: 2020-06-02 15:34:47
tags:
- worker
categories:
- HTML
---
### H5 web worker 
#### 1.定义
web worker 是运行在后台的 JavaScript，不会影响页面的性能。
<!--more-->
当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。

web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

#### 2.检测浏览器是否支持 Web Worker
```
if(typeof(Worker)!=="undefined")
{
    // 是的! Web worker 支持!
    // 一些代码.....
}
else
{
    //抱歉! Web Worker 不支持
}
```

#### 3.创建 web worker 文件
创建一个计数脚本 "demo_workers.js"：
```
var i=0;

function timedCount()
{
    i=i+1;
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();
```
以上代码中重要的部分是 postMessage() 方法 - 它用于向 HTML 页面传回一段消息。

注意: web worker 通常不用于如此简单的脚本，而是用于更耗费 CPU 资源的任务。

#### 4.创建 Web Worker 对象
```
if(typeof(w)=="undefined")
{
    w=new Worker("demo_workers.js");
}
```
```
w.onmessage=function(event){
    document.getElementById("result").innerHTML=event.data;
};
```
#### 5.终止 Web Worker
```
w.terminate();
```

#### 6.完整示例
```
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
</head>
<body>

<p>计数： <output id="result"></output></p>
<button onclick="startWorker()">开始工作</button> 
<button onclick="stopWorker()">停止工作</button>

<p><strong>注意：</strong> Internet Explorer 9 及更早 IE 版本浏览器不支持 Web Workers.</p>

<script>
var w;

function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
        };
    } else {
        document.getElementById("result").innerHTML = "抱歉，你的浏览器不支持 Web Workers...";
    }
}

function stopWorker() 
{ 
    w.terminate();
    w = undefined;
}
</script>

</body>
</html>
```