---
title: TypeScript
date: 2020-06-01 10:46:27
tags:
- TypeScript
- Interfaces
categories:
- 编程语言
---
##### 1.TypeScript 是一种由微软开发的自由和开源的编程语言，它是 JavaScript 的一个超集，扩展了 JavaScript 的语法。
<!--more-->
###### 超集：
如果一个集合S2中的每一个元素都在集合S1中，且集合S1中可能包含S2中没有的元素，则集合S1就是S2的一个超集，反过来，S2是S1的子集。 S1是S2的超集，若S1中一定有S2中没有的元素，则S1是S2的真超集，反过来S2是S1的真子集。

##### 2.语法特性

类 Classes  

接口 Interfaces  

模块 Modules   

类型注解 Type annotations  

编译时类型检查 Compile time type checking   

Arrow 函数 (类似 C# 的 Lambda 表达式)

##### 3.JavaScript 与 TypeScript 的区别

TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

##### 4.类型批注

TypeScript 通过类型批注提供静态类型以在编译时启动类型检查。这是可选的，而且可以被忽略而使用 JavaScript 常规的动态类型。
```
function Add(left: number, right: number): number {
    return left + right;
}
```
对于基本类型的批注是number, bool和string。而弱或动态类型的结构则是any类型。

类型批注可以被导出到一个单独的声明文件以让使用类型的已被编译为JavaScript的TypeScript脚本的类型信息可用。批注可以为一个现有的JavaScript库声明，就像已经为Node.js和jQuery所做的那样。

当类型没有给出时，TypeScript编译器利用类型推断以推断类型。如果由于缺乏声明，没有类型可以被推断出，那么它就会默认为是动态的any类型。

##### 5.接口

```
interface Shape {
    name: string;
    width: number;
    height: number;
    color?: string;
}
 
function area(shape : Shape) {
    var area = shape.width * shape.height;
    return "I'm " + shape.name + " with area " + area + " cm squared";
}
 
console.log( area( {name: "rectangle", width: 30, height: 15} ) );
console.log( area( {name: "square", width: 30, height: 30, color: "blue"} ) );
```
接口可以作为一个类型批注。

##### 6.箭头函数表达式（lambda表达式）

lambda表达式 ()=>{something}或()=>something 相当于js中的函数,它的好处是可以自动将函数中的this附加到上下文中。

##### 7.类
TypeScript支持集成了可选的类型批注支持的ECMAScript 6的类。

##### 8.TypeScript 与面向对象
面向对象主要有两个概念：对象和类。

对象：对象是类的一个实例（对象不是找个女朋友），有状态和行为。例如，一条狗是一个对象，它的状态有：颜色、名字、品种；行为有：摇尾巴、叫、吃等。

类：类是一个模板，它描述一类对象的行为和状态。

方法：方法是类的操作的实现步骤。

##### 9.TypeScript基础类型
any         声明为 any 的变量可以赋予任意类型的值。

number      数字类型，双精度 64 位浮点值。它可以用来表示整数和分数。

string      字符串类型

boolean     布尔类型

无          数组类型，声明变量为数组，例：  

```            
let arr: number[] = [1,2];
            
let arr: Array<number> = [1,2];
```
         
无          元组 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。

```
let x: [string, number];
x = ['Runoob', 1];    // 运行正常
x = [1, 'Runoob'];    // 报错
console.log(x[0]);    // 输出 Runoob
```

enum        枚举类型用于定义数值集合。

void        用于标识方法返回值的类型，表示该方法没有返回值。

null        表示对象值缺失，空对象。

undefined   用于初始化变量为一个未定义的值

never       其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。

**注意：TypeScript 和 JavaScript 没有整数类型。**

Any 类型

任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

```
<p>1、变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查，示例代码如下：</p>

let x: any = 1;    // 数字类型
x = 'I am who I am';    // 字符串类型
x = false;    // 布尔类型
```

改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查，示例代码如下：

```
let x: any = 4;
x.ifItExists();    // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
x.toFixed();    // 正确
```

定义存储各种类型数据的数组时，示例代码如下

```
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

Null 和 Undefined

null
在 JavaScript 中 null 表示 "什么都没有"。

null是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

undefined
在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：
```
// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined;    // 运行错误
x = null;    // 运行错误
```
如果一个类型可能出行 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：
```
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确
```

never 类型

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）
```
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```

##### 10.TypeScript 变量声明
类型断言

类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。  
语法格式：
```
<类型>值
```
或:
```
值 as 类型
```

变量作用域

TypeScript 有以下几种作用域：

全局作用域 − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。

类作用域 − 这个变量也可以称为 字段。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。

局部作用域 − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。

##### 11.TypeScript运算符
同js一致
```
算术运算符
逻辑运算符
关系运算符
按位运算符
赋值运算符
三元/条件运算符
字符串运算符
类型运算符
```
类型运算符

typeof 运算符  
typeof 是一元运算符，返回操作数的数据类型。  
```
var num = 12 
console.log(typeof num);   //输出结果: number
```
instanceof  
instanceof 运算符用于判断对象是否为指定的类型。

##### 12.TypeScript条件语句
```
if

if else 

if   else if   else

switch ... case
```

##### 13.TypeScript循环
```
for 循环

for...in 循环

for…of 、forEach、every 和 some 循环

while 循环

do...while 循环
```
break 语句  
 当 break 语句出现在一个循环内时，循环会立即终止，且程序流将继续执行紧接着循环的下一条语句。
 它可用于终止 switch 语句中的一个 case。
 如果您使用的是嵌套循环（即一个循环内嵌套另一个循环），break 语句会停止执行最内层的循环，然后开始执行该块之后的下一行代码。
 
continue 语句    
continue 语句有点像 break 语句。但它不是强制终止，continue 会跳过当前循环中的代码，强迫开始下一次循环。

对于 for 循环，continue 语句执行后自增语句仍然会执行。对于 while 和 do...while 循环，continue 语句 重新执行条件判断语句。

无限循环  
无限循环就是一直在运行不会停止的循环。 for 和 while 循环都可以创建无限循环。

for 创建无限循环语法格式：
```
for(;;) { 
   // 语句
}
```
实例
```
for(;;) { 
   console.log("这段代码会不停的执行") 
}
```
while 创建无限循环语法格式：
```
while(true) { 
   // 语句
} 
```
实例
```
while(true) { 
   console.log("这段代码会不停的执行") 
}
```

##### 14.TypeScript函数
同js一致

函数返回值  
声明函数返回值类型
```
function function_name():return_type { 
    // 语句
    return value; 
}
```
return_type 是返回值的类型。

return 关键词后跟着要返回的结果。

一个函数只能有一个 return 语句。

返回值的类型需要与函数定义的返回类型(return_type)一致。

带参数函数  
声明参数类型
```
function func_name( param1 [:datatype], param2 [:datatype]) {   
}
```
param1、param2 为参数名。

datatype 为参数类型。

```
function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,2))
```
可选参数

在 TypeScript 函数里，如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 ？。
```
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
 
