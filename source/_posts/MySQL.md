---
title: MySQL
date: 2020-06-19 16:09:06
tags:
- MySQL
- 数据库
categories:
- 数据库
---
#### 1.启动数据库
<!--more-->
以Mac下启动数据库为例

```
mysql.server start
```

#### 2.停止数据库

以Mac下启动数据库为例

```
mysql.server stop

```

#### 3.重启数据库

以Mac下启动数据库为例

```
mysql.server restart
```



#### 4.连接数据库

Mac下连接数据库

```
[root@host]# mysql -u root -p
Enter password:******
```

#### 5.退出数据库

```
mysql> exit
Bye
```

#### 6.创建数据库

```
create database 数据库名;
```

```
mysql> create database alivn;
```

#### 7.删除数据库

```
drop database <数据库名>;
```

```
mysql> drop database alivn;
```

#### 8.显示所有数据库list

```
mysql> show databases;
```

#### 9.选择数据库

```
mysql> use alivn;
```

#### 10.数据类型

##### 数值

类型 | 大小 | 范围（有符号） | 范围（无符号） | 用途
-- | -- | -- | -- | --
TINYINT | 1 byte | (-128，127) | (0，255) | 小整数值
SMALLINT | 2 bytes | (-32 768，32 767) | (0，65 535) | 大整数值
MEDIUMINT | 3 bytes | (-8 388 608，8 388 607) | (0，16 777 215) | 大整数值
INT或INTEGER | 4 bytes | (-2 147 483 648，2 147 483 647) | (0，4 294 967 295) | 大整数值
BIGINT | 8 bytes | (-9,223,372,036,854,775,808，9 223 372 036 854 775 807) | (0，18 446 744 073 709 551 615) | 极大整数值
FLOAT | 4 bytes | (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38) | 0，(1.175 494 351 E-38，3.402 823 466 E+38) | 单精度
浮点数值
DOUBLE | 8 bytes | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 双精度
浮点数值
DECIMAL | 对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 | 依赖于M和D的值 | 依赖于M和D的值 | 小数值


##### 日期/时间

类型 | 大小( bytes) | 范围 | 格式 | 用途
-- | -- | -- | -- | --
DATE | 3 | 1000-01-01/9999-12-31 | YYYY-MM-DD | 日期值
TIME | 3 | '-838:59:59'/'838:59:59' | HH:MM:SS | 时间值或持续时间
YEAR | 1 | 1901/2155 | YYYY | 年份值
DATETIME | 8 | 1000-01-01 00:00:00/9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值
TIMESTAMP | 4 | 1970-01-01 00:00:00/2038 结束时间是第 2147483647 秒，北京时间 2038-1-19 11:14:07，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYYMMDD HHMMSS | 混合日期和时间值，时间戳

##### 字符串(字符)类型

类型 | 大小 | 用途
--  | -- | --
CHAR | 0-255 bytes | 定长字符串
VARCHAR | 0-65535 bytes | 变长字符串
TINYBLOB | 0-255 bytes | 不超过 255 个字符的二进制字符串
TINYTEXT | 0-255 bytes | 短文本字符串
BLOB | 0-65 535 bytes | 二进制形式的长文本数据
TEXT | 0-65 535 bytes | 长文本数据
MEDIUMBLOB | 0-16 777 215 bytes | 二进制形式的中等长度文本数据
MEDIUMTEXT | 0-16 777 215 bytes | 中等长度文本数据
LONGBLOB | 0-4 294 967 295 bytes | 二进制形式的极大文本数据
LONGTEXT | 0-4 294 967 295 bytes | 极大文本数据

#### 11.创建数据表

```
CREATE TABLE table_name (column_name column_type);
```

