---
title: Dart语言
date: 2020-06-01 11:01:33
tags:
- APP
- flutter
- dart
categories:
- 编程语言
---
#### 1.入口方法main(){}
所有方法必须放在入口方法main(){}里面；
<!--more-->
```
main(){
    print('hello dart!');
}
```
或者
```
//没有返回值的main方法
void main(){
    print('hello dart!')
}
```
#### 2.注释
//注释内容

/\*注释内容\*/

///注释内容
#### 3.变量
可以不预先定义变量类型，会自动推断类型，类似js
```
var alivn = 'hello dart!';

String alivn = 'hello dart!'
```
不能改变变量类型，类型较验报错，可以被同类型值覆盖

变量大小写敏感
#### 4.常量
常量不可以修改  

final
```
final PI = 3.1415926;
final TIME = new DateTimw.now();
```
const
```
const PI = 3.1415926;
//报错
const TIME = new DateTimw.now();
```
final是在运行时第一次使用时进行初始化；
#### 5.数据类型
##### 字符串类型 String
```
//单行
var alivn001 = 'hello alivn001!'

var alivn002 = "hello alivn002!"

//多行
var alivn003 = '''
hello alivn003!
hello alivn003!
'''

var alivn004 = """
hello alivn004!
hello alivn004!
"""
```
字符串拼接
```
var alivn001 = 'hello';

var alivn002 = 'alivn002'

print('$alivn001 $alivn002')

print('alivn001 + alivn002')
```
##### 数字类型 

int 整型
```
var alivn = 1234;
```
double 浮点，既可以是整型，也可以是浮点类型
```
var alivn001 = 1234;

var alivn002 = 1234.1234
```
##### 布尔类型
```
bool alivn001 = true;

bool alivn002 = false
```
条件判断
```
var alivn = true;
if(alivn){
    print('true');
}
else{
    print('false');
}
```
##### List 数组/集合
```
//第一种
var alivnL001 = ['alivn001','alivn002','alivn003'];

//第二种
var alivnL002 = new List();
alivnL002.add('alivn001');
alivnL002.add('alivn002');

//第三种，指定类型
var alivnL003 = new List<String>();
alivnL002.add('alivn001');
alivnL002.add('alivn002');

//报错
alivnL002.add(123)

```
##### Maps类型,类似js对象
```
//第一种
var alivn = {
    "name" : "alivn",
    "age" : 27
};
print(alivn['name']);
print(alivn['age']);

//第二种
var alivn = new Map();
alivn['name'] = 'alivn';
alivn['age'] = 27
```
#### 6.类型判断
使用 is 关键字
```
var alivn = 'alivn001';
if(alivn is String){
    print('String')
}
```
#### 7.运算符
大部分和js相同，这里列出不同的

取整 
```
var a = 123;
var b = 23;
print(a~/b)
```
??
```
//如果b为空，则把后面的值赋给b
var b = 123;
b ??= 234;
```
#### 8.类型转换
toString() 转化成字符串类型

parse() 转化为int类型

数据源不清楚，可能报错；使用try{} catch(err){}异常处理

isEmpty 判断是否为空

isNaN 判断是否是NaN
#### 9.循环语句
for循环
```
for(int i=1;i<=10;i++){
    print(i);
}
```
while(){}  避免死循环

do()while{}

break跳出当前循环

continue跳出循环继续下面的循环
#### 9.List、Set、Map详解
##### List常用属性
length 长度

isEmpty 是否为空

isNotEmpty 是否不为空

reserved 翻转List

##### toList 转化为List
##### List常用方法
```
var alivn = ['alivn001','alivn002','alivn003']
//增加一条数据
add('alivn004');

//增加多条数据，拼接List
addAll(['alivn005','alivn006']);

//查找数据，查找不到返回-1；查到返回索引值
indexOf('alivn001'); 

//删除数据
remove('alivn001');
//删除指定索引
removeAt(1);

//修改数据,修改索引1-2之间的数据
alivn.fillRange(1,2,'alivn007');

//插入一条数据,插入到索引位置之前
alivn.insert(1,'alivn008');
//插入多条条数据,插入到索引位置之前
alivn.insertAll(1,['alivn008','alivn009']);

//转化为字符串,以逗号分割
alivn.join(',');

//字符串转化为List
var alivn ='hello-dart';
alivn.split('-')
 ```
##### Set去重，不能添加相同数据
```
var alivn = ['alivn001','alivn002','alivn001','alivn003'];
var alivnSet = new Set();
alivnSet.addAll(alivn);
//打印去重后的数据
print(alivnSet);
```
##### Map映射
```
var alivn={
    "name":"alivn",
    "":27
};
//获取所有的key和value
print(alivn.keys);
print(alivn.values);

//判断是否为空或不为空
print(alivn.isEmpty);
pprint(alivn.isNotEmpty);

//增加map数据
alivn.addAll({
"sex":"male"
);

//删除某个key数据
alivn.remove('sex');

//判断是否包含某个值
alivn.containsValue('alivn');
```

