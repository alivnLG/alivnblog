---
title: js-30-Cookie、Session、Token、JWT、单点登录
date: 2021-01-05 10:25:40
top: true
tags:
- cookie
- session
- token
- jwt
- 单点登录
categories:
- JavaScript
---
### 一、前言
<!--more-->
#### 1.1 无状态的HTTP协议

很久很久之前， Web基本都是文档的浏览而已。既然是浏览， 作为服务器， 不需要记录在某一段时间里都浏览了什么文档， 每次请求都是一个新的HTTP协议，就是请求加响应。不用记录谁刚刚发了HTTP请求， 每次请求都是全新的。

#### 1.2 如何管理会话

随着交互式Web应用的兴起， 像在线购物网站，需要登录的网站等，马上面临一个问题，就是要管理会话，记住那些人登录过系统，哪些人往自己的购物车中放商品，也就是说我必须把每个人区分开。

### 二、什么是认证（Authentication）

通俗地讲就是验证当前用户的身份，证明“你是你自己”（比如：你每天上下班打卡，都需要通过指纹打卡，当你的指纹和系统里录入的指纹相匹配时，就打卡成功）

互联网中的认证：

```
用户名密码登录

邮箱发送登录链接

手机号接收验证码

只要你能收到邮箱/验证码，就默认你是账号的主人
```

### 三、什么是授权（Authorization）

用户授予第三方应用访问该用户某些资源的权限

你在安装手机应用的时候，APP 会询问是否允许授予权限（访问相册、地理位置等权限）

你在访问微信小程序时，当登录时，小程序会询问是否允许授予权限（获取昵称、头像、地区、性别等个人信息）

实现授权的方式有：cookie、session、token、OAuth

### 四、什么是凭证（Credentials）

实现认证和授权的前提是需要一种媒介（证书） 来标记访问者的身份

在战国时期，商鞅变法，发明了照身帖。照身帖由官府发放，是一块打磨光滑细密的竹板，上面刻有持有人的头像和籍贯信息。国人必须持有，如若没有就被认为是黑户，或者间谍之类的。

在现实生活中，每个人都会有一张专属的居民身份证，是用于证明持有人身份的一种法定证件。通过身份证，我们可以办理手机卡/银行卡/个人贷款/交通出行等等，这就是认证的凭证。

在互联网应用中，一般网站（如掘金）会有两种模式，游客模式和登录模式。游客模式下，可以正常浏览网站上面的文章，一旦想要点赞/收藏/分享文章，就需要登录或者注册账号。当用户登录成功后，服务器会给该用户使用的浏览器颁发一个令牌（token），这个令牌用来表明你的身份，每次浏览器发送请求时会带上这个令牌，就可以使用游客模式下无法使用的功能。

### 五、什么是 Cookie

#### 5.1 定义

HTTP 是无状态的协议（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息）：每个请求都是完全独立的，服务端无法确认当前访问者的身份信息，无法分辨上一次的请求发送者和这一次的发送者是不是同一个人。所以服务器与浏览器为了进行会话跟踪（知道是谁在访问我），就必须主动的去维护一个状态，这个状态用于告知服务端前后两个请求是否来自同一浏览器。而这个状态需要通过 cookie 或者 session 去实现。

cookie 存储在客户端： cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。

cookie 是不可跨域的： 每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，一级域名和二级域名之间是允许共享使用的（靠的是 domain）。

cookie 重要的属性属性说明name=value键值对，设置 Cookie 的名称及相对应的值，都必须是字符串类型