let result1 = buildName("Bob");  // 正确
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");  // 正确
```
注意  
可选参数必须跟在必需参数后面。 如果上例我们想让 firstName 是可选的，lastName 必选，那么就要调整它们的位置，把 firstName 放在后面。

如果都是可选参数就没关系。

默认参数

我们也可以设置参数的默认值，这样在调用函数的时候，如果不传入该参数的值，则使用默认参数，语法格式为：
```
function function_name(param1[:type],param2[:type] = default_value) { 
}
```
注意：参数不能同时设置为可选和默认。

```
function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("计算结果: ",discount); 
} 
calculate_discount(1000) 
calculate_discount(1000,0.30)
```

剩余参数

有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。

剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入。
```
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
  
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```
```
function addNumbers(...nums:number[]) {  
    var i;   
    var sum:number = 0; 
    
    for(i = 0;i<nums.length;i++) { 
       sum = sum + nums[i]; 
    } 
    console.log("和为：",sum) 
 } 
 addNumbers(1,2,3) 
 addNumbers(10,10,10,10,10)
```

匿名函数

匿名函数是一个没有函数名的函数。

匿名函数在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。

我们可以将匿名函数赋值给一个变量，这种表达式就成为函数表达式。

```
var res = function( [arguments] ) { ... }
```

匿名函数自调用
```
TypeScript
(function () { 
    var x = "Hello!!";   
    console.log(x)     
 })()
