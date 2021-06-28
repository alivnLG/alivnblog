---
title: web-9-面向对象
date: 2021-01-05 11:53:01
top: true
tags:
- OOP
categories:
- 前端综合
---
##### 面向对象编程 (OOP : Object Oriented Programming)。
它的概念就是将世间万物视为对象，并将其分类。
同一类的对象有相同的属性和行为。
<!--more-->
比如，一个人，它包括性别、年龄，颜值等属性。还可以有些行为，比如：微笑、说话、吃饭、写代码等。

###### 面向对象具有4个主要特性：
唯一 ：每个对象都有自身唯一的标识，通过这种标识，可找到相应的对象。在对象的整个生命期中，它的标识都不改变。

抽象：将具有一致的属性和行为的对象抽象成类。反映了与应用有关的重要性质，而忽略其他一些无关内容。

继承：继承子类自动共享父类数据结构和方法的机制，这是类之间的一种关系，继承性是面向对象思想最重要的一点。

多态：多态性是指相同的操作或函数、过程可作用于多种类型的对象上并获得不同的结果。

可维护性强
可复用性强
<br />


###### 在类中的定义都称之为成员。成员有两种：

成员属性：对应的就是事物的属性。

成员方法：对应的就是事物的行为。

必须先要对事物进行属性和行为的分析，才可以用代码来体现。

主方法的存在，仅为该类是否需要独立运行，如果不需要，主方法是不用定义的。

成员属性和局部变量的区别：

成员属性直接定义在类中。 局部变量定义在方法中，参数上，语句中。

成员属性在这个类中有效。

局部变量只在自己所属的大括号内有效，大括号结束，局部变量失去作用域。

成员属性存在于堆内存中，随着对象的产生而存在，消失而消失。

局部变量存在于栈内存中，随着所属区域的运行而存在，结束而释放。

##### 构造方法：
用于给对象进行初始化，是给与之对应的对象进行初始化，它具有针对性，方法中的一种。

特点：

1、该方法的名称和所在类的名称相同。

2、不需要定义返回值类型。

3、该方法没有具体的返回值。

所有对象创建时，都需要初始化才可以使用。

一个类在定义时，如果没有定义过构造方法，那么该类中会自动生成一个空参数的构造方法，为了方便该类创建对象，完成初始化。如果在类中自定义了构造方法，那么默认的构造方法就没有了。

一个类中，可以有多个构造方法，因为它们的方法名称都相同，所以只能通过参数列表来区分。所以，一个类中如果出现多个构造方法。它们的存在是以重载体现的。

封 装：是指隐藏对象的属性和实现细节，仅对外提供公共访问方式。

好处：将变化隔离；便于使用；提高重用性；安全性。

this:代表对象。就是所在方法所属对象的引用。哪个对象调用了this所在的方法，this就代表哪个对象，就是哪个对象的引用。

在定义功能时，如果该功能内部使用到了调用该功能的对象，这时就用this来表示这个对象。


##### JS编写面向对象
创建对象的最简单方式就是创建一个Object实例，然后为它添加属性和方法。
###### 普通模式
```
var person = new Object();
person.name = ‘Taylor Swift’;
person.job = ‘singer’;
person.sayName =function(){
    alert(this.name);
}
```
###### 工厂模式
```
var create = function(name, job){
    var o= new Object();
    o.name = name;
    o.job = job;
    o.sayName =function(){
        alert(this.name);
    }
    return o;
}
var person = create('Taylor Swift','singer');
```
###### 构造函数模式
```
var Person = function(name, job){
    this.name = name;
    this.job = job;
    this.sayName =function(){
        alert(this.name);
    }
}
var person1 = new Person('Taylor Swift','singer');
console.log(person1 instanceof Person);
```
利用构造模式的instanceof方法我们就可以做“亲自鉴定”了。但是注意看，实例化几个对象，就会有多少sayName()方法，但是sayName()方法都相同，没必要浪费内存啊。这样写可不可以？
```
var Person = function(name, job){
    this.name = name;
    this.job = job;
    this.sayName = sayName;
}
function sayName(){
    alert(this.name);
}
```
把sayName单独提取出来就可以了，但是看着功能构造器Person没什么关系，很松散。
这时候就要引入一个js中原型对象的概念。

用原型对象的方式写：
```
var Person = function(){};
    Person.prototype.name = 'Taylor Swift';
    Person.prototype.job = 'singer';
    Person.prototype.sayName = function(){
    alert(this.name);
};
```
![oop001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/oop001.jpg)

但是原型模式还不够完美，它省略了为构造函数传递初始化参数的环节，结果所有实例在默认情况下都获得相同的属性值。

另外，因为的共享机制这个优点，存在一个潜在的问题。

如果共享的对象是引用类型(比如Array)，实例之间可能会相互影响。比如下面的例子：
```
var Person = function(){};
    Person.prototype.name = 'Taylor Swift';
    Person.prototype.job = 'singer';
    Person.prototype.friends = ['Ivy', 'Cathy'];
    Person.prototype.sayName = function(){
        alert(this.name);
    };
    var person1 = new Person();
    var person2 = new Person();
    person2.friends.push('jordan');
    console.log(person1.friends,person2.friends);
```
改写
```
    var Person = function(){
        this.friends = ['Ivy', 'Cathy'];
        this.name = 'Taylor Swift';
        this.job = 'singer';
    };
    Person.prototype.sayName = function(){
        alert(this.name);
    };
```
ES6写法
```
class Person {
    constructor(name) {
        this.name = name;
        this.job = job;
    }
    sayName() {
        console.log(this.name);
    }
}
```