```
如果值为 Unicode 字符，需要为字符编码。

如果值为二进制数据，则需要使用 BASE64 编码。

domain指定 cookie 所属域名，默认是当前域名path****指定 cookie 在哪个路径（路由）下生效，默认是 '/'。
如果设置为 /abc，则只有 /abc 下的路由可以访问到该 cookie，如：/abc/read。
maxAgecookie 失效的时间，单位秒。

如果为整数，则该 cookie 在 maxAge 秒后失效。
如果为负数，该 cookie 为临时 cookie ，关闭浏览器即失效，浏览器也不会以任何形式保存该 cookie 。
如果为 0，表示删除该 cookie 。默认为 -1。
比 expires 好用。

expires过期时间，在设置的某个时间点后该 cookie 就会失效。

一般浏览器的 cookie 都是默认储存的，当关闭浏览器结束这个会话的时候，
这个 cookie 也就会被删除。

secure该 cookie 是否仅被使用安全协议传输。

安全协议有 HTTPS，SSL等，在网络上传输数据之前先将数据加密。
默认为false。当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效。

httpOnly****如果给某个 cookie 设置了 httpOnly 属性，则无法通过 JS 脚本 读取到该 cookie 的信息，
但还是能通过浏览器的 Application 中手动修改 cookie，
所以只是在一定程度上可以防止 XSS 攻击，不是绝对的安全
```
#### 5.2 如何设置cookie

##### 客户端设置

```js
document.cookie = "name=xiaoming; age=12 "
```

客户端可以设置cookie的一下选项: 
expires, domain, path, secure(只有在https协议的网页中, 客户端设置secure类型cookie才能生效), 但无法设置httpOnly选项;

<span style="color:red">设置cookie => cookie被自动添加到request header中 => 服务端接收到cookie</span>


##### 服务端设置

不管你是请求一个资源文件(如html/js/css/图片), 还是发送一个ajax请求, 服务端都会返回response.而response header中有一项叫set-cookie, 是服务端专门用来设置cookie的;

- 一个set-cookie只能设置一个cookie, 当你想设置多个, 需要添加同样多的set-cookie

- 服务端可以设置cookie的所有选项: expires, domain, path, secure, HttpOnly


<span style="color:red">不设置max-age和expires，此cookie就是会话级别的，浏览器关闭就没了</span>

#### 5.3 同域/跨域 ajax请求到底会不会带上cookie?

这个问题与你发起ajax请求的方式有关

fetch在默认情况下, 不管是同域还是跨域ajax请求都不会带上cookie, 只有当设置了 credentials 时才会带上该ajax请求所在域的cookie, 服务端需要设置响应头 Access-Control-Allow-Credentials: true, 否则浏览器会因为安全限制而报错, 拿不到响应。

axios和jQuery在同域ajax请求时会带上cookie, 跨域请求不会, 跨域请求需要设置 withCredentials 和服务端响应头

XMLHttpRequest.withCredentials  跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等) 也可以简单的理解为，当前请求为跨域类型时是否在请求中协带cookie。

### 六、什么是 Session

#### 6.1 定义

session从字面上讲，就是会话。这个就类似你和一个人交谈，你怎么知道当时和你交谈的是张三而不是李四呢？对方肯定有某种特征（长相等）表明他是张三；

session也是类似的道理，服务器要知道当前请求发给自己的是谁。为了做这种区分，服务器就是要给每个客户端分配不同的"身份标识"，然后客户端每次向服务器发请求的时候，都带上这个”身份标识“，服务器就知道这个请求来自与谁了。

至于客户端怎么保存这个”身份标识“，可以有很多方式，对于浏览器客户端，大家都采用cookie的方式。

session 是另一种记录服务器和客户端会话状态的机制

session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的cookie 中

![session001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/session001.jpg)

#### 6.2 session 认证流程

```
用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session
请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器

浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中，
同时 Cookie 记录此 SessionID 属于哪个域名

当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，
如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，
再根据 SessionID 查找对应的 Session 信息，
如果没有找到说明用户没有登录或者登录失效，
如果找到 Session 证明用户已经登录可执行后面操作。
```

根据以上流程可知，SessionID 是连接 Cookie 和 Session 的一道桥梁，
大部分系统也是根据此原理来验证用户登录状态。

### 七、什么是 Token（令牌）

#### 7.1 Acesss Token

访问资源接口（API）时所需要的资源凭证

#### 7.2 简单 token 的组成

uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）

#### 7.3 特点

```
服务端无状态化、可扩展性好

支持移动端设备

安全

支持跨程序调用
```

#### 7.4 token 的身份验证流程

![token001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/token001.jpg)