```

构造函数

TypeScript 也支持使用 JavaScript 内置的构造函数 Function() 来定义函数；
```
var res = new Function( [arguments] ) { ... })
```
```
var myFunction = new Function("a", "b", "return a * b"); 
var x = myFunction(4, 3); 
console.log(x);
```

递归函数

归函数即在函数内调用函数本身。

```
function factorial(number) {
    if (number <= 0) {         // 停止执行
        return 1; 
    } else {     
        return (number * factorial(number - 1));     // 调用自身
    } 
}; 
console.log(factorial(6));      // 输出 720
```

Lambda 函数--箭头函数

```
var foo = (x:number)=>10 + x 
console.log(foo(100))      //输出结果为 110
```

我们可以不指定函数的参数类型，通过函数内来推断参数类型:
```
var func = (x)=> { 
    if(typeof x=="number") { 
        console.log(x+" 是一个数字") 
    } else if(typeof x=="string") { 
        console.log(x+" 是一个字符串") 
    }  
} 
func(12) 
func("Tom")
```

函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。

每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。

参数类型不同：
```
function disp(string):void; 
function disp(number):void;
```
参数数量不同
```
function disp(n1:number):void; 
function disp(x:number,y:number):void;
```
参数类型顺序不同
```
function disp(n1:number,s1:string):void; 
function disp(s:string,n:number):void;
```
如果参数类型不同，则参数类型应设置为 any。

参数数量不同你可以将不同的参数设置为可选。

##### 15.TypeScript Number、String、Array
与js一致，包含对应的属性和方法

创建一个 number 类型的数组
```
var numlist:number[] = [2,4,6,8]
```
多维数组
```
ar arr_name:datatype[][]=[ [val1,val2,val3],[v1,v2,v3] ]
```
```
var multi:number[][] = [[1,2,3],[23,24,25]]  
console.log(multi[0][0])
console.log(multi[0][1])
console.log(multi[0][2])
console.log(multi[1][0])
console.log(multi[1][1])
console.log(multi[1][2])
```
##### 15.TypeScript 元组
```
var tuple_name = [value1,value2,value3,…value n]
```
```
var mytuple = [10,"Runoob"]; // 创建元组
console.log(mytuple[0]) 
console.log(mytuple[1])
```

##### 16.TypeScript 联合类型
联合类型（Union Types）可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。

注意：只能赋值指定的类型，如果赋值其它类型就会报错。

创建联合类型的语法格式如下：
```
Type1|Type2|Type3 
```
```
var val:string|number 
val = 12 
console.log("数字为 "+ val) 
val = "Runoob" 
console.log("字符串为 " + val)
```
联合类型数组
```
var arr:number[]|string[]; 

var arr:(number|strong)[]; 
```

##### 17.TypeScript 接口
接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。
```
interface interface_name { 
}
```
定义了一个接口 IPerson，接着定义了一个变量 customer，它的类型是 IPerson。

customer 实现了接口 IPerson 的属性和方法。
```
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
} 
 
var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 
 
console.log("Customer 对象 ") 
console.log(customer.firstName) 
console.log(customer.lastName) 
console.log(customer.sayHi())  
 
var employee:IPerson = { 
    firstName:"Jim",
    lastName:"Blakes", 
    sayHi: ():string =>{return "Hello!!!"} 
} 
 
console.log("Employee  对象 ") 
console.log(employee.firstName) 
console.log(employee.lastName)
```

注意接口不能转换为 JavaScript。不会编译成javascript。 它只是 TypeScript 的一部分。

联合类型和接口
```
interface RunOptions { 
    program:string; 
    commandline:string[]|string|(()=>string); 
} 
 
// commandline 是字符串
var options:RunOptions = {program:"test1",commandline:"Hello"}; 
console.log(options.commandline)  
 
// commandline 是字符串数组
options = {program:"test1",commandline:["Hello","World"]}; 
console.log(options.commandline[0]); 
console.log(options.commandline[1]);  
 
// commandline 是一个函数表达式
options = {program:"test1",commandline:()=>{return "**Hello World**";}}; 
 
