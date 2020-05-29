---
title: Python知识
date: 2020-05-29 10:55:01
tags:
- Python教程
categories:
- Python
---

##### 1.Python 3.0 在设计的时候没有考虑向下兼容，相对与Python 2.0是一个较大的升级
<!--more-->
##### 2.应用
- Youtube - 视频社交网站
- Reddit - 社交分享网站
- Dropbox - 文件分享服务
- 豆瓣网 - 图书、唱片、电影等文化产品的资料数据库网站
- 知乎 - 一个问答网站
- 果壳 - 一个泛科技主题网站
- Bottle - Python微Web框架
- EVE - 网络游戏EVE大量使用Python进行开发
- Blender - 使用Python作为建模工具与GUI语言的开源3D绘图软件
- Inkscape - 一个开源的SVG矢量图形编辑器。

##### 3.行与缩进
python最具特色的就是使用缩进来表示代码块，不需要使用大括号 {} 。

缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数。

##### 4.多行语句
Python 通常是一行写完一条语句，但如果语句很长，我们可以使用反斜杠(\)来实现多行语句，例如：
```
total = item_one + \
        item_two + \
        item_three
```
在 [], {}, 或 () 中的多行语句，不需要使用反斜杠(\)，例如：
```
total = ['item_one', 'item_two', 'item_three',
        'item_four', 'item_five']
```
##### 5.数字(Number)类型
python中数字有四种类型：整数、布尔型、浮点数和复数。
- int (整数), 如 1, 只有一种整数类型
- int，表示为长整型，没有 python2 中的 Long。
- bool (布尔), 如 True。
- float (浮点数), 如 1.23、3E-2
- complex (复数), 如 1 + 2j、 1.1 + 2.2j