```
1.客户端使用用户名跟密码请求登录

2.服务端收到请求，去验证用户名与密码

3.验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端

4.客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里

5.客户端每次向服务端请求资源的时候需要带着服务端签发的 token

6.服务端收到请求，然后去验证客户端请求里面带着的 token ，
如果验证成功，就向客户端返回请求的数据
```

#### 7.5 注意

每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里

基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存放 token 数据。用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库

token 完全由应用管理，所以它可以避开同源策略

#### 7.6 Refresh Token

refresh token 是专用于刷新 access token 的 token。如果没有 refresh token，也可以刷新 access token，但每次刷新都要用户输入登录用户名与密码，会很麻烦。有了 refresh token，可以减少这个麻烦，客户端直接用 refresh token 去更新 access token，无需用户进行额外的操作。

![token002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/token002.jpg)

Access Token 的有效期比较短，当 Acesss Token 由于过期而失效时，使用 Refresh Token 就可以获取到新的 Token，如果 Refresh Token 也失效了，用户就只能重新登录了。

Refresh Token 及过期时间是存储在服务器的数据库中，只有在申请新的 Acesss Token 时才会验证，不会对业务接口响应时间造成影响，也不需要向 Session 一样一直保持在内存中以应对大量的请求。


### 八、什么是 JWT

#### 8.1 定义
```
JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案。

是一种认证授权机制。

JWT 是为了在网络应用环境间传递声明而执行的一种基于 JSON 的开放标准（RFC 7519）。

JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，
以便于从资源服务器获取资源。比如用在用户登录上。

可以使用 HMAC 算法或者是 RSA 的公/私秘钥对 JWT 进行签名。
因为数字签名的存在，这些传递的信息是可信的。

```

#### 8.2 生成 JWT

jwt.io/www.jsonwebtoken.io/

#### 8.23JWT 的原理

![jwt001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/jwt001.jpg)

#### 8.4 JWT 认证流程

```
用户输入用户名/密码登录，服务端认证成功后，会返回给客户端一个 JWT

客户端将 token 保存到本地（通常使用 localstorage，也可以使用 cookie）

当用户希望访问一个受保护的路由或者资源的时候，
需要请求头的 Authorization 字段中使用Bearer 模式添加 JWT，
其内容看起来是下面这样
Authorization: Bearer复制代码

服务端的保护路由将会检查请求头 Authorization 中的 JWT 信息，
如果合法，则允许用户的行为

因为 JWT 是自包含的（内部包含了一些会话信息），因此减少了需要查询数据库的需要

因为 JWT 并不使用 Cookie 的，
所以你可以使用任何域名提供你的 API 服务而不需要担心跨域资源共享问题（CORS）

因为用户的状态不再存储在服务端的内存中，所以这是一种无状态的认证机制
```

#### 8.5 JWT 的使用方式

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

##### 方式一

当用户希望访问一个受保护的路由或者资源的时候，可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求头信息的 Authorization 字段里，使用 Bearer 模式添加 JWT。

```
    GET /calendar/v1/events
    Host: api.example.com
    Authorization: Bearer <token>
```

用户的状态不会存储在服务端的内存中，这是一种 无状态的认证机制

服务端的保护路由将会检查请求头 Authorization 中的 JWT 信息，如果合法，则允许用户的行为。

由于 JWT 是自包含的，因此减少了需要查询数据库的需要

JWT 的这些特性使得我们可以完全依赖其无状态的特性提供数据 API 服务，甚至是创建一个下载流服务。

因为 JWT 并不使用 Cookie ，所以你可以使用任何域名提供你的 API 服务而不需要担心跨域资源共享问题（CORS）

##### 方式二

跨域的时候，可以把 JWT 放在 POST 请求的数据体里。

##### 方式三

通过 URL 传输

```
http://www.example.com/user?token=xxx
```

#### 8.6 项目中使用 JWT

项目地址: https://github.com/yjdjiayou/jwt-demo

### 九、Cookie 和 Session 的区别

#### 9.1 安全性

Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的。

#### 9.2 存取值的类型不同

Cookie 只支持存字符串数据，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存任意数据类型。