var fn:any = options.commandline; 
console.log(fn());
```

接口和数组  
接口中我们可以将数组的索引值和元素设置为不同类型，索引值可以是数字或字符串。
```
interface namelist { 
   [index:number]:string 
} 
 
var list2:namelist = ["John",1,"Bran"] / 错误元素 1 不是 string 类型
interface ages { 
   [index:string]:number 
} 
 
var agelist:ages; 
agelist["John"] = 15   // 正确 
agelist[2] = "nine"   // 错误
```

接口继承  
接口继承就是说接口可以通过其他接口来扩展自己。

Typescript 允许接口继承多个接口。

继承使用关键字 extends。

单接口继承语法格式：
```
Child_interface_name extends super_interface_name
```
多接口继承语法格式：
```
Child_interface_name extends super_interface1_name, super_interface2_name,…,super_interfaceN_name
```
继承的各个接口使用逗号 , 分隔。
```
interface Person { 
   age:number 
} 
 
interface Musician extends Person { 
   instrument:string 
} 
 
var drummer = <Musician>{}; 
drummer.age = 27 
drummer.instrument = "Drums" 
console.log("年龄:  "+drummer.age)
console.log("喜欢的乐器:  "+drummer.instrument)
```
```
interface IParent1 { 
    v1:number 
} 
 
interface IParent2 { 
    v2:number 
} 
 
interface Child extends IParent1, IParent2 { } 
var Iobj:Child = { v1:12, v2:23} 
console.log("value 1: "+Iobj.v1+" value 2: "+Iobj.v2)
```

##### 18.TypeScript 类
TypeScript 是面向对象的 JavaScript。

类描述了所创建的对象共同的属性和方法。

TypeScript 支持面向对象的所有特性，比如 类、接口等。

TypeScript 类定义方式如下：
```
class class_name { 
    // 类作用域
}
```
定义类的关键字为 class，后面紧跟类名，类可以包含以下几个模块（类的数据成员）：

字段 − 字段是类里面声明的变量。字段表示对象的有关数据。

构造函数 − 类实例化时调用，可以为类的对象分配内存。

方法 − 方法为对象要执行的操作。

创建类的数据成员

以下实例我们声明了类 Car，包含字段为 engine，构造函数在类实例化后初始化字段 engine。

this 关键字表示当前类实例化的对象。注意构造函数的参数名与字段名相同，this.engine 表示类的字段。

此外我们也在类中定义了一个方法 disp()。
```
class Car { 
    // 字段 
    engine:string; 
 
    // 构造函数 
    constructor(engine:string) { 
        this.engine = engine 
    }  
 
    // 方法 
    disp():void { 
        console.log("发动机为 :   "+this.engine) 
    } 
}
```
创建实例化对象

使用 new 关键字来实例化类的对象，语法格式如下：
```
var object_name = new class_name([ arguments ])
```
类实例化时会调用构造函数，例如：
```
var obj = new Car("Engine 1")
```
类中的字段属性和方法可以使用 . 号来访问：
```
// 访问属性
obj.field_name 

// 访问方法
obj.function_name()
```
```
class Car { 
   // 字段
   engine:string; 
   
   // 构造函数
   constructor(engine:string) { 
      this.engine = engine 
   }  
   
   // 方法
   disp():void { 
      console.log("函数中显示发动机型号  :   "+this.engine) 
   } 
} 
 
// 创建一个对象
var obj = new Car("XXSY1")
 
// 访问字段
console.log("读取发动机型号 :  "+obj.engine)  
 
// 访问方法
obj.disp()
```

类的继承

TypeScript 支持继承类，即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为父类，继承它的类称为子类。

类继承使用关键字 extends，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。

TypeScript 一次只能继承一个类，不支持继承多个类，但 TypeScript 支持多重继承（A 继承 B，B 继承 C）。

语法格式如下：
```
class child_class_name extends parent_class_name
```
类的继承：实例中创建了 Shape 类，Circle 类继承了 Shape 类，Circle 类可以直接使用 Area 属性：

```
class Shape { 
   Area:number 
   
   constructor(a:number) { 
      this.Area = a 
   } 
} 
 
