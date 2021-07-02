---
title: web-11-base64原理解析
date: 2021-01-05 11:53:03
top: true
tags:
- base64
categories:
- 前端综合
---
### 一、Base64编码由来

为什么会有Base64编码呢？
<!--more-->
因为有些网络传送渠道并不支持所有的字节，例如传统的邮件只支持可见字符的传送，像ASCII码的控制字符就 不能通过邮件传送。这样用途就受到了很大的限制，比如图片二进制流的每个字节不可能全部是可见字符，所以就传送不了。

最好的方法就是在不改变传统协议的情 况下，做一种扩展方案来支持二进制文件的传送。把不可打印的字符也能用可打印字符来表示，问题就解决了。Base64编码应运而生，Base64就是一种 基于64个可打印字符来表示二进制数据的表示方法。

### 二、Base64的索引表

看一下Base64的索引表，字符选用了"A-Z、a-z、0-9、+、/" 64个可打印字符。数值代表字符的索引，这个是标准Base64协议规定的，不能更改。

![base64001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/base64001.jpg)

### 三、Base64的原理

Base64的码表只有64个字符， 如果要表达64个字符的话，使用6个bit即可完全表示(2的6次方为64)。

因为Base64的编码只有6个bit即可表示，而正常的字符是使用8个bit表示， 8和6的最小公倍数是24，所以4个Base64字符可以表示3个标准的ascll字符；

如果是字符串转换为Base64码， 会先把对应的字符串转换为ascll码表对应的数字， 然后再把数字转换为2进制， 比如a的ascll码味97， 97的二进制是：01100001， 把8个二进制提取成6个，剩下的2个二进制和后面的二进制继续拼接， 最后再把6个二进制码转换为Base64对于的编码， 以下为具体的解析过程案例：

假设我们要对 Hello! 进行Base64编码，按照ASCII表，其转换过程如下图所示：

![base64002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/base64002.jpg)

可知 Hello! 的Base64编码结果为 SGVsbG8h ，原始字符串长度为6个字符，编码后长度为8个字符，每3个原始字符经Base64编码成4个字符，编码前后长度比4/3，这个长度比很重要 - 比原始字符串长度短，则需要使用更大的编码字符集，这并不我们想要的；长度比越大，则需要传输越多的字符，传输时间越长。Base64应用广泛的原因是在字符集大小与长度比之间取得一个较好的平衡，适用于各种场景。

是不是觉得Base64编码原理很简单？

但这里需要注意一个点：Base64编码是每3个原始字符编码成4个字符，如果原始字符串长度不能被3整除，那怎么办？使用0值来补充原始字符串。

以 Hello!! 为例，其转换过程为：

![base64003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/base64003.jpg)

注：图表中蓝色背景的二进制0值是额外补充的。

Hello!! Base64编码的结果为 SGVsbG8hIQAA 。最后2个零值只是为了Base64编码而补充的，在原始字符中并没有对应的字符，那么Base64编码结果中的最后两个字符 AA 实际不带有效信息，所以需要特殊处理，以免解码错误。

标准Base64编码通常用 = 字符来替换最后的 A，即编码结果为 SGVsbG8hIQ==。因为 = 字符并不在Base64编码索引表中，其意义在于结束符号，在Base64解码时遇到 = 时即可知道一个Base64编码字符串结束。

如果Base64编码字符串不会相互拼接再传输，那么最后的 = 也可以省略，解码时如果发现Base64编码字符串长度不能被4整除，则先补充 = 字符，再解码即可。

解码是对编码的逆向操作，但注意一点：对于最后的两个 = 字符，转换成两个 A 字符，再转成对应的两个6比特二进制0值，接着转成原始字符之前，需要将最后的两个6比特二进制0值丢弃，因为它们实际上不携带有效信息。

目前Data URI 支持很多中类型：

```
目前，Data URI scheme支持的类型有：
　　data:,文本数据
　　data:text/plain,文本数据
　　data:text/html,HTML代码
　　data:text/html;base64,base64编码的HTML代码
　　data:text/css,CSS代码
　　data:text/css;base64,base64编码的CSS代码
　　data:text/javascript,Javascript代码
　　data:text/javascript;base64,base64编码的Javascript代码
　　data:image/gif;base64,base64编码的gif图片数据
　　data:image/png;base64,base64编码的png图片数据
　　data:image/jpeg;base64,base64编码的jpeg图片数据
　　data:image/x-icon;base64,base64编码的icon图片数据
```

base64简单地说，它把一些 8-bit 数据翻译成标准 ASCII 字符，目前，IE8、Firfox、Chrome、Opera浏览器都支持这种小文件嵌入。