#### 9.3 有效期不同

Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效。

#### 9.4 存储大小不同
单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源。

### 十、Token 和 Session 的区别

```
Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。
而 Token 是令牌，访问资源接口（API）时所需要的资源凭证。
Token 使服务端无状态化，不会存储会话信息。

Session 和 Token 并不矛盾，作为身份认证 Token 安全性比 Session 好，
因为每一个请求都有签名还能防止监听以及重放攻击，
而 Session 就必须依赖链路层来保障通讯安全了。

如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。

所谓 Session 认证只是简单的把 User 信息存储到 Session 里，
因为 SessionID 的不可预测性，暂且认为是安全的。而 Token ，
如果指的是 OAuth Token 或类似的机制的话，
提供的是 认证 和 授权 ，认证是针对用户，授权是针对 App 。
其目的是让某 App 有权利访问某用户的信息。

这里的 Token 是唯一的。
不可以转移到其它 App上，也不可以转到其它用户上。

Session 只提供一种简单的认证，即只要有此 SessionID ，
即认为有此 User 的全部权利。是需要严格保密的，
这个数据应该只保存在站方，不应该共享给其它网站或者第三方 App。

所以简单来说：如果你的用户数据可能需要和第三方共享，
或者允许第三方调用 API 接口，用 Token 。
如果永远只是自己的网站，自己的 App，用什么就无所谓了。
```

### 十一、Token 和 JWT 的区别

#### 11.1 相同

```
都是访问资源的令牌

都可以记录用户的信息

都是使服务端无状态化

都是只有验证成功后，客户端才能访问服务端上受保护的资源
```

#### 11.2 区别

```
Token：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，
然后验证 Token 是否有效。

JWT：将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行
校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，
因为 JWT 自包含了用户信息和加密的数据。
```

### 十二、常见的前后端鉴权方式

Session-Cookie

Token 验证（包括 JWT，SSO）

OAuth2.0（开放授权）

### 十三、常见的加密算法

![encryption001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/encryption001.jpg)

#### 13.1 哈希算法(Hash Algorithm)

哈希算法(Hash Algorithm)又称散列算法、散列函数、哈希函数，是一种从任何一种数据中创建小的数字“指纹”的方法。哈希算法将数据重新打乱混合，重新创建一个哈希值。

哈希算法主要用来保障数据真实性(即完整性)，即发信人将原始消息和哈希值一起发送，收信人通过相同的哈希函数来校验原始数据是否真实。

##### 哈希算法通常特点

正像快速：原始数据可以快速计算出哈希值

逆向困难：通过哈希值基本不可能推导出原始数据

输入敏感：原始数据只要有一点变动，得到的哈希值差别很大

冲突避免：很难找到不同的原始数据得到相同的哈希值，宇宙中原子数大约在 10 的 60 次方到 80 次方之间，所以 2 的 256 次方有足够的空间容纳所有的可能，算法好的情况下冲突碰撞的概率很低：
```
2 的 128 次方为 340282366920938463463374607431768211456，也就是 10 的 39 次方级别

2 的 160 次方为 1.4615016373309029182036848327163e+48，也就是 10 的 48 次方级别

2 的 256 次方为 1.1579208923731619542357098500869 × 10 的 77 次方，也就是 10 的 77 次方
```

##### 注意点

以上不能保证数据被恶意篡改，原始数据和哈希值都可能被恶意篡改，要保证不被篡改，可以使用RSA 公钥私钥方案，再配合哈希值。

哈希算法主要用来防止计算机传输过程中的错误，早期计算机通过前 7 位数据第 8 位奇偶校验码来保障（12.5% 的浪费效率低），对于一段数据或文件，通过哈希算法生成 128bit 或者 256bit 的哈希值，如果校验有问题就要求重传。

### 十四、常见问题

#### 14.1 使用 cookie 时需要考虑的问题

```
因为存储在客户端，容易被客户端篡改，使用前需要验证合法性

不要存储敏感数据，比如用户密码，账户余额

使用 httpOnly 在一定程度上提高安全性

尽量减少 cookie 的体积，能存储的数据量不能超过 4kb

设置正确的 domain 和 path，减少数据传输

cookie 无法跨域

一个浏览器针对一个网站最多存 20 个Cookie，浏览器一般只允许存放 300 个Cookie

移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token
```

