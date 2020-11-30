---
title: TypeScript高级概念
date: 2020-11-30 13:51:23
tags:
- TypeScript
- Interfaces
categories:
- 编程语言
---

#### 一、接口

例如我们这定义一个叫做printPost的函数，那这个函数可以接收一个文章对象参数post，然后在函数的内部去打印文章的title, 然后再去打印他的content属性。
<!--more-->
```js
function printPost (post) {
    console.log(post.title);
    console.log(post.content);
}
```

那这个时候对于这个函数所接收的post对象他就有一定的要求，也就是我们所传入的这个对象必须要存在一个title属性和一个content属性，只不过这种要求他实际上是隐性的，他没有明确的表达出来。

那这种情况下我们就可以使用接口去表现出来这种约束，这里我们可以尝试先去定义一个接口。

定义接口的方式呢就是使用interface这样一个关键词，然后后面跟上接口的名称，这里我们可以叫做post，然后就是一对{}，然后{}里面就可以添加具体的成员限制。这里我们添加一个title和content，类型都是string。

```js
interface Post {
    title: string;
    content: string;
}
```

注意这里我们可以使用逗号分割成员，但是更标准的做法是使用分号去分割，而且呢这个分号跟js中绝大多数的分号是一样的，可以省略，那关于是否应该在代码当中明确使用每一个分号，个人的编码习惯是不加，你可以根据你所在的团队或者是项目对应的编码规范来去决定要不要加分号，这个问题我们不做过多讨论。

完成过后我们这里可以给这个post参数的类型设置为我们刚刚所定义的Post接口。

```js
function printPost (post: Post) {
    console.log(post.title);
    console.log(post.content);
}

printPost({
    title: 'hello',
    content: 'typescript'
})
```

那此时就是显示的要求我们所传入的对象他必须要有title和content这两个成员了，那这就是接口的一个基本作用。

一句话去总结，接口就是用来约束对象的结构，那一个对象去实现一个接口，他就必须要去拥有这个接口当中所约束的所有的成员。

我们可以编译一下这个代码，编译过后我们打开对应的js文件，我们在js当中并不会发现有任何跟接口相关的代码，也就是说TypeScript中的接口他只是用来为我们有结构的数据去做类型约束的，在实际运行阶段呢，实际这种接口他并没有意义。

**可选成员，只读成员**

对于接口中约定的成员，还有一些特殊的用法，我们依次来看一下。

首先是可选成员，如果说我们在一个对象当中，我们某一个成员他是可有可无的话，那这样的话我们对于约束这个对象的接口来说我们可以使用可选成员这样一个特性。

例如我们这里添加一个subTitle这样一个成员，他的类型同样是string，不过我们这里的文章不一定是每一个都有subTitle，这种况下我们就可以在subTitle后面添加一个问号，这就表示我们这个subTitle成员他是可有可无的了。

```js
interface Post {
    title: string;
    content: string;
    subTitle?: string;
}
```

那这种用法呢其实就是相当于给这个subTitle标记他的类型是string或者是undefined。这就是可选成员。

接下来我们再来看一下只读成员这样一个特性，那这里我们再给Post接口添加一个summary这样一个成员，那一般逻辑上来讲的话文章的summary他都是从文章的内容当中自动提取出来的，所以说我们不应该允许外界去设置他。

那这种情况下我们可以使用readonly这样一个关键词，去修饰一下这里的summary。那添加了readonly过后我们这个summary他在初始化完成过后就不能够再去修改了。如果我们再去修改就会报错。这就是只读成员。

```js
interface Post {
    title: string;
    content: string;
    subTitle?: string;
    readonly summary: string;
}
```

最后我们再来看一个动态成员的用法，那这种用法一般是适用于一些具有动态成员对象，例如程序当中的缓存对象，那他在运行过程中就会出现一些动态的键值。

这里我们来新建一个新的接口，因为我们在定义的时候我们是无法知道会有那些具体的成员，所以说我们就不能够去指定，具体的成员名称，而是使用一个[], 这个[]中使用key: string。