##### 共有方法
```
var alivn = [1,2,3,4]
//forEach循环遍历
alivn.forEach((value){
    print(value);
})

//map循环遍历
alivn.map((value){
    print(value);
})

//where循环遍历满足条件
alivn.map((value){
    return value>2;
})

//any循环一个及以上满足条件返回true
alivn.any((value){
    return value>2;
})

//every循环全部满足条件返回true
alivn.every((value){
    return value>2;
})
```
#### 10.函数，变量，作用域
##### 内置方法
##### 自定义方法
可以放在main方法内部，也可以放在外部
```
//没有返回值的方法
void myFunction(){
    
}

//返回值为特定类型的方法
int myFunction(){
    var myNum = 123;
    return myNum;
}

//带指定类型参数的方法
String muInfo(String name,int age){
    return name+' '+age
}

//可选参数,可以设置默认值
String muInfo(String name,int age,[String sex ='male']){
    return name+' '+age
}

//带命名的参数方法
String muInfo(String name,{int age,String sex ='male'}){
    return name+' '+age
}
muInfo('alivn',age:27)

//也可以将方法作为参数
```
##### 箭头函数
##### 匿名方法
```
var alivn = (){
    print('123')
}
```
##### 自执行方法
```
((){
print('1233')
)()


((n){
    print(n)
})(12)
```
##### 递归方法
```
var sum = 0;
fn(int n){
    sum+=n;
    if(n==0){
        return;
    }
    fn(n-1)
}
fn(100)
```
##### 全局变量、局部变量
全局变量常驻内存，容易污染全局；
局部变量
##### 闭包，让一个变量常驻内存，不污染全局

#### 11.所有东西都是对象，dart也是面向对象的语言，包含属性和方法
##### 自定义类class,类名首字母大写
```
class Person{
    //添加属性
    String name = 'alivn';
    int age = 27;
    getinfo(){
        print('$name----$age');
        print('${this.name}----${this.age}');
    }
}

//使用类并实例化
void main(){
    var p1 = new Person();
    print(p1.name);
    p1.getinfo();
}
```
##### 构造函数

```
class Person{
    //添加属性
    String name = 'alivn';
    int age = 27;
    getinfo(){
        print('$name----$age');
        print('${this.name}----${this.age}');
    }
    //构造函数
    Person(){
        print('构造函数内容');
    }
}

//使用类并实例化
void main(){
    var p1 = new Person();
    print(p1.name);
    p1.getinfo();
}
```
动态指定属性
```
class Person{
    //添加属性
    String name;
    int age;
    getinfo(){
        print('$name----$age');
        print('${this.name}----${this.age}');
    }
    //构造函数
    Person(String name,int age){
        this.name=name;
        this.age=age;
    }
}

//使用类并实例化
void main(){
    var p1 = new Person('alivn',27);
    print(p1.name);
    p1.getinfo();
}
``` 
简写
```
class Person{
    //添加属性
    String name;
    int age;
    getinfo(){
        print('$name----$age');
        print('${this.name}----${this.age}');
    }
    //构造函数
    Person(this.name,this.age){
        this.name=name;
        this.age=age;
    }
}

//使用类并实例化
void main(){
    var p1 = new Person('alivn',27);
    print(p1.name);
    p1.getinfo();
}
```
构造函数可以写多个

命名构造函数
```
class Person{
    //添加属性
    String name;
    int age;
    getinfo(){
        print('$name----$age');
        print('${this.name}----${this.age}');
    }
    //构造函数
    Person(this.name,this.age){
        this.name=name;
        this.age=age;
    }
    //命名构造函数
    Person.alivn(){
        print('命名构造函数');
    }
}

//使用类并实例化
void main(){
    var p1 = new Person('alivn',27);
    print(p1.name);
    p1.getinfo();
}


//调用命名构造函数
var alivn = new Person.alivn();
```
_ 私有化属性或方法

#### 12.类的静态成员
在属性和方法前加static；
静态属性和方法可直接通过类名属性和方法获取
```
class Person{
    static String name = 'alivn';
    static void getName(){
        print(this.name)
    }
}

main(){
    print(Person,name);
    Person.getName()
}
```
静态方法不能访问非静态成员；

非静态方法可以访问静态成员和非静态方法；

#### 13.抽象类、多台、接口

Dart中抽象类: Dart抽象类主要用于定义标准，子类可以继承抽象类，也可以实现抽象类接口。


1、抽象类通过abstract 关键字来定义

2、Dart中的抽象方法不能用abstract声明，Dart中没有方法体的方法我们称为抽象方法。