#### 14.2 使用 session 时需要考虑的问题

```
将 session 存储在服务器里面，当用户同时在线量比较多时，
这些 session 会占据较多的内存，需要在服务端定期的去清理过期的 session

当网站采用集群部署的时候，会遇到多台 web 服务器之间如何做 session 共享的问题。
因为 session 是由单个服务器创建的，
但是处理用户请求的服务器不一定是那个创建 session 的服务器，
那么该服务器就无法拿到之前已经放入到 session 中的登录凭证之类的信息了。

当多个应用要共享 session 时，除了以上问题，还会遇到跨域问题，
因为不同的应用可能部署的主机不一样，需要在各个应用做好 cookie 跨域的处理。

sessionId 是存储在 cookie 中的，
假如浏览器禁止 cookie 或不支持 cookie 怎么办？ 
一般会把 sessionId 跟在 url 参数后面即重写 url，
所以 session 不一定非得需要靠 cookie 实现

移动端对 cookie 的支持不是很好，
而 session 需要基于 cookie 实现，所以移动端常用的是 token
```

#### 14.3 使用 token 时需要考虑的问题

```
如果你认为用数据库来存储 token 会导致查询时间太长，可以选择放在内存当中。
比如 redis 很适合你对 token 查询的需求。

token 完全由应用管理，所以它可以避开同源策略

token 可以避免 CSRF 攻击(因为不需要 cookie 了)

移动端对 cookie 的支持不是很好，
而 session 需要基于 cookie 实现，所以移动端常用的是 token
```

#### 14.4 使用 JWT 时需要考虑的问题

```
因为 JWT 并不依赖 Cookie 的，
所以你可以使用任何域名提供你的 API 服务而不需要担心跨域资源共享问题（CORS）

JWT 默认是不加密，但也是可以加密的。
生成原始 Token 以后，可以用密钥再加密一次。

JWT 不加密的情况下，不能将秘密数据写入 JWT。

JWT 不仅可以用于认证，也可以用于交换信息。
有效使用 JWT，可以降低服务器查询数据库的次数。

JWT 最大的优势是服务器不再需要存储 Session，
使得服务器认证鉴权业务可以方便扩展。但这也是 JWT 最大的缺点：
由于服务器不需要存储 Session 状态，
因此使用过程中无法废弃某个 Token 或者更改 Token 的权限。
也就是说一旦 JWT 签发了，到期之前就会始终有效，除非服务器部署额外的逻辑。

JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。
为了减少盗用，JWT的有效期应该设置得比较短。
对于一些比较重要的权限，使用时应该再次对用户进行认证。

JWT 适合一次性的命令认证，颁发一个有效期极短的 JWT，即使暴露了危险也很小，
由于每次操作都会生成新的 JWT，因此也没必要保存 JWT，真正实现无状态。

为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。
```

#### 14.5 使用加密算法时需要考虑的问题

```
绝不要以明文存储密码

永远使用 哈希算法 来处理密码，绝不要使用 Base64 或其他编码方式来存储密码，
这和以明文存储密码是一样的，使用哈希，而不要使用编码。
编码以及加密，都是双向的过程，而密码是保密的，
应该只被它的所有者知道， 这个过程必须是单向的。
哈希正是用于做这个的，从来没有解哈希这种说法， 但是编码就存在解码，加密就存在解密。

绝不要使用弱哈希或已被破解的哈希算法，
像 MD5 或 SHA1 ，只使用强密码哈希算法。

绝不要以明文形式显示或发送密码，即使是对密码的所有者也应该这样。
如果你需要 “忘记密码” 的功能，可以随机生成一个新的 一次性的（这点很重要）密码，
然后把这个密码发送给用户。
```

### 十五、分布式架构下 session 共享方案

#### 15.1 session 复制

任何一个服务器上的 session 发生改变（增删改），该节点会把这个 session 的所有内容序列化，然后广播给所有其它节点，不管其他服务器需不需要 session ，以此来保证 session 同步