```
mysql> CREATE TABLE IF NOT EXISTS `user`(
   `no_id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `department` VARCHAR(40) NOT NULL,
   `entry_time` DATE,
   `departure_time` DATE,
   PRIMARY KEY ( `no_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

```
如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。
AUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。
PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
ENGINE 设置存储引擎，CHARSET 设置编码。
```

```
注意：MySQL命令终止符为分号 ; 。
注意： -> 是换行符标识，不要复制。
```
#### 12.显示所有数据表list

```
mysql> show tables;
```

#### 10.查看表详情

```
desc <数据表名称>;
```

```
mysql> desc user;
```

```
describe <数据表名称>;
```

```
mysql> describe user;
```

```
explain <数据表名称>;
```

```
mysql> explain user;
```

```
--显示当前数据库下的所有表
show tables;
--显示当前数据库下匹配到d的表
show tables like '%d%';
--显示demo数据库下全部表名称
show tables from demo;
--显示demo数据库下表名含有d的表
show tables from demo like '%d%';
--显示student表的详细信息
show create table student;
desc student;
describe student;
explain student;
--显示表student所有列信息
show columns from student;
--显示表student包含d的列信息
show columns from student like '%d%';
--显示demo数据库所有表的信息
show table status from demo；
--显示demo数据库表名包含d的所有表信息
show table status from demo like "%d%";
```
#### 13.删除数据表

```
DROP TABLE <数据表名>;
```

```
mysql> DROP TABLE user
```

#### 14.插入数据

```
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
```

```
mysql> INSERT INTO user_list
    -> (no_id, name, entry_time, department_time)
    -> VALUES
    -> ("001", "alivn", NOW(), NOW());
```

#### 15.查询表数据

```
SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[LIMIT N][ OFFSET M]
```

```
查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。
SELECT 命令可以读取一条或者多条记录。
你可以使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据
你可以使用 WHERE 语句来包含任何条件。
你可以使用 LIMIT 属性来设定返回的记录数。
你可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。
```

查看表所有数据

```
select * from user_list;
```

#### 16.WHERE 子句

```
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
[WHERE condition1 [AND [OR]] condition2.....
```

```
查询语句中你可以使用一个或者多个表，表之间使用逗号, 分割，并使用WHERE语句来设定查询条件。
你可以在 WHERE 子句中指定任何条件。
你可以使用 AND 或者 OR 指定一个或多个条件。
WHERE 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
WHERE 子句类似于程序语言中的 if 条件，根据 MySQL 表中的字段值来读取指定的数据。
```

```
SELECT * from user_list WHERE name='alivn';
```

WHERE 子句的字符串比较是不区分大小写的。 你可以使用 BINARY 关键字来设定 WHERE 子句的字符串比较是区分大小写的。

```
SELECT * from runoob_tbl WHERE BINARY runoob_author='runoob.com';
```

#### 17.UPDATE 更新数据

```
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]
```

```
你可以同时更新一个或多个字段。
你可以在 WHERE 子句中指定任何条件。
你可以在一个单独表中同时更新数据。
```

```
UPDATE user_list SET name='momo' WHERE no_id=001;
```

#### 18.DELETE 删除数据

```
DELETE FROM table_name [WHERE Clause]
```

```
如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除。
你可以在 WHERE 子句中指定任何条件
您可以在单个表中一次性删除记录。
```

```
DELETE FROM user_list WHERE no_id=001;
```

#### 19.LIKE 子句

```
SELECT field1, field2,...fieldN 
FROM table_name
WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
```

```
你可以在 WHERE 子句中指定任何条件。
你可以在 WHERE 子句中使用LIKE子句。
你可以使用LIKE子句代替等号 =。
LIKE 通常与 % 一同使用，类似于一个元字符的搜索。
你可以使用 AND 或者 OR 指定一个或多个条件。
你可以在 DELETE 或 UPDATE 命令中使用 WHERE...LIKE 子句来指定条件。
```

```
SELECT * from runoob_tbl  WHERE runoob_author LIKE '%COM';
```

#### 20.UNION 操作符

MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。

```
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions]
UNION [ALL | DISTINCT]
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions];
```

```
expression1, expression2, ... expression_n: 要检索的列。

tables: 要检索的数据表。

WHERE conditions: 可选， 检索条件。

DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。

ALL: 可选，返回所有结果集，包含重复数据。
```

#### 21.排序

```
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]
```

```
你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。
你可以设定多个字段来排序。
你可以使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列。
你可以添加 WHERE...LIKE 子句来设置条件。
```

```
SELECT * from runoob_tbl ORDER BY submission_date ASC;
```

#### 22.GROUP BY 语句

```
SELECT column_name, function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;
```

```
SELECT name, COUNT(*) FROM   user_list GROUP BY name;
```

#### 23.连接的使用

##### INNER JOIN
```
INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
RIGHT JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。
```

```
SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a INNER JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;
```

```
SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a, tcount_tbl b WHERE a.runoob_author = b.runoob_author;
```

![mysql001](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mysql001.jpg)

##### LEFT JOIN

```
SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a LEFT JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;
```

![mysql002](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mysql002.jpg)


##### RIGHT JOIN

```
SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a RIGHT JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;
```

![mysql003](http://alivnram-test.oss-cn-beijing.aliyuncs.com/alivnblog/mysql003.jpg)


#### 24.NULL 值处理

SQL SELECT 命令及 WHERE 子句来读取数据表中的数据,但是当提供的查询条件字段为 NULL 时，该命令可能就无法正常工作。

```
IS NULL: 当列的值是 NULL,此运算符返回 true。
IS NOT NULL: 当列的值不为 NULL, 运算符返回 true。
<=>: 比较操作符（不同于 = 运算符），当比较的的两个值相等或者都为 NULL 时返回 true。
```

```
mysql> INSERT INTO user_list (runoob_author, runoob_count) values ('RUNOOB', 20);
mysql> INSERT INTO runoob_test_tbl (runoob_author, runoob_count) values ('Google', NULL);
```

查找数据表中 runoob_test_tbl 列是否为 NULL，必须使用 IS NULL 和 IS NOT NULL

```
SELECT * FROM runoob_test_tbl WHERE runoob_count IS NULL;
```

##### 25.正则表达式

```
SELECT name FROM person_tbl WHERE name REGEXP '^st';
```

```
mysql> SELECT name FROM person_tbl WHERE name REGEXP 'ok$';
```

#### 26.事务

#### 27.ALTER命令

当我们需要修改数据表名或者修改数据表字段时，就需要使用到MySQL ALTER命令。

删除表字段
```
mysql> ALTER TABLE user_list  DROP name;
```

增加表字段
```
mysql> ALTER TABLE testalter_tbl ADD i INT;

ALTER TABLE testalter_tbl DROP i;

ALTER TABLE testalter_tbl ADD i INT FIRST;

ALTER TABLE testalter_tbl DROP i;

ALTER TABLE testalter_tbl ADD i INT AFTER c;

```

修改字段类型及名称
```
mysql> ALTER TABLE testalter_tbl MODIFY c CHAR(10);
```

```
ALTER TABLE testalter_tbl CHANGE i j BIGINT;
```

```
mysql> ALTER TABLE testalter_tbl CHANGE j j INT;
```

修改表名
```
ALTER TABLE testalter_tbl RENAME TO alter_tbl;
```