这个key并不是固定的，可以是任意的名称, 只是代表了我们属性的名称，他是一个格式，然后后面这个string就是成员名的类型，也就是键的类型，后面我们可以跟上动态属性的值为string。

```js
interface Cache {
    [key: string]: string;
}
```

完成以后我们再来创建一个cache对象，让他去实现这个接口，那这个时候我们就可以在这个cache对象上动态的去添加任意的成员了, 只不过这些成员他都必须是stringd类型的键值。

```js
const cache: Cache = {};

cache.foo = 'value1';
cache.bar = 'value2'
```

#### 二、类

##### 2.1 类的基本使用

类可以说是面向对象编程中一个最重要的概念，关于类的作用这里我们再简单描述一下。他就是用来描述一类具体事物的抽象特征，我们可以以生活角度去举例。

例如手机就属于一个类型，那这个类型的特征呢就是能够打电话，发信息。那在这个类型下面呢他还会有一些细分的子类，那这种子类他一定会满足父类的所有特征，然后再多出来一些额外的特征。例如只能手机，他除了可以打电话发短信还能够使用一些app。

那我们是不能直接去使用类的，而是去使用这个类的具体事物，例如你手中的只能手机。

那类比到程序的角度，类也是一样的，他可以用来去描述一类具体对象的一些抽象成员，那在ES6以前，JavaScript都是通过函数然后配合原型去模拟实现的类。那从ES6开始，JavaScript中有了专门的class。

而在TypeScript中，我们除了可以使用所有ECMAScript的标准当中所有类的功能，他还添加了一些额外的功能和用法，例如我们对类成员有特殊的访问修饰符，还有一些抽象类的概念。

那对于ECMAScript标准中的class，我们这里就不单独去介绍了，如果你不太熟悉，你可以去参考ECMAScript前面的文章。

这里我们来着重介绍一下，在TypeScript中额外多出来的一些新的类的一些特性，我们可以先来声明一个叫做Person的类型，然后我们在这个类型当中去声明一下constructor构造桉树，在构造函数当中我们接收一个name和age参数，那这里我们仍然可以使用类型注解的方式去标注我们这个地方每个参数的类型。

然后在这个构造函数的里面我们可以使用this去为当前这个类型的属性去赋值，不过这里直接去使用this访问当前类的属性会报错，说的是当前这个Person类型上面并不存在对应的name和age。