优点： 可容错，各个服务器间 session 能够实时响应。

缺点： 会对网络负荷造成一定压力，如果 session 量大的话可能会造成网络堵塞，拖慢服务器性能。

#### 15.2 粘性 session /IP 绑定策略

采用 Ngnix 中的 ip_hash 机制，将某个 ip的所有请求都定向到同一台服务器上，即将用户与服务器绑定。 用户第一次请求时，负载均衡器将用户的请求转发到了 A 服务器上，如果负载均衡器设置了粘性 session 的话，那么用户以后的每次请求都会转发到 A 服务器上，相当于把用户和 A 服务器粘到了一块，这就是粘性 session 机制。

优点： 简单，不需要对 session 做任何处理。

缺点： 缺乏容错性，如果当前访问的服务器发生故障，用户被转移到第二个服务器上时，他的 session 信息都将失效。

适用场景： 发生故障对客户产生的影响较小；服务器发生故障是低概率事件。实现方式： 以 Nginx 为例，在 upstream 模块配置 ip_hash 属性即可实现粘性 session。

#### 15.3 session 共享（常用）

```
使用分布式缓存方案比如 Memcached 、Redis 来缓存 session，
但是要求 Memcached 或 Redis 必须是集群

把 session 放到 Redis 中存储，虽然架构上变得复杂，并且需要多访问一次 Redis ，
但是这种方案带来的好处也是很大的：

实现了 session 共享；

可以水平扩展（增加 Redis 服务器）；

服务器重启 session 不丢失（不过也要注意 session 在 Redis 中的刷新/失效机制）；

不仅可以跨服务器 session 共享，甚至可以跨平台（例如网页端和 APP 端）
```

![session002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/session002.jpg)

#### 15.4 session 持久化

将 session 存储到数据库中，保证 session 的持久化

优点： 服务器出现问题，session 不会丢失

缺点： 如果网站的访问量很大，把 session 存储到数据库中，会对数据库造成很大压力，还需要增加额外的开销维护数据库。

##### 只要关闭浏览器 ，session 真的就消失了？

不对。对 session 来说，除非程序通知服务器删除一个 session，否则服务器会一直保留，程序一般都是在用户做 log off 的时候发个指令去删除 session。然而浏览器从来不会主动在关闭之前通知服务器它将要关闭，因此服务器根本不会有机会知道浏览器已经关闭，之所以会有这种错觉，是大部分 session 机制都使用会话 cookie 来保存 session id，而关闭浏览器后这个 session id 就消失了，再次连接服务器时也就无法找到原来的 session。如果服务器设置的 cookie 被保存在硬盘上，或者使用某种手段改写浏览器发出的 HTTP 请求头，把原来的 session id 发送给服务器，则再次打开浏览器仍然能够打开原来的 session。恰恰是由于关闭浏览器不会导致 session 被删除，迫使服务器为 session 设置了一个失效时间，当距离客户端上一次使用 session 的时间超过这个失效时间时，服务器就认为客户端已经停止了活动，才会把 session 删除以节省存储空间。


##### 在项目中使用 JWT:https://github.com/yjdjiayou/jwt-demo

### 十六、单点登录

#### 16.1 概要

1.同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互，要求协议，端口和主机都相同。

2.HTTP用于分布式、协作式和超媒体信息系统的应用层协议。HTTP 是无状态协议，所以服务器单从网络连接上无从知道客户身份。
那要如何才能识别客户端呢？给每个客户端颁发一个通行证，每次访问时都要求带上通行证，这样服务器就可以根据通行证识别客户了。最常见的方案就是 Cookie。

3.Cookie是客户端保存用户信息的一种机制，保存在客户机硬盘上。可以由服务器响应报文Set-Cookie的首部字段信息或者客户端 document.cookie来设置，并随着每次请求发送到服务器。子域名可以获取父级域名 Cookie。