class Circle extends Shape { 
   disp():void { 
      console.log("圆的面积:  "+this.Area) 
   } 
}
  
var obj = new Circle(223); 
obj.disp()
```
注意的是子类只能继承一个父类，TypeScript 不支持继承多个类，但支持多重继承，如下实例：
```
class Root { 
   str:string; 
} 
 
class Child extends Root {} 
class Leaf extends Child {} // 多重继承，继承了 Child 和 Root 类
 
var obj = new Leaf(); 
obj.str ="hello" 
console.log(obj.str)
```

继承类的方法重写

类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。

其中 super 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。
```
class PrinterClass { 
   doPrint():void {
      console.log("父类的 doPrint() 方法。") 
   } 
} 
 
class StringPrinter extends PrinterClass { 
   doPrint():void { 
      super.doPrint() // 调用父类的函数
      console.log("子类的 doPrint()方法。")
   } 
}
```

static 关键字

static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用。
```
class StaticMem {  
   static num:number; 
   
   static disp():void { 
      console.log("num 值为 "+ StaticMem.num) 
   } 
} 
 
StaticMem.num = 12     // 初始化静态变量
StaticMem.disp()       // 调用静态方法
```

instanceof 运算符

instanceof 运算符用于判断对象是否是指定的类型，如果是返回 true，否则返回 false。
```
class Person{ } 
var obj = new Person() 
var isPerson = obj instanceof Person; 
console.log("obj 对象是 Person 类实例化来的吗？ " + isPerson);
```

访问控制修饰符

TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限。

public（默认） : 公有，可以在任何地方被访问。

protected : 受保护，可以被其自身以及其子类和父类访问。

private : 私有，只能被其定义所在的类访问。

```
class Encapsulate { 
   str1:string = "hello" 
   private str2:string = "world" 
}
 
var obj = new Encapsulate() 
console.log(obj.str1)     // 可访问 
console.log(obj.str2)   // 编译错误， str2 是私有的
```

类和接口

类可以实现接口，使用关键字 implements，并将 interest 字段作为类的属性使用。
```
interface ILoan { 
   interest:number 
} 
 
class AgriLoan implements ILoan { 
   interest:number 
   rebate:number 
   
   constructor(interest:number,rebate:number) { 
      this.interest = interest 
      this.rebate = rebate 
   } 
} 
 
var obj = new AgriLoan(10,1) 
console.log("利润为 : "+obj.interest+"，抽成为 : "+obj.rebate )
```

##### 19.TypeScript对象
对象是包含一组键值对的实例。 值可以是标量、函数、数组、对象等，如下实例：
```
var object_name = { 
    key1: "value1", // 标量
    key2: "value",  
    key3: function() {
        // 函数
    }, 
    key4:["content1", "content2"] //集合
}
```
```
var sites = { 
   site1:"Runoob", 
   site2:"Google" 
}; 
// 访问对象的值
console.log(sites.site1) 
console.log(sites.site2)
```

TypeScript 类型模板

Typescript 中的对象必须是特定类型的实例。

```
var sites = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // 类型模板
};
sites.sayHello = function () {
    console.log("hello " + sites.site1);
};
sites.sayHello();
```
对象也可以作为一个参数传递给函数，如下实例：
```
var sites = { 
    site1:"Runoob", 
    site2:"Google",
}; 
var invokesites = function(obj: { site1:string, site2 :string }) { 
    console.log("site1 :"+obj.site1) 
    console.log("site2 :"+obj.site2) 
} 
invokesites(sites)
```

鸭子类型(Duck Typing)

鸭子类型（英语：duck typing）是动态类型的一种风格，是多态(polymorphism)的一种形式。

在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由"当前方法和属性的集合"决定。

在鸭子类型中，关注点在于对象的行为，能作什么；而不是关注对象所属的类型。例如，在不使用鸭子类型的语言中，我们可以编写一个函数，它接受一个类型为"鸭子"的对象，并调用它的"走"和"叫"方法。在使用鸭子类型的语言中，这样的一个函数可以接受一个任意类型的对象，并调用它的"走"和"叫"方法。如果这些需要被调用的方法不存在，那么将引发一个运行时错误。任何拥有这样的正确的"走"和"叫"方法的对象都可被函数接受的这种行为引出了以上表述，这种决定类型的方式因此得名。
```
interface IPoint { 
    x:number 
    y:number 
} 
function addPoints(p1:IPoint,p2:IPoint):IPoint { 
    var x = p1.x + p2.x 
    var y = p1.y + p2.y 
    return {x:x,y:y} 
} 
 