```js
class Person {
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

这是因为在TypeScript中我们需要明确在类型中取声明他所拥有的一些属性，而不是直接在构造函数当中动态通过this去添加。

那在类型声明属性的方式就是直接在类当中去定义, 那这个语法呢是ECMAScript2016标准当中定义的，那我们同样可以在这里给name和gae属性添加类型。那他也可以通过等号去直接赋值一个初始值，不过一般情况下我们还是会在构造函数中动态的为属性赋值。

需要注意的是，在TypeScript中类的属性他必须要有一个初始值，可以在等号后面去赋值，或者是在构造函数当中去初始化，两者必须做其一，否则就会报错。

```js
class Person {
    name: string = 'init name';
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

那以上就是在TypeScript中类属性在定义上的一些细微差异，其实具体来说就是我们类的属性他在使用之前必须要现在类型当中去声明，那这么做的目的其实就是为了给我们的属性去做一些类型的标注。

那除此之外呢我们仍然可以按照ES6标准当中的语法，为这个类型去声明一些方法，例如我们这里添加一个叫做sayHi的方法，那在这个方法当中我们仍然可以使用函数类型注解的方式去限制参数的类型和返回值的类型。

那在这个方法的内部呢我们同样可以使用this去访问当前实例对象，也就可以访问到对应的属性。

```js
class Person {
    name: string = 'init name';
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHi(msg: string): void {
        console.log(`I am ${this.name}, ${msg}`);
    }
}
```

那以上就是类在TypeScript中的一个基本使用。

##### 2.2 类的访问修饰符

接下来我们再来看几个TypeScript中类的一些特殊用法，那首先就是类当中成员的访问修饰符，类中的每一个成员都可以使用访问修饰符去修饰他们。

例如我们这里给age属性前面去添加一个private，表示这个age属性是一个私有属性，这种私有属性只能够在类的内部去访问，这里我们创建一个Person对象, 我们打印tom的name属性和age属性。可以发现name可以访问，age就会报错，因为age已经被我们标记为了私有属性。

```js
class Person {
    name: string = 'init name';
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHi(msg: string): void {
        console.log(`I am ${this.name}, ${msg}`);
    }
}

const tom = new Person('tom', 18);

console.log(tom.name);
console.log(tom.age);
```

除了private以外，我们还可以使用public修饰符去修饰成员，意思是他是一个共有成员，不过再TypeScript中，类成员的访问修饰符默认就是public，所以我们这里加不加public效果都是一样的。不过我们还是建议大家手动去加上这种public的修饰符，因为这样的话，我们的代码会更加容易理解一点。

```js
class Person {
    public name: string = 'init name';
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHi(msg: string): void {
        console.log(`I am ${this.name}, ${msg}`);
    }
}
```

最后还有一个叫做protected修饰符，说的就是受保护的，我们可以添加一个gender的属性，他的访问修饰符我们就使用protected，我们同样在构造函数中初始化一下gender。

完成过后我们在实例对象上去访问gender，会发现也是访问不到的，也就是protected也不能在外部直接访问。

```js
class Person {
    public name: string = 'init name';
    private age: number;
    protected gender: boolean;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.gender = true;
    }

    sayHi(msg: string): void {
        console.log(`I am ${this.name}, ${msg}`);
    }
}

const tom = new Person('tom', 18);

console.log(tom.name);
// console.log(tom.age);
console.log(tom.gender);
```

那他跟private的区别到底在什么地方呢, 这里我们可以再定义一个叫做Student的类型，我们让这个类型去继承自Person，我们在构造函数中尝试访问父类的gender，是可以访问到的。那意思就是protected只允许在子类当中去访问对应的成员。

```js
class Student extends Person {
    constructor(name: string, age: number) {
        super(name, age); // 子类需要调用super将参数传给父类。
        console.log(this.gender);
    }
}
```

那以上就是TypeScript当中对于类额外添加的三个访问修饰符。分别是private，protected和public，那他们的作用可以用来去控制类当中的成员的可访问级别。

那这里还有一个需要注意的点，就是对于构造函数的访问修饰符，那构造函数的访问修饰符默认也是public，那如果说我们把它设置为private，那这个类型就不能够在外部被实例化了，也不能够被继承，那在这样一种情况下，我们就只能够在这个类的内部去添加一个静态方法，然后在静态方法当中去创建这个类型的实例，因为private只允许在内部访问。

例如我们这里再去添加一个叫create的静态方法，那static也是ES6标准当中定义的，然后我们就可以在这个create方法中去使用new的方式去创建这个类型的实例，因为new的方式就是调用了这个类型的构造函数。

此时我们就可以在外部去使用create静态方法创建Student类型的对象了。

```js
class Student extends Person {
    private constructor(name: string, age: number) {
        super(name, age); // 子类需要调用super将参数传给父类。
        console.log(this.gender);
    }

    static create(name: string, age: number) {
        return new Student(name, age);
    }
}

const jack = Student.create('jack', 18);
```

那如果我们把构造函数标记为protected，这样一个类型也是不能在外面被实例化的，但是相比于private他是允许继承的，这里我们就不单独演示了。

##### 2.3 类的只读属性

对属性成员我们除了可以使用private和protected去控制它的访问级别，我们还可以使用一个叫做readonly的关键词去把这个成员设置为只读的。

这里我们将gender属性设置为readonly，注意这里如果说我们的属性已经有了访问修饰符的话，那readonly应该跟在访问修饰符的后面，对于只读属性，我们可以选择在类型声明的时候直接通过等号的方式去初始化，也可以在构造函数当中去初始化，二者只能选其一。

也就是说我们不能在声明的时候初始化，然后在构造函数中修改它，因为这样的话已经破坏了readonly。

```js
class Person {
    public name: string = 'init name';
    private age: number;
    protected readonly gender: boolean;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.gender = true;
    }

    sayHi(msg: string): void {
        console.log(`I am ${this.name}, ${msg}`);
        console.log(this.age);
    }
}

const tom = new Person('tom', 18);

console.log(tom.name);
```

在初始化过后呢, 这个gender属性就不允许再被修改了，无论是在内部还是外部，他都是不允许修改的。

以上就是readonly这样一个只读属性，还是比较好理解的。

##### 2.4 类与接口

相比于类，接口的概念要更为抽象一点，我们可以接着之前所说的手机的例子来去做比。我们说手机他是一个类型，这个实例的类型都是能够打电话，发短信的，因为手机这个类的特征呢就是打电话，发短信。

但是呢，我们能够打电话的，不仅仅只有手机，在以前还有比较常见的座机，也能够打电话，但是座机并不属于手机这个类目，而是一个单独的类目，因为他不能够发短信，也不能够拿着到处跑。

**那在这种情况下就会出现，不同的类与类之间也会有一些共同的特征，那对于这些公共的特征我们一般会使用接口去抽象，那你可以理解为手机也可以打电话，因为他实现了能够打电话的协议，而座机也能够打电话因为他也实现了这个相同的协议。**

那这里所说的协议呢我们在程序当中就叫做接口，当然如果说你是第一次接受这种概念的话，那可能理解起来会有些吃力，个人的经验就是多思考，多从生活的角度去想，如果实在想不通，更粗暴的办法就是不断的去用，用的过程当中慢慢的去总结规律时间长了自然也就好了。

```js
class Person {
    eat (food: string): void {}
    run (distance: number) {}
}

class Animal {
    eat (food: string): void {}
    run (distance: number) {}
}
```

这里我们来看一个例子，我们定义好了两个类型，分别是Person和Animal，也就是人类和动物类，那他们实际上是两个完全不同的类型，但是他们之间也会有一些相同的特性。例如他们都会吃东西都会跑。

那这种情况下就属于不同的类型实现了一个相同的接口，那可能有人会问，我们为什么不给他们之间抽象一个公共的父类，然后把公共的方法都定义到父类当中。

那这个原因也很简单，虽然人和动物都会吃，都会跑，但是我们说人吃东西和狗吃东西能是一样的么，那他们只是都有这样的能力，而这个能力的实现肯定是不一样的。

那在这种情况下我们就可以使用接口去约束这两个类型之间公共的能力，我们定义一个接口叫做EatAndRun，然后我们在这个接口当中分别去添加eat和run这两个方法成员的约束。

那这里我们就需要使用这种函数签名的方式去约束这两个方法的类型，而我们这里是不做具体的方法实现的。

```js
interface EatAndRun {
    eat (food: string): void;
    run (distance: number): void;
}
```

那这里我们需要注意的一点是，在C#和Java这样的一些语言当中他建议我们尽可能让每一个接口的定义更加简单，更加细化。就是我们EatAndRun这样一个接口当中我们抽象了两个方法，那就相当于抽象了两个能力，那这两个能力必然会同时存在么？是不一定的。

例如说摩托车也会跑，但是就不会吃东西，所以说我们更为合理的就是一个接口只去约束一个能力，然后让一个类型同时去实现多个接口，那这样的话会更加合理一些，那我们这里可以把这个接口拆成一个Eat接口和Run接口，每个接口只有一个成员。

然后我们就可以在类型的后面使用逗号的方式，同时去实现Eat和Run这两个接口。

```js
interface Eat {
    eat (food: string): void;
}

interface Run {
    run (distance: number): void;
}

class Person implements Eat, Run {
    eat (food: string): void {}
    run (distance: number) {}
}
```

那以上呢就是用接口去对类进行一些抽象，那这里再多说一句题外话，就是大家千万不要把自己框死在某一门语言或者是技术上面，最好可以多接触，多学习一些周边的语言或者技术，因为这样的话可以补充你的知识体系。

那最简单来说，一个只了解JavaScript的开发人员，即便说他对JavaScript有多么精通，那他也不可能设计出一些比较高级的产品。

例如我们现在比较主流的一些框架，他们大都采用一些MVVM的这样一些思想，那这些思想呢他实际上最早出现在微软的WPS技术当中的，如果说你有更宽的知识面的话，那你可以更好的把多家的思想融合到一起，所以说我们的视野应该放宽一点。

##### 2.5 抽象类

最后我们再来了解一下抽象类，那抽象类在某种程度上来说跟接口有点类似，那他也是用来约束子类当中必须要有某一个成员。

但是不同于接口的是，抽象类他可以包含一些具体的实现，而接口他只能够是一个成员的一个抽象，他不包含具体的实现。

那一般比较大的类目我们都建议大家使用抽象类，例如我们刚刚所说的动物类，那其实他就应该是抽象的，因为我们所说的动物他只是一个泛指，他并不够具体，那在他的下面一定会有一些更细化的划分，比如说小狗，小猫之类的。

而且我们在生活当中一般都会说我们买了一条狗，或者说买了一只猫，从来没有人说我们买了一个动物。

```js
abstract class Animal {
    eat (food: string): void {}
}
```

我们有一个Animal类型，那他应该像我们刚刚说的那样，被定义成抽象类，定义抽象类的方式就是在class关键词前面添加一个abstract，那这个类型被定义成抽象类过后，他就只能够被继承，不能够再去实例化。

在这种情况下我们就必须使用子类去继承这个抽象类, 这里我们定义一个叫做Dog的类型, 然后我们让他继承自Animal，那在抽象类当中我们还可以去定义一些抽象方法，那这种抽象方法我们可以使用abstract关键词来修饰，我们这里定义一个叫做run的抽象方法, 需要注意的是抽象方法也不需要方法体.

当父类中有抽象方法时，我们的子类就必须要去实现这个方法。

那此时我们再去使用这个子类所创建的对象时，就会同时拥有父类当中的一些实例方法以及自身所实现的方法。那这就是抽象类的基本使用。

```js
abstract class Animal {
    eat (food: string): void {}
    abstract run (distance: number): void;
}

class Dog extends Animal {
    run (distance: number): void {}
}
```

关于抽象类呢，更多的还是去理解他的概念，他在使用上并没有什么复杂的地方。

#### 三、泛型

泛型（Generics）是指在定义函数、接口或者类的时候， 不预先指定其类型，而是在使用时手动指定其类型的一种特性。

比如我们需要创建一个函数， 这个函数会返回任何它传入的值。

```js
function identity(arg: any): any {
  return arg
}

identity(3) // 3
```

这代代码编译不会出错，但是存在一个显而易见的缺陷， 就是没有办法约束输出的类型与输入的类型保持一致。

这时，我们可以使用泛型来解决这个问题；

```js
function identity<T>(arg: T): T {
  return arg
}

identity(3) // 3
```

我们在函数名后面加了 , 其中的 T 表示任意输入的类型， 后面的 T 即表示输出的类型，且与输入保持一致。

当然我们也可以在调用时手动指定输入与输出的类型, 如上述函数指定 string 类型：

```js
identity<number>(3) // 3
```

在泛型函数内部使用类型变量时， 由于事先并不知道它是那种类型， 所以不能随意操作它的属性和方法：

```js
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)   // err 
  return arg
}
```

上述函数中 类型 T 上不一定存在 length 属性， 所以编译的时候就报错了。

这时，我们可以的对泛型进行约束，对这个函数传入的值约束必须包含 length 的属性， 这就是泛型约束:

```js
interface lengthwise {
  length: number
}

function loggingIdentity<T extends lengthwise>(arg: T): T {
  console.log(arg.length)   // err 
  return arg
}

loggingIdentity({a: 1, length: 1})  // 1
loggingIdentity('str') // 3
loggingIdentity(6) // err  传入是参数中未能包含 length 属性
```

这样我们就可以通过泛型约束的方法对函数传入的参数进行约束限制。

多个参数时也可以在泛型约束中使用类型参数

如你声明了一个类型参数， 它被另一类型参数所约束。现在想要用属性名从对象里湖区这个属性。并且还需确保这个属性存在于这个对象上， 因此需要咋这两个类型之间使用约束，

简单举例来说： 定义一个函数， 接受两个参数 第一个是个对象 obj，第二个个参数是第一参数 key 是对象里面的键名， 需要输入 obj[key]

```js
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let obj = { a: 1, b: 2, c: 3 }

getProperty(obj, 'a') // success
getProperty(obj, 'm') // err obj 中不存在 m 这个参数
```

我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用

```js
function createArr<T = string>(length: number, value: T): Array<T> {
  let result: T[] = []
  for( let i = 0; i < lenght; i++ ) {
    result[i] = value
  }
  return result
}
```

简单来说，泛型就是把我们定义时不能够明确的类型变成一个参数，让我们在使用的时候再去传递这样一个类型参数。

#### 四、类型声明

在项目开发过程中我们难免会用到一些第三方的npm模块，而这些npm模块他不一定都是通过TypeScript编写的，所以说他所提供的成员呢就不会有强类型的体验。

比如我们这里安装一个lodash的模块，那这个模块当中就提供了很多工具函数，安装完成过后我们回到代码当中，我们使用ES Module的方式import导入这个模块，我们这里导入的时候TypeScript就已经报出了错误，找不到类型声明的文件，我们暂时忽略。

这里我们提取一下camelCase的函数，那这个函数的作用就是把一个字符串转换成驼峰格式，那他的参数应该是一个string，返回值也应该是一个string，但是我们在调用这个函数逇时候并没有任何的类型提示。

```js
import { camelCase } from 'lodash';

const res = camelCase('hello typed');
```

那在这种情况下我们就需要单独的类型声明，这里我们可以使用detar语句来去声明一下这个函数的类型，具体的语法就是declare function 后面跟上函数签名, 参数类型是input，类型是string，返回值也应该是string

```js
declare function camelCase (input: string ): string;
```

那有了这样一个声明过后，我们再去使用这个camelCase函数。这个时候就会有对应的类型限制了。

那这就是所谓的类型声明，说白了就是一个成员他在定义的时候因为种种原因他没有声明一个明确的类型，然后我们在使用的时候我们可以单独为他再做出一个明确的声明。

那这种用法存在的原因呢，就是为了考虑兼容一些普通的js模块，由于TypeScript的社区非常强大，目前一些比较常用的npm模块都已经提供了对应的声明，我们只需要安装一下它所对应的这个类型声明模块就可以了。

lodash的报错模块已经提示了，告诉我们需要安装一个@types/lodash的模块，那这个模块其实就是我们lodash所对应的类型声明模块，我们可以安装这个模块。安装完成过后，lodash模块就不会报错了。在ts中.d.ts文件都是做类型声明的文件。

除了类型声明模块，现在越来越多的模块已经在内部继承了这种类型的声明文件，很多时候我们都不需要单独安装这种类型声明模块。

例如我们这里安装一个query-string的模块，这个模块的作用就是用来去解析url当中的query-string字符串，那在这个模块当中他就已经包含了类型声明文件。

我们这里直接导入这个模块，我们所导入的这个对象他就直接会有类型约束。

那以上就是对TypeScript当中所使用第三方模块类型声明的介绍。

那这里我们再来总结一下，在TypeScript当中我们去引用第三方模块，如果这个模块当中不包含所对应的类型声明文件，那我们就可以尝试去安装一个所对应的类型声明模块，那这个类型声明模块一般就是@types/模块名。

那如果也没有这样一个对应的类型声明模块，那这种情况下我们就只能自己使用declare语句去声明所对应的模块类型，那对于declare详细的语法这里我们不再单独介绍了，有需要的话可以单独去查询一下官方文档。


<br/>
<br/>
<br/>

转载自：[https://juejin.cn/post/6897779423858737166](https://juejin.cn/post/6897779423858737166)