3、如果子类继承抽象类必须得实现里面的抽象方法

4、如果把抽象类当做接口实现的话必须得实现抽象类里面定义的所有属性和方法。

5、抽象类不能被实例化，只有继承它的子类可以

extends抽象类 和 implements的区别：

1、如果要复用抽象类里面的方法，并且要用抽象方法约束自类的话我们就用extends继承抽象类

2、如果只是把抽象类当做标准的话我们就用implements实现抽象类

案例：定义一个Animal 类要求它的子类必须包含eat方法

```
abstract class Animal{
  eat();   //抽象方法
  run();  //抽象方法  
  printInfo(){
    print('我是一个抽象类里面的普通方法');
  }
}

class Dog extends Animal{
  @override
  eat() {
     print('小狗在吃骨头');
  }

  @override
  run() {
    // TODO: implement run
    print('小狗在跑');
  }  
}
class Cat extends Animal{
  @override
  eat() {
    // TODO: implement eat
    print('小猫在吃老鼠');
  }

  @override
  run() {
    // TODO: implement run
    print('小猫在跑');
  }
}

main(){
  Dog d=new Dog();
  d.eat();
  d.printInfo();
  Cat c=new Cat();
  c.eat();
  c.printInfo();
  // Animal a=new Animal();   //抽象类没法直接被实例化

}
```


Datr中的多态：

允许将子类类型的指针赋值给父类类型的指针, 同一个函数调用会有不同的执行效果 。

子类的实例赋值给父类的引用。
    
多态就是父类定义一个方法不去实现，让继承他的子类去实现，每个子类有不同的表现。

```
abstract class Animal{
  eat();   //抽象方法 
}

class Dog extends Animal{
  @override
  eat() {
     print('小狗在吃骨头');
  }
  run(){
    print('run');
  }
}
class Cat extends Animal{
  @override
  eat() {   
    print('小猫在吃老鼠');
  }
  run(){
    print('run');
  }
}

main(){

  // Dog d=new Dog();
  // d.eat();
  // d.run();
  // Cat c=new Cat();
  // c.eat();

  Animal d=new Dog();
  d.eat();
  Animal c=new Cat();
  c.eat();
}
```


和Java一样，dart也有接口，但是和Java还是有区别的。

首先，dart的接口没有interface关键字定义接口，而是普通类或抽象类都可以作为接口被实现。

同样使用implements关键字进行实现。

但是dart的接口有点奇怪，如果实现的类是普通类，会将普通类和抽象中的属性的方法全部需要覆写一遍。
  
而因为抽象类可以定义抽象方法，普通类不可以，所以一般如果要实现像Java接口那样的方式，一般会使用抽象类。

建议使用抽象类定义接口。


定义一个DB库 支持 mysql  mssql  mongodb

mysql  mssql  mongodb三个类里面都有同样的方法

```
abstract class Db{   //当做接口   接口：就是约定 、规范
    String uri;      //数据库的链接地址
    add(String data);
    save();
    delete();
}
class Mysql implements Db{
  @override
  String uri;
  Mysql(this.uri);
  @override
  add(data) {
    // TODO: implement add
    print('这是mysql的add方法'+data);
  }
  @override
  delete() {
    // TODO: implement delete
    return null;
  }
  @override
  save() {
    // TODO: implement save
    return null;
  }
  remove(){
  }
}
class MsSql implements Db{
  @override
  String uri;
  @override
  add(String data) {
    print('这是mssql的add方法'+data);
  }
  @override
  delete() {
    // TODO: implement delete
    return null;
  }
  @override
  save() {
    // TODO: implement save
    return null;
  }
}
main() {
  Mysql mysql=new Mysql('xxxxxx');
  mysql.add('1243214');
}
```
#### 13.一个类实现多个接口、mixins

Dart中一个类实现多个接口：

```
abstract class A{
  String name;
  printA();
}
abstract class B{
  printB();
}
class C implements A,B{  
  @override
  String name;  
  @override
  printA() {
    print('printA');
  }
  @override
  printB() {
    // TODO: implement printB
    return null;
  }
}
void main(){
  C c=new C();
  c.printA();
}
```


mixins的中文意思是混入，就是在类中混入其他功能。

在Dart中可以使用mixins实现类似多继承的功能

因为mixins使用的条件，随着Dart版本一直在变，这里讲的是Dart2.x中使用mixins的条件：

1、作为mixins的类只能继承自Object，不能继承其他类
  
2、作为mixins的类不能有构造函数
  
3、一个类可以mixins多个mixins类
  
4、mixins绝不是继承，也不是接口，而是一种全新的特性