4.Session其实是一个抽象概念，用于跟踪会话，识别多次 HTTP 请求来自同一个客户端。Cookie 只是通用性较好的一种实现方案，通常是设置一个名为 SessionID（名称可自定义，便于描述，本文均使用此名称）的 Cookie，每次请求时携带该 Cookie，后台服务即可依赖此 SessionID 值识别客户端。

#### 16.2 单系统登录

在介绍单点登录之前，我们先来了解一下在浏览器中，访问一个需要登录的应用时主要发生的一系列流程，如下图所示：

![singleLogin001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin001.jpg)

以下为连环画形式，期望能让读者更好的理解：

![singleLogin002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin002.jpg)

![singleLogin003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin003.jpg)

![singleLogin004](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin004.jpg)

![singleLogin005](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin005.jpg)

![singleLogin006](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin006.jpg)

![singleLogin007](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin007.jpg)

依赖于登录后设置的 Cookie，之后每次访问时都会携带该 Cookie，从而让后台服务能识别当前登录用户。

后台是如何通过 SessionID 知道是哪个用户呢？

- 数据库存储关联：将 SessionID 与数据信息关联，存储在 Redis、mysql 等数据库中；
- 数据加密直接存储：比如 JWT 方式，用户数据直接从 SessionID 值解密出来（此方式时 Cookie 名称以 Token 居多）。

#### 16.3 多系统登录

##### 16.3.1 同域名

当访问同域名下的页面时，Cookie 和单系统登录时一样，会正常携带，后台服务即可直接获取到对应的 SessionID 值，后台为单服务还是多服务无差别。

##### 16.3.2 不同子域名

子域名间 Cookie 是不共享的，但各子域名均可获取到父级域名的 Cookie，即app.demo.com与news.demo.com均可以获取 demo.com域名下的 Cookie。所以可以通过将 Cookie 设置在父级域名上，可以达到子域名共享的效果，即当用户在 app.demo.com 域名下登录时，在demo.com域名下设置名为 SessionID 的 Cookie，当用户之后访问news.demo.com时，后台服务也可以获取到该 SessionID，从而识别用户。

##### 16.3.3 完全不同域名

默认情况下，不同域名是无法直接共享 Cookie 的。

##### 16.3.4 前端跨域带 Cookie

如果只是期望异步请求时获取当前用户的登录态，可以通过发送跨域请求到已经登录过的域名，并配置属性：

```
xhrFields: {
  withCredentials: true
}
```

这样可在请求时携带目标域名的 Cookie，目标域名的服务即可识别当前用户。

但是，这要求目标域名的接口支持 CORS 访问（出于安全考虑，CORS 开启 withCredentials 时，浏览器不支持使用通配符*，需明确设置可跨域访问的域名名单）。

如果只是为了规避浏览器的限制，实现与通配*同样的效果，到达所有域名都可以访问的目的，可根据访问的 Referrer 解析请求来源域名，作为可访问名单。但是出于安全考虑，不推荐使用，请设置明确的可访问域名。

##### 16.3.5 CAS

CAS（Central Authentication Service），即中央认证服务，是 Yale 大学发起的一个开源项目，旨在为 Web 应用系统提供一种可靠的单点登录方法。

既然不能跨域获取，那 CAS 如何做到共享呢？它通过跳转中间域名的方式来实现登录。

页面访问流程如下图：

![singleLogin008](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin008.jpg)

以下为连环画形式，期望能让读者更好的理解：

![singleLogin009](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin009.jpg)

![singleLogin010](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin010.jpg)

![singleLogin011](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin011.jpg)

![singleLogin012](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin012.jpg)

![singleLogin013](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin013.jpg)

![singleLogin014](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin014.jpg)

![singleLogin015](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin015.jpg)

![singleLogin016](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin016.jpg)

![singleLogin017](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin017.jpg)

![singleLogin018](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin018.jpg)

![singleLogin019](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin019.jpg)

![singleLogin020](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin020.jpg)

![singleLogin021](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin021.jpg)

![singleLogin022](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin022.jpg)

![singleLogin023](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin023.jpg)

![singleLogin024](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin024.jpg)

![singleLogin025](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin025.jpg)

![singleLogin026](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin026.jpg)

![singleLogin027](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/singleLogin027.jpg)