// 正确
var newPoint = addPoints({x:3,y:4},{x:5,y:1})  
 
// 错误 
var newPoint2 = addPoints({x:1},{x:4,y:3})
```

##### 20.TypeScript 命名空间
命名空间一个最明确的目的就是解决重名问题。
```
namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}
```
以上定义了一个命名空间 SomeNameSpaceName，如果我们需要在外部可以调用 SomeNameSpaceName 中的类类和接口，则需要在类和接口添加 export 关键字。

要在另外一个命名空间调用语法格式为：
```
SomeNameSpaceName.SomeClassName;
```
如果一个命名空间在一个单独的 TypeScript 文件中，则应使用三斜杠 /// 引用它，语法格式如下：
```
/// <reference path = "SomeFileName.ts" />
```
IShape.ts 文件代码：
```
namespace Drawing { 
    export interface IShape { 
        draw(); 
    }
}
```
Circle.ts 文件代码：
```
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Circle implements IShape { 
        public draw() { 
            console.log("Circle is drawn"); 
        }  
    }
}
```
Triangle.ts 文件代码：
```
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Triangle implements IShape { 
        public draw() { 
            console.log("Triangle is drawn"); 
        } 
    } 
}
```
TestShape.ts 文件代码：
```
/// <reference path = "IShape.ts" />   
/// <reference path = "Circle.ts" /> 
/// <reference path = "Triangle.ts" />  
function drawAllShapes(shape:Drawing.IShape) { 
    shape.draw(); 
} 
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
```

嵌套命名空间

命名空间支持嵌套，即你可以将命名空间定义在另外一个命名空间里头。
```
namespace namespace_name1 { 
    export namespace namespace_name2 {
        export class class_name {    } 
    } 
}
```
Invoice.ts 文件代码：
```
namespace Runoob { 
   export namespace invoiceApp { 
      export class Invoice { 
         public calculateDiscount(price: number) { 
            return price * .40; 
         } 
      } 
   } 
}
```
InvoiceTest.ts 文件代码：
```
/// <reference path = "Invoice.ts" />
var invoice = new Runoob.invoiceApp.Invoice(); 
console.log(invoice.calculateDiscount(500));
```

##### 21.TypeScript 模块
TypeScript 模块的设计理念是可以更换的组织代码。

模块是在其自身的作用域里执行，并不是在全局作用域，这意味着定义在模块里面的变量、函数和类等在模块外部是不可见的，除非明确地使用 export 导出它们。类似地，我们必须通过 import 导入其他模块导出的变量、函数、类等。

两个模块之间的关系是通过在文件级别上使用 import 和 export 建立的。

模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。 大家最熟知的JavaScript模块加载器是服务于 Node.js 的 CommonJS 和服务于 Web 应用的 Require.js。

模块导出使用关键字 export 关键字，语法格式如下：
```
// 文件名 : SomeInterface.ts 
export interface SomeInterface { 
   // 代码部分
}
```
要在另外一个文件使用该模块就需要使用 import 关键字来导入:
```
import someInterfaceRef = require("./SomeInterface");
```

##### 22.TypeScript 声明文件
TypeScript 作为 JavaScript 的超集，在开发过程中不可避免要引用其他第三方的 JavaScript 的库。虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 JavaScript 库和模块信息的声明文件。通过引用这个声明文件，就可以借用 TypeScript 的各种特性来使用库文件了。

这时，我们需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对：
```
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```
declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

声明文件

声明文件以 .d.ts 为后缀，例如：
```
runoob.d.ts
```
声明文件或模块的语法格式如下：
```
declare module Module_Name {
}
```
TypeScript 引入声明文件语法格式：
```
/// <reference path = " runoob.d.ts" />
```
很多流行的第三方库的声明文件不需要我们定义了.