```
class A {
  String info="this is A";
  void printA(){
    print("A");
  }
}

class B {
  void printB(){
    print("B");
  }
}

class C with A,B{
  
}

void main(){
  
  var c=new C();  
  c.printA();
  c.printB();
  print(c.info);

}
```

```

class Person{
  String name;
  num age;
  Person(this.name,this.age);
  printInfo(){
    print('${this.name}----${this.age}');
  }
  void run(){
    print("Person Run");
  }
}

class A {
  String info="this is A";
  void printA(){
    print("A");
  }
  void run(){
    print("A Run");
  }
}

class B {  
  void printB(){
    print("B");
  }
  void run(){
    print("B Run");
  }
}

class C extends Person with B,A{
  C(String name, num age) : super(name, age);
  
}

void main(){  
  var c=new C('张三',20);  
  c.printInfo();
  // c.printB();
  // print(c.info);

   c.run();

}
```

#### 14.泛型、泛型方法、泛型类、泛型接口


通俗理解：泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持(类型校验)

```
//只能返回string类型的数据

  // String getData(String value){
  //     return value;
  // }
  

//同时支持返回 string类型 和int类型  （代码冗余）


  // String getData1(String value){
  //     return value;
  // }

  // int getData2(int value){
  //     return value;
  // }



//同时返回 string类型 和number类型       不指定类型可以解决这个问题


  // getData(value){
  //     return value;
  // }





//不指定类型放弃了类型检查。我们现在想实现的是传入什么 返回什么。比如:传入number 类型必须返回number类型  传入 string类型必须返回string类型
 
  // T getData<T>(T value){
  //     return value;
  // }

  getData<T>(T value){
      return value;
  }

void main(){

    // print(getData(21));

    // print(getData('xxx'));

    // getData<String>('你好');

    print(getData<int>(12));

}

```


集合List 泛型类的用法

案例：把下面类转换成泛型类，要求List里面可以增加int类型的数据，也可以增加String类型的数据。但是每次调用增加的类型要统一

```
//  class PrintClass{
//       List list=new List<int>();
//       void add(int value){
//           this.list.add(value);
//       }
//       void printInfo(){          
//           for(var i=0;i<this.list.length;i++){
//             print(this.list[i]);
//           }
//       }
//  }

//  PrintClass p=new PrintClass();
//     p.add(1);
//     p.add(12);
//     p.add(5);
//     p.printInfo();




 class PrintClass<T>{
      List list=new List<T>();
      void add(T value){
          this.list.add(value);
      }
      void printInfo(){          
          for(var i=0;i<this.list.length;i++){
            print(this.list[i]);
          }
      }
 }



main() {  
    // PrintClass p=new PrintClass();
    // p.add(11);
    // p.add('xxx');
    // p.add(5);
    // p.printInfo();



  // PrintClass p=new PrintClass<String>();

  // p.add('你好');

  //  p.add('哈哈');

  // p.printInfo();




  PrintClass p=new PrintClass<int>();

  p.add(12);

   p.add(23);

  p.printInfo();








 
  // List list=new List();
  // list.add(12);
  // list.add("你好");
  // print(list);



  // List list=new List<String>();

  // // list.add(12);  //错误的写法

  // list.add('你好');
  // list.add('你好1');

  // print(list);





  // List list=new List<int>();

  // // list.add("你好");  //错误写法
  // list.add(12); 

  // print(list);

}
```


Dart中的泛型接口:

实现数据缓存的功能：有文件缓存、和内存缓存。内存缓存和文件缓存按照接口约束实现。

1、定义一个泛型接口 约束实现它的子类必须有getByKey(key) 和 setByKey(key,value)

2、要求setByKey的时候的value的类型和实例化子类的时候指定的类型一致

```
// abstract class ObjectCache {
//   getByKey(String key);
//   void setByKey(String key, Object value);
// }

// abstract class StringCache {
//   getByKey(String key);
//   void setByKey(String key, String value);
// }


// abstract class Cache<T> {
//   getByKey(String key);
//   void setByKey(String key, T value);
// }


abstract class Cache<T>{
  getByKey(String key);
  void setByKey(String key, T value);
}

class FlieCache<T> implements Cache<T>{
  @override
  getByKey(String key) {    
    return null;
  }

  @override
  void setByKey(String key, T value) {
   print("我是文件缓存 把key=${key}  value=${value}的数据写入到了文件中");
  }
}

class MemoryCache<T> implements Cache<T>{
  @override
  getByKey(String key) {   
    return null;
  }

  @override
  void setByKey(String key, T value) {
       print("我是内存缓存 把key=${key}  value=${value} -写入到了内存中");
  }
}
void main(){


    // MemoryCache m=new MemoryCache<String>();

    //  m.setByKey('index', '首页数据');


     MemoryCache m=new MemoryCache<Map>();

     m.setByKey('index', {"name":"张三","age":20});
}
```