##### 6.字符串(String)
- python中单引号和双引号使用完全相同。
- 使用三引号('''或""")可以指定一个多行字符串。
- 转义符 '\'
- 反斜杠可以用来转义，使用r可以让反斜杠不发生转义。。 如 r"this is a line with \n" 则\n会显示，并不是换行。
- 按字面意义级联字符串，如"this " "is "
- "string"会被自动转换为this is string。
- 字符串可以用 + 运算符连接在一起，用 * 运算符重复。
- Python 中的字符串有两种索引方式，从左往右以 0 开始，从右往左以 -1 开始。
- Python中的字符串不能改变。
- Python 没有单独的字符类型，一个字符就是长度为 1 的字符串。
字符串的截取的语法格式如下：变量[头下标:尾下标:步长]

##### 7.多个语句构成代码组
缩进相同的一组语句构成一个代码块，我们称之代码组。

像if、while、def和class这样的复合语句，首行以关键字开始，以冒号( : )结束，该行之后的一行或多行代码构成代码组。

我们将首行及后面的代码组称为一个子句(clause)。

如下实例：
```
if expression : 
   suite
elif expression : 
   suite 
else : 
   suite
```
##### 8.import 与 from...import
在 python 用 import 或者 from...import 来导入相应的模块。

- 将整个模块(somemodule)导入，格式为： import somemodule
- 从某个模块中导入某个函数,格式为： from somemodule import somefunction
- 从某个模块中导入多个函数,格式为： from somemodule import firstfunc, secondfunc, thirdfunc
- 将某个模块中的全部函数导入，格式为： from somemodule import *

###### 导入 sys 模块
```
import sys
print('================Python import mode==========================')
print ('命令行参数为:')
for i in sys.argv:
    print (i)
print ('\n python 路径为',sys.path)
```
###### 导入 sys 模块的 argv,path 成员
```
from sys import argv,path  #  导入特定的成员
 
print('================python from import===================================')
print('path:',path) # 因为已经导入path成员，所以此处引用时不需要加sys.path
```
##### 9.标准数据类型
Python3 中有六个标准的数据类型：
- Number（数字）
- String（字符串）
- List（列表）
- Tuple（元组）
- Set（集合）
- Dictionary（字典）

Python3 的六个标准数据类型中：

- 不可变数据（3 个）：Number（数字）、String（字符串）、Tuple（元组）；
- 可变数据（3 个）：List（列表）、Dictionary（字典）、Set（集合）。

##### 10.在 Python2 中是没有布尔型的，它用数字 0 表示 False，用 1 表示 True。到 Python3 中，把 True 和 False 定义成关键字了，但它们的值还是 1 和 0，它们可以和数字相加。

##### 11.字符串中反斜杠(\)可以作为续行符，表示下一行是上一行的延续。也可以使用 """...""" 或者 '''...''' 跨越多行。

##### 12.Python 字符串不能被改变。向一个索引位置赋值，比如word[0] = 'm'会导致错误。

##### 13.元组（tuple）与列表类似，不同之处在于元组的元素不能修改。元组写在小括号 () 里，元素之间用逗号隔开。元组中的元素类型也可以不相同。

##### 14.集合（set）是由一个或数个形态各异的大小整体组成的，构成集合的事物或对象称作元素或是成员。基本功能是进行成员关系测试和删除重复元素。可以使用大括号 { } 或者 set() 函数创建集合，注意：创建一个空集合必须用 set() 而不是 { }，因为 { } 是用来创建一个空字典。

##### 15.:= 海象运算符，可在表达式内部为变量赋值。
```
if (n := len(a)) > 10:
    print(f"List is too long ({n} elements, expected <= 10)")
```

##### 16.Python成员运算符
in	如果在指定的序列中找到值返回 True，否则返回 False。	

not in	如果在指定的序列中没有找到值返回 True，否则返回 False。

##### 17.Python身份运算符
is	is 是判断两个标识符是不是引用自一个对象

is not	is not 是判断两个标识符是不是引用自不同对象

##### 18.在整数除法中，除法 / 总是返回一个浮点数，如果只想得到整数的结果，丢弃可能的分数部分，可以使用运算符 //，向下取整后的结果。

##### 19.// 得到的并不一定是整数类型的数，它与分母分子的数据类型有关系。

##### 20.变量在使用前必须先"定义"（即赋予变量一个值），否则会出现错误。

##### 21.随机数函数
函数 | 描述
--|--
choice(seq) | 从序列的元素中随机挑选一个元素，比如random.choice(range(10))，从0到9中随机挑选一个整数。
randrange ([start,] stop [,step]) | 从指定范围内，按指定基数递增的集合中获取一个随机数，基数默认值为 1
random() | 随机生成下一个实数，它在[0,1)范围内。
seed([x]) | 改变随机数生成器的种子seed。如果你不了解其原理，你不必特别去设定seed，Python会帮你选择seed。
shuffle(lst) | 将序列的所有元素随机排序
uniform(x, y) | 随机生成下一个实数，它在[x,y]范围内。

##### 22.数学常量
常量 | 描述
--|--
pi | 数学常量 pi（圆周率，一般以π来表示）
e | 数学常量 e，e即自然常数（自然常数）。

##### 23.Python字符串获取与截取

截取字符串中的一部分，遵循左闭右开原则，str[0:5] 是不包含第 5 个字符的。
```
var1 = 0123456
print ("var1[0]: ", var1[0])
print ("var1[0:5]: ", var1[0:5])

var1[0]: 0
var1[1:5]: 01234
```

##### 24.Python字符串格式化

##### 25.列表
###### 列表中值获取与截取
```
list1 = ['Google', 'Runoob', 1997, 2000];
list2 = [1, 2, 3, 4, 5, 6, 7 ];
 
print ("list1[0]: ", list1[0])
print ("list2[1:5]: ", list2[1:5])
```
###### 删除列表元素
```
list = ['Google', 'Runoob', 1997, 2000]
 
print ("原始列表 : ", list)
del list[2]
print ("删除第三个元素 : ", list)
```
###### 列表函数&方法
函数
```
len(list)
列表元素个数

max(list)
返回列表元素最大值

min(list)
返回列表元素最小值

list(seq)
将元组转换为列表
```
方法
```
list.append(obj)
在列表末尾添加新的对象

list.count(obj)
统计某个元素在列表中出现的次数

list.extend(seq)
在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）

list.index(obj)
从列表中找出某个值第一个匹配项的索引位置

list.insert(index, obj)
将对象插入列表

list.pop([index=-1])
移除列表中的一个元素（默认最后一个元素），并且返回该元素的值

list.remove(obj)
移除列表中某个值的第一个匹配项

list.reverse()
反向列表中元素

list.sort( key=None, reverse=False)
对原列表进行排序

list.clear()
清空列表

list.copy()
复制列表
```
##### 26.元组
Python 的元组与列表类似，不同之处在于元组的元素不能修改。

元组使用小括号，列表使用方括号。

**元组中只包含一个元素时，需要在元素后面添加逗号，否则括号会被当作运算符使用**

元组中的值访问和截取同list列表一样。

元组中的元素值是不允许修改的，但我们可以对元组进行连接组合。

```
tup1 = (12, 34.56)
tup2 = ('abc', 'xyz')
 
# 以下修改元组元素操作是非法的。
# tup1[0] = 100
 
# 创建一个新的元组
tup3 = tup1 + tup2
print (tup3)
```
元组中的元素值是不允许删除的，但我们可以使用del语句来删除整个元组。
```
tup = ('Google', 'Runoob', 1997, 2000)
 
print (tup)
del tup
print ("删除后的元组 tup : ")
print (tup)
```

###### 元组内置函数
```
len(tuple)
计算元组元素个数。	

max(tuple)
返回元组中元素最大值。	

min(tuple)
返回元组中元素最小值。	

tuple(iterable)
将可迭代系列转换为元组。
```

所谓元组的不可变指的是元组所指向的内存中的内容不可变。
```
>>> tup = ('r', 'u', 'n', 'o', 'o', 'b')
>>> tup[0] = 'g'     # 不支持修改元素
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> id(tup)     # 查看内存地址
4440687904
>>> tup = (1,2,3)
>>> id(tup)
4441088800    # 内存地址不一样了
```
从以上实例可以看出，重新赋值的元组 tup，绑定到新的对象了，不是修改了原来的对象。

##### 27.字典
字典是另一种可变容器模型，且可存储任意类型对象。

字典的每个键值(key=>value)对用冒号(:)分割，每个对之间用逗号(,)分割，整个字典包括在花括号({})中。

键必须是唯一的，但值则不必。

值可以取任何数据类型，但键必须是不可变的，如字符串，数字或元组

能删单一的元素也能清空字典，清空只需一项操作。

###### 注意
不允许同一个键出现两次。创建时如果同一个键被赋值两次，后一个值会被记住。

键必须不可变，所以可以用数字，字符串或元组充当，而用列表就不行。

###### 字典内置函数&方法
```
len(dict)
计算字典元素个数，即键的总数。	

str(dict)
输出字典，以可打印的字符串表示。	

type(variable)
返回输入的变量类型，如果变量是字典就返回字典类型。
```
```
radiansdict.clear()
删除字典内所有元素

radiansdict.copy()
返回一个字典的浅复制

radiansdict.fromkeys()
创建一个新字典，以序列seq中元素做字典的键，val为字典所有键对应的初始值

radiansdict.get(key, default=None)
返回指定键的值，如果值不在字典中返回default值

key in dict
如果键在字典dict里返回true，否则返回false

radiansdict.items()
以列表返回可遍历的(键, 值) 元组数组

radiansdict.keys()
返回一个迭代器，可以使用 list() 来转换为列表

radiansdict.setdefault(key, default=None)
和get()类似, 但如果键不存在于字典中，将会添加键并将值设为default

radiansdict.update(dict2)
把字典dict2的键/值对更新到dict里
10	radiansdict.values()
返回一个迭代器，可以使用 list() 来转换为列表

pop(key[,default])
删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值。

popitem()
随机返回并删除字典中的最后一对键和值。
```

##### 28.集合
集合（set）是一个无序的不重复元素序列。

可以使用大括号 { } 或者 set() 函数创建集合，注意：创建一个空集合必须用 set() 而不是 { }，因为 { } 是用来创建一个空字典。

###### 添加元素
```
s.add( x )
```
将元素 x 添加到集合 s 中，如果元素已存在，则不进行任何操作。

还有一个方法，也可以添加元素，且参数可以是列表，元组，字典等，语法格式如下：
```
s.update( x )
```
x 可以有多个，用逗号分开。

###### 删除元素
```
s.remove( x )
```
此外还有一个方法也是移除集合中的元素，且如果元素不存在，不会发生错误。格式如下所示：
```
s.discard( x )
```

可以设置随机删除集合中的一个元素
```
s.pop()
```
set 集合的 pop 方法会对集合进行无序的排列，然后将这个无序排列集合的左面第一个元素进行删除。

###### 计算集合元素个数
```
len(s)
```
###### 清空集合
```
s.clear()
```
###### 判断元素是否在集合中存在
```
x in s
```

###### 集合内置方法
```
add()	为集合添加元素

clear()	移除集合中的所有元素

copy()	拷贝一个集合

difference()	返回多个集合的差集

difference_update()	移除集合中的元素，该元素在指定的集合也存在。

discard()	删除集合中指定的元素

intersection()	返回集合的交集

intersection_update()	返回集合的交集。

isdisjoint()	判断两个集合是否包含相同的元素，如果没有返回 True，否则返回 False。

issubset()	判断指定集合是否为该方法参数集合的子集。

issuperset()	判断该方法的参数集合是否为指定集合的子集

pop()	随机移除元素

remove()	移除指定元素

symmetric_difference()	返回两个集合中不重复的元素集合。

symmetric_difference_update() 移除当前集合中在另外一个指定集合相同的元素，并将另外一个指定集合中不同的元素插入到当前集合中。

union()	返回两个集合的并集

update()	给集合添加元素
```

##### 29.关键字end可以用于将结果输出到同一行，或者在输出的末尾添加不同的字符
```
a, b = 0, 1
while b < 1000:
    print(b, end=',')
    a, b = b, a+b
```
```
1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,
```

##### 30.if语句
```
if condition_1:
    statement_block_1
elif condition_2:
    statement_block_2
else:
    statement_block_3
```

**注意：**

1、每个条件后面要使用冒号 :，表示接下来是满足条件后要执行的语句块。

2、使用缩进来划分语句块，相同缩进数的语句在一起组成一个语句块。

3、在Python中没有switch – case语句。

##### 31.循环语句
###### while 循环
```
while 判断条件(condition)：
    执行语句(statements)……
```
在 Python 中没有 do..while 循环

while 循环使用 else 语句
```
while <expr>:
    <statement(s)>
else:
    <additional_statement(s)>
```

###### for 语句
```
for <variable> in <sequence>:
    <statements>
else:
    <statements>
```
break 语句可用于跳出当前循环体

##### 32.break 和 continue 语句及循环中的 else 子句
break 语句可以跳出 for 和 while 的循环体。如果你从 for 或 while 循环中终止，任何对应的循环 else 块将不执行。

continue 语句被用来告诉 Python 跳过当前循环块中的剩余语句，然后继续进行下一轮循环。

##### 33.pass语句
Python pass是空语句，是为了保持程序结构的完整性。

pass 不做任何事情，一般用做占位语句，如下实例：
```
>>>while True:
...     pass  # 等待键盘中断 (Ctrl+C)
```
```
#!/usr/bin/python3
 
for letter in 'Runoob': 
   if letter == 'o':
      pass
      print ('执行 pass 块')
   print ('当前字母 :', letter)
 
print ("Good bye!")
```
```
当前字母 : R
当前字母 : u
当前字母 : n
执行 pass 块
当前字母 : o
执行 pass 块
当前字母 : o
当前字母 : b
Good bye!
```

##### 34.迭代器与生成器
- 迭代是Python最强大的功能之一，是访问集合元素的一种方式。
- 迭代器是一个可以记住遍历的位置的对象。
- 迭代器对象从集合的第一个元素开始访问，直到所有的元素被访问完结束。迭代器只能往前不会后退。
- 迭代器有两个基本的方法：iter() 和 next()。
- 字符串，列表或元组对象都可用于创建迭代器：

###### 创建一个迭代器
把一个类作为一个迭代器使用需要在类中实现两个方法 \_\_iter\_\_() 与 \_\_next\_\_() 。

面向对象编程,类都有一个构造函数，Python 的构造函数为 \_\_init\_\_(), 它会在对象初始化的时候执行。

\_\_iter\_\_() 方法返回一个特殊的迭代器对象， 这个迭代器对象实现了 \_\_next\_\_() 方法并通过 StopIteration 异常标识迭代的完成。

\_\_next\_\_() 方法（Python 2 里是 next()）会返回下一个迭代器对象。

创建一个返回数字的迭代器，初始值为 1，逐步递增 1:
```
class MyNumbers:
  def __iter__(self):
    self.a = 1
    return self
 
  def __next__(self):
    x = self.a
    self.a += 1
    return x
 
myclass = MyNumbers()
myiter = iter(myclass)
 
print(next(myiter))
print(next(myiter))
print(next(myiter))
print(next(myiter))
print(next(myiter))
```
StopIteration 异常用于标识迭代的完成，防止出现无限循环的情况，在 \_\_next\_\_() 方法中我们可以设置在完成指定循环次数后触发 StopIteration 异常来结束迭代。

###### 生成器
- 在 Python 中，使用了 yield 的函数被称为生成器（generator）。
- 跟普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。
- 在调用生成器运行的过程中，每次遇到 yield 时函数会暂停并保存当前所有的运行信息，返回 yield 的值, 并在下一次执行 next() 方法时从当前位置继续运行。
- 调用一个生成器函数，返回的是一个迭代器对象。

```
import sys
 
def fibonacci(n): # 生成器函数 - 斐波那契
    a, b, counter = 0, 1, 0
    while True:
        if (counter > n): 
            return
        yield a
        a, b = b, a + b
        counter += 1
f = fibonacci(10) # f 是一个迭代器，由生成器返回生成
 
while True:
    try:
        print (next(f), end=" ")
    except StopIteration:
        sys.exit()
```
```
0 1 1 2 3 5 8 13 21 34 55
```

##### 35.函数
- 函数代码块以 def 关键词开头，后接函数标识符名称和圆括号 ()。
- 任何传入参数和自变量必须放在圆括号中间，圆括号之间可以用于定义参数。
- 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。
- 函数内容以冒号起始，并且缩进。
- return [表达式] 结束函数，选择性地返回一个值给调用方。不带表达式的return相当于返回 None。

```
def 函数名（参数列表）:
    函数体
```
##### 36.在 python 中，类型属于对象，变量是没有类型的` 。
```
a=[1,2,3]

a="Runoob"
```
[1,2,3] 是 List 类型，"Runoob" 是 String 类型，而变量 a 是没有类型，她仅仅是一个对象的引用（一个指针），可以是指向 List 类型对象，也可以是指向 String 类型对象。

##### 37.在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list,dict 等则是可以修改的对象。

##### 38.函数参数的使用不需要使用指定顺序，如果函数参数有默认值，调用函数时，如果没有传递参数，则会使用默认参数。

##### 39.匿名函数
python 使用 lambda 来创建匿名函数。

所谓匿名，意即不再使用 def 语句这样标准的形式定义一个函数。

- lambda 只是一个表达式，函数体比 def 简单很多。
- lambda的主体是一个表达式，而不是一个代码块。仅仅能在lambda表达式中封装有限的逻辑进去。
- lambda 函数拥有自己的命名空间，且不能访问自己参数列表之外或全局命名空间里的参数。
- 虽然lambda函数看起来只能写一行，却不等同于C或C++的内联函数，后者的目的是调用小函数时不占用栈内存从而增加运行效率。

```
lambda [arg1 [,arg2,.....argn]]:expression
```
```
#!/usr/bin/python3
 
# 可写函数说明
sum = lambda arg1, arg2: arg1 + arg2
 
# 调用sum函数
print ("相加后的值为 : ", sum( 10, 20 ))
print ("相加后的值为 : ", sum( 20, 20 ))
```

##### 40.数据结构
###### 1.列表
```
list.append(x)  把一个元素添加到列表的结尾，相当于 a[len(a):] = [x]。

list.extend(L)  通过添加指定列表的所有元素来扩充列表，相当于 a[len(a):] = L。

list.insert(i, x)  在指定位置插入一个元素。第一个参数是准备插入到其前面的那个元素的索引，例如 a.insert(0, x) 会插入到整个列表之前，而 a.insert(len(a), x) 相当于 a.append(x) 。

list.remove(x)  删除列表中值为 x 的第一个元素。如果没有这样的元素，就会返回一个错误。

list.pop([i])  从列表的指定位置移除元素，并将其返回。如果没有指定索引，a.pop()返回最后一个元素。元素随即从列表中被移除。（方法中 i 两边的方括号表示这个参数是可选的，而不是要求你输入一对方括号，你会经常在 Python 库参考手册中遇到这样的标记。）

list.clear()  移除列表中的所有项，等于del a[:]。

list.index(x) | 返回列表中第一个值为 x 的元素的索引。如果没有匹配的元素就会返回一个错误。

list.count(x)  返回 x 在列表中出现的次数。

list.sort()  对列表中的元素进行排序。

list.reverse()  倒排列表中的元素。

list.copy()  返回列表的浅复制，等于a[:]。
```

**将列表当做堆栈使用**

列表方法使得列表可以很方便的作为一个堆栈来使用，堆栈作为特定的数据结构，最先进入的元素最后一个被释放（后进先出）。用 append() 方法可以把一个元素添加到堆栈顶。用不指定索引的 pop() 方法可以把一个元素从堆栈顶释放出来。
```
>>> stack = [3, 4, 5]
>>> stack.append(6)
>>> stack.append(7)
>>> stack
[3, 4, 5, 6, 7]
>>> stack.pop()
7
>>> stack
[3, 4, 5, 6]
>>> stack.pop()
6
>>> stack.pop()
5
>>> stack
[3, 4]
```

**将列表当作队列使用**

也可以把列表当做队列用，只是在队列里第一加入的元素，第一个取出来；但是拿列表用作这样的目的效率不高。在列表的最后添加或者弹出元素速度快，然而在列表里插入或者从头部弹出速度却不快（因为所有其他的元素都得一个一个地移动）。

```
>>> from collections import deque
>>> queue = deque(["Eric", "John", "Michael"])
>>> queue.append("Terry")           # Terry arrives
>>> queue.append("Graham")          # Graham arrives
>>> queue.popleft()                 # The first to arrive now leaves
'Eric'
>>> queue.popleft()                 # The second to arrive now leaves
'John'
>>> queue                           # Remaining queue in order of arrival
deque(['Michael', 'Terry', 'Graham'])
```

###### 2.元组与序列
元组在输出时总是有括号的，以便于正确表达嵌套结构。在输入时可能有或没有括号， 不过括号通常是必须的（如果元组是更大的表达式的一部分）。

###### 3.集合
集合是一个无序不重复元素的集。基本功能包括关系测试和消除重复元素。

可以用大括号({})创建集合。注意：如果要创建一个空集合，你必须用 set() 而不是 {} ；后者创建一个空的字典。

```
>>> basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
>>> print(basket)                      # 删除重复的
{'orange', 'banana', 'pear', 'apple'}
>>> 'orange' in basket                 # 检测成员
True
>>> 'crabgrass' in basket
False

>>> # 以下演示了两个集合的操作
...
>>> a = set('abracadabra')
>>> b = set('alacazam')
>>> a                                  # a 中唯一的字母
{'a', 'r', 'b', 'c', 'd'}
>>> a - b                              # 在 a 中的字母，但不在 b 中
{'r', 'd', 'b'}
>>> a | b                              # 在 a 或 b 中的字母
{'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}
>>> a & b                              # 在 a 和 b 中都有的字母
{'a', 'c'}
>>> a ^ b                              # 在 a 或 b 中的字母，但不同时在 a 和 b 中
{'r', 'd', 'b', 'm', 'z', 'l'}
```

###### 4.字典
另一个非常有用的 Python 内建数据类型是字典。

序列是以连续的整数为索引，与此不同的是，字典以关键字为索引，关键字可以是任意不可变类型，通常用字符串或数值。

理解字典的最佳方式是把它看做无序的键=>值对集合。在同一个字典之内，关键字必须是互不相同。

一对大括号创建一个空的字典：{}。

##### 41.模块
模块是一个包含所有你定义的函数和变量的文件，其后缀名是.py。模块可以被别的程序引入，以使用该模块中的函数等功能。这也是使用 python 标准库的方法。

###### import语句
```
import sys
 
print('命令行参数如下:')
for i in sys.argv:
   print(i)
 
print('\n\nPython 路径为：', sys.path, '\n')
```

- 1、import sys 引入 python 标准库中的 sys.py 模块；这是引入某一模块的方法。
- 2、sys.argv 是一个包含命令行参数的列表。
- 3、sys.path 包含了一个 Python 解释器自动查找所需模块的路径的列表。

一个模块只会被导入一次，不管你执行了多少次import。这样可以防止导入模块被一遍又一遍地执行。

###### from … import 语句
Python 的 from 语句让你从模块中导入一个指定的部分到当前命名空间中
```
from modname import name1[, name2[, ... nameN]]
```
```
>>> from fibo import fib, fib2
>>> fib(500)
1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

###### from … import * 语句
把一个模块的所有内容全都导入到当前的命名空间也是可行的
```
from modname import *
```

###### 深入模块
模块除了方法定义，还可以包括可执行的代码。

一般用来初始化这个模块。

每个模块有各自独立的符号表，在模块内部为所有的函数当作全局符号表来使用。

模块是可以导入其他模块的。在一个模块（或者脚本，或者其他地方）的最前面使用 import 来导入一个模块，当然这只是一个惯例，而不是强制的。被导入的模块的名称将被放入当前操作的模块的符号表中。

###### dir() 函数
内置的函数 dir() 可以找到模块内定义的所有名称。以一个字符串列表的形式返回
```
>>> import fibo, sys
>>> dir(fibo)
['__name__', 'fib', 'fib2']
>>> dir(sys)  
['__displayhook__', '__doc__', '__excepthook__', '__loader__', '__name__',
 '__package__', '__stderr__', '__stdin__', '__stdout__',
 '_clear_type_cache', '_current_frames', '_debugmallocstats', '_getframe',
 '_home', '_mercurial', '_xoptions', 'abiflags', 'api_version', 'argv',
 'base_exec_prefix', 'base_prefix', 'builtin_module_names', 'byteorder',
 'call_tracing', 'callstats', 'copyright', 'displayhook',
 'dont_write_bytecode', 'exc_info', 'excepthook', 'exec_prefix',
 'executable', 'exit', 'flags', 'float_info', 'float_repr_style',
 'getcheckinterval', 'getdefaultencoding', 'getdlopenflags',
 'getfilesystemencoding', 'getobjects', 'getprofile', 'getrecursionlimit',
 'getrefcount', 'getsizeof', 'getswitchinterval', 'gettotalrefcount',
 'gettrace', 'hash_info', 'hexversion', 'implementation', 'int_info',
 'intern', 'maxsize', 'maxunicode', 'meta_path', 'modules', 'path',
 'path_hooks', 'path_importer_cache', 'platform', 'prefix', 'ps1',
 'setcheckinterval', 'setdlopenflags', 'setprofile', 'setrecursionlimit',
 'setswitchinterval', 'settrace', 'stderr', 'stdin', 'stdout',
 'thread_info', 'version', 'version_info', 'warnoptions']
```

###### 标准模块
Python 本身带着一些标准的模块库.

有些模块直接被构建在解析器里，这些虽然不是一些语言内置的功能，但是他却能很高效的使用，甚至是系统级调用也没问题。

###### 包
包是一种管理 Python 模块命名空间的形式，采用"点模块名称"。

比如一个模块的名称是 A.B， 那么他表示一个包 A中的子模块 B 。

就好像使用模块的时候，你不用担心不同模块之间的全局变量相互影响一样，采用点模块名称这种形式也不用担心不同库之间的模块重名的情况。

##### 42.Python的输入与输出
Python两种输出值的方式: 表达式语句和 print() 函数。

第三种方式是使用文件对象的 write() 方法，标准输出文件可以用 sys.stdout 引用。

如果你希望输出的形式更加多样，可以使用 str.format() 函数来格式化输出值。

如果你希望将输出的值转成字符串，可以使用 repr() 或 str() 函数来实现。

- str()： 函数返回一个用户易读的表达形式。
- repr()： 产生一个解释器易读的表达形式。

###### 读和写文件
open() 将会返回一个 file 对象
```
open(filename, mode)
```
- filename：包含了你要访问的文件名称的字符串值。
- mode：决定了打开文件的模式：只读，写入，追加等。所有可取值见如下的完全列表。这个参数是非强制的，默认文件访问模式为只读(r)。

```
# 打开一个文件
f = open("/tmp/foo.txt", "w")

f.write( "Python 是一个非常好的语言。\n是的，的确非常好!!\n" )

# 关闭打开的文件
f.close()
```

###### f.read()
为了读取一个文件的内容，调用 f.read(size), 这将读取一定数目的数据, 然后作为字符串或字节对象返回。

size 是一个可选的数字类型的参数。 当 size 被忽略了或者为负, 那么该文件的所有内容都将被读取并且返回。
```
# 打开一个文件
f = open("/tmp/foo.txt", "r")

str = f.read()
print(str)

# 关闭打开的文件
f.close()
```
###### f.readline()
f.readline() 会从文件中读取单独的一行。换行符为 '\n'。f.readline() 如果返回一个空字符串, 说明已经已经读取到最后一行。
```
# 打开一个文件
f = open("/tmp/foo.txt", "r")

str = f.readline()
print(str)

# 关闭打开的文件
f.close()
```
###### f.readlines()
f.readlines() 将返回该文件中包含的所有行。

如果设置可选参数 sizehint, 则读取指定长度的字节, 并且将这些字节按行分割。

```
# 打开一个文件
f = open("/tmp/foo.txt", "r")

str = f.readlines()
print(str)

# 关闭打开的文件
f.close()
```
###### f.write()
f.write(string) 将 string 写入到文件中, 然后返回写入的字符数。
```
# 打开一个文件
f = open("/tmp/foo.txt", "w")

num = f.write( "Python 是一个非常好的语言。\n是的，的确非常好!!\n" )
print(num)
# 关闭打开的文件
f.close()
```
```
# 打开一个文件
f = open("/tmp/foo1.txt", "w")

value = ('www.runoob.com', 14)
s = str(value)
f.write(s)

# 关闭打开的文件
f.close()
```
###### f.tell()
f.tell() 返回文件对象当前所处的位置, 它是从文件开头开始算起的字节数。

###### f.seek()
如果要改变文件当前的位置, 可以使用 f.seek(offset, from_what) 函数。

from_what 的值, 如果是 0 表示开头, 如果是 1 表示当前位置, 2 表示文件的结尾，例如：

- seek(x,0) ： 从起始位置即文件首行首字符开始移动 x 个字符
- seek(x,1) ： 表示从当前位置往后移动x个字符
- seek(-x,2)：表示从文件的结尾往前移动x个字符
from_what 值为默认为0，即文件开头。

###### f.close()
在文本文件中 (那些打开文件的模式下没有 b 的), 只会相对于文件起始位置进行定位。

###### pickle 模块
- python的pickle模块实现了基本的数据序列和反序列化。
- 通过pickle模块的序列化操作我们能够将程序中运行的对象信息保存到文件中去，永久存储。
- 通过pickle模块的反序列化操作，我们能够从文件中创建上一次程序保存的对象。

##### 43.OS 文件/目录方法
os 模块提供了非常丰富的方法用来处理文件和目录。
```
	
os.access(path, mode)
检验权限模式
	
os.chdir(path)
改变当前工作目录
	
os.chflags(path, flags)
设置路径的标记为数字标记。
	
os.chmod(path, mode)
更改权限

os.chown(path, uid, gid)
更改文件所有者
	
os.chroot(path)
改变当前进程的根目录
	
os.close(fd)
关闭文件描述符 fd
	
os.closerange(fd_low, fd_high)
关闭所有文件描述符，从 fd_low (包含) 到 fd_high (不包含), 错误会忽略
	
os.dup(fd)
复制文件描述符 fd

os.dup2(fd, fd2)
将一个文件描述符 fd 复制到另一个 fd2
	
os.fchdir(fd)
通过文件描述符改变当前工作目录
	
os.fchmod(fd, mode)
改变一个文件的访问权限，该文件由参数fd指定，参数mode是Unix下的文件访问权限。
	
os.fchown(fd, uid, gid)
修改一个文件的所有权，这个函数修改一个文件的用户ID和用户组ID，该文件由文件描述符fd指定。
	
os.fdatasync(fd)
强制将文件写入磁盘，该文件由文件描述符fd指定，但是不强制更新文件的状态信息。
	
os.fdopen(fd[, mode[, bufsize]])
通过文件描述符 fd 创建一个文件对象，并返回这个文件对象
	
os.fpathconf(fd, name)
返回一个打开的文件的系统配置信息。name为检索的系统配置的值，它也许是一个定义系统值的字符串，这些名字在很多标准中指定（POSIX.1, Unix 95, Unix 98, 和其它）。
	
os.fstat(fd)
返回文件描述符fd的状态，像stat()。

os.fstatvfs(fd)
返回包含文件描述符fd的文件的文件系统的信息，Python 3.3 相等于 statvfs()。

os.fsync(fd)
强制将文件描述符为fd的文件写入硬盘。
	
os.ftruncate(fd, length)
裁剪文件描述符fd对应的文件, 所以它最大不能超过文件大小。

os.getcwd()
返回当前工作目录

os.getcwdu()
返回一个当前工作目录的Unicode对象

os.isatty(fd)
如果文件描述符fd是打开的，同时与tty(-like)设备相连，则返回true, 否则False。

os.lchflags(path, flags)
设置路径的标记为数字标记，类似 chflags()，但是没有软链接
	
os.lchmod(path, mode)
修改连接文件权限

os.lchown(path, uid, gid)
更改文件所有者，类似 chown，但是不追踪链接。

os.link(src, dst)
创建硬链接，名为参数 dst，指向参数 src
	
os.listdir(path)
返回path指定的文件夹包含的文件或文件夹的名字的列表。

os.lseek(fd, pos, how)
设置文件描述符 fd当前位置为pos, how方式修改: SEEK_SET 或者 0 设置从文件开始的计算的pos; SEEK_CUR或者 1 则从当前位置计算; os.SEEK_END或者2则从文件尾部开始. 在unix，Windows中有效
	
os.lstat(path)
像stat(),但是没有软链接
	
os.major(device)
从原始的设备号中提取设备major号码 (使用stat中的st_dev或者st_rdev field)。
	
os.makedev(major, minor)
以major和minor设备号组成一个原始设备号

os.makedirs(path[, mode])
递归文件夹创建函数。像mkdir(), 但创建的所有intermediate-level文件夹需要包含子文件夹。
	
os.minor(device)
从原始的设备号中提取设备minor号码 (使用stat中的st_dev或者st_rdev field )。
	
os.mkdir(path[, mode])
以数字mode的mode创建一个名为path的文件夹.默认的 mode 是 0777 (八进制)。
	
os.mkfifo(path[, mode])
创建命名管道，mode 为数字，默认为 0666 (八进制)
	
os.mknod(filename[, mode=0600, device])
创建一个名为filename文件系统节点（文件，设备特别文件或者命名pipe）。

os.open(file, flags[, mode])
打开一个文件，并且设置需要的打开选项，mode参数是可选的
	
os.openpty()
打开一个新的伪终端对。返回 pty 和 tty的文件描述符。
	
os.pathconf(path, name)
返回相关文件的系统配置信息。

os.pipe()
创建一个管道. 返回一对文件描述符(r, w) 分别为读和写
	
os.popen(command[, mode[, bufsize]])
从一个 command 打开一个管道
	
os.read(fd, n)
从文件描述符 fd 中读取最多 n 个字节，返回包含读取字节的字符串，文件描述符 fd对应文件已达到结尾, 返回一个空字符串。
	
os.readlink(path)
返回软链接所指向的文件

os.remove(path)
删除路径为path的文件。如果path 是一个文件夹，将抛出OSError; 查看下面的rmdir()删除一个 directory。
	
os.removedirs(path)
递归删除目录。
	
os.rename(src, dst)
重命名文件或目录，从 src 到 dst
	
os.renames(old, new)
递归地对目录进行更名，也可以对文件进行更名。
	
os.rmdir(path)
删除path指定的空目录，如果目录非空，则抛出一个OSError异常。

os.stat(path)
获取path指定的路径的信息，功能等同于C API中的stat()系统调用。
	
os.stat_float_times([newvalue])
决定stat_result是否以float对象显示时间戳

os.statvfs(path)
获取指定路径的文件系统统计信息

os.symlink(src, dst)
创建一个软链接
	
os.tcgetpgrp(fd)
返回与终端fd（一个由os.open()返回的打开的文件描述符）关联的进程组
	
os.tcsetpgrp(fd, pg)
设置与终端fd（一个由os.open()返回的打开的文件描述符）关联的进程组为pg。

os.tempnam([dir[, prefix]])
Python3 中已删除。返回唯一的路径名用于创建临时文件。

os.tmpfile()
Python3 中已删除。返回一个打开的模式为(w+b)的文件对象 .这文件对象没有文件夹入口，没有文件描述符，将会自动删除。
	
os.tmpnam()
Python3 中已删除。为创建一个临时文件返回一个唯一的路径
	
os.ttyname(fd)
返回一个字符串，它表示与文件描述符fd 关联的终端设备。如果fd 没有与终端设备关联，则引发一个异常。
	
os.unlink(path)
删除文件路径
	
os.utime(path, times)
返回指定的path文件的访问和修改的时间。

os.walk(top[, topdown=True[, onerror=None[, followlinks=False]]])
输出在文件夹中的文件名通过在树中游走，向上或者向下。
	
os.write(fd, str)
写入字符串到文件描述符 fd中. 返回实际写入的字符串长度
	
os.path 模块
获取文件的属性信息。
```
##### 44.错误和异常
Python 有两种错误很容易辨认：语法错误（解析错）和异常。

Python assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。

###### 异常处理
try/except
```
while True:
    try:
        x = int(input("请输入一个数字: "))
        break
    except ValueError:
        print("您输入的不是数字，请再次尝试输入！")
```
try/except...else

try/except 语句还有一个可选的 else 子句，如果使用这个子句，那么必须放在所有的 except 子句之后。

else 子句将在 try 子句没有发生任何异常的时候执行。

```
for arg in sys.argv[1:]:
    try:
        f = open(arg, 'r')
    except IOError:
        print('cannot open', arg)
    else:
        print(arg, 'has', len(f.readlines()), 'lines')
        f.close()
```
try-finally 语句

try-finally 语句无论是否发生异常都将执行最后的代码。
```
try:
    runoob()
except AssertionError as error:
    print(error)
else:
    try:
        with open('file.log') as file:
            read_data = file.read()
    except FileNotFoundError as fnf_error:
        print(fnf_error)
finally:
    print('这句话，无论异常是否发生都会执行。')
```

抛出异常

Python 使用 raise 语句抛出一个指定的异常。
```
raise [Exception [, args [, traceback]]]
```
```
x = 10
if x > 5:
    raise Exception('x 不能大于 5。x 的值为: {}'.format(x))
```

##### 45.命名空间和作用域
- 内置名称（built-in names）， Python 语言内置的名称，比如函数名 abs、char 和异常名称 BaseException、Exception 等等。
- 全局名称（global names），模块中定义的名称，记录了模块的变量，包括函数、类、其它导入的模块、模块级的变量和常量。
- 局部名称（local names），函数中定义的名称，记录了函数的变量，包括函数的参数和局部定义的变量。（类中定义的也是）

![python001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/python001.jpg)

###### 命名空间查找顺序:
局部的命名空间去 -> 全局命名空间 -> 内置命名空间。
###### 命名空间的生命周期：
命名空间的生命周期取决于对象的作用域，如果对象执行完成，则该命名空间的生命周期就结束。

因此，我们无法从外部命名空间访问内部命名空间的对象。

###### 作用域
- L（Local）：最内层，包含局部变量，比如一个函数/方法内部。
- E（Enclosing）：包含了非局部(non-local)也非全局(non-global)的变量。比如两个嵌套函数，一个函数（或类） A 里面又包含了一个函数 B ，那么对于 B 中的名称来说 A 中的作用域就为 nonlocal。
- G（Global）：当前脚本的最外层，比如当前模块的全局变量。
- B（Built-in）： 包含了内建的变量/关键字等。，最后被搜索

规则顺序： L –> E –> G –>gt; B。

![python002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/python002.jpg)

###### global 和 nonlocal关键字
当内部作用域想修改外部作用域的变量时，就要用到global和nonlocal关键字
```
num = 1
def fun1():
    global num  # 需要使用 global 关键字声明
    print(num) 
    num = 123
    print(num)
fun1()
print(num)
```

如果要修改嵌套作用域（enclosing 作用域，外层非全局作用域）中的变量则需要 nonlocal 关键字了

```
def outer():
    num = 10
    def inner():
        nonlocal num   # nonlocal关键字声明
        num = 100
        print(num)
    inner()
    print(num)
outer()
```

##### 46.标准库
###### 操作系统接口
os模块提供了不少与操作系统相关联的函数。

###### 文件通配符
glob模块提供了一个函数用于从目录通配符搜索中生成文件列表

###### 命令行参数
通用工具脚本经常调用命令行参数。这些命令行参数以链表形式存储于 sys 模块的 argv 变量。

###### 字符串正则匹配
re模块为高级字符串处理提供了正则表达式工具。

###### 数学
math模块为浮点运算提供了对底层C函数库的访问

###### 访问 互联网
有几个模块用于访问互联网以及处理网络通信协议。其中最简单的两个是用于处理从 urls 接收的数据的 urllib.request 以及用于发送电子邮件的 smtplib

###### 日期和时间
datetime模块为日期和时间处理同时提供了简单和复杂的方法。

支持日期和时间算法的同时，实现的重点放在更有效的处理和格式化输出。

###### 数据压缩
以下模块直接支持通用的数据打包和压缩格式：zlib，gzip，bz2，zipfile，以及 tarfile。

###### 性能度量
有些用户对了解解决同一问题的不同方法之间的性能差异很感兴趣。Python 提供了一个度量工具，为这些问题提供了直接答案。

例如，使用元组封装和拆封来交换元素看起来要比使用传统的方法要诱人的多,timeit 证明了现代的方法更快一些。

###### 测试模块
开发高质量软件的方法之一是为每一个函数开发测试代码，并且在开发过程中经常进行测试

doctest模块提供了一个工具，扫描模块并根据程序中内嵌的文档字符串执行测试。

测试构造如同简单的将它的输出结果剪切并粘贴到文档字符串中。

通过用户提供的例子，它强化了文档，允许 doctest 模块确认代码的结果是否与文档一致。

