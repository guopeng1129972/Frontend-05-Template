学习笔记
# 1. JS表达式 | 运算符和表达式

## Atom

Grammar(语法) | Runtiome(运行时) |
-------------- | --------------- |

## Grammar(语法)
* Tree vs Priority
## Expressions（表达式）

### Member
#### Member级别的运算符
* a.b
* a`[b]`
* foo`string`  
*//foo加反引号字符串*

在class关键字中可以使用的super
* super.b
* super[`b`]    
*//super[反引号字符串]*
* new.target
* new Foo()

#### New级别的运算符
new foo
带括号的new运算级更高
Example:
new a()()
第一个括号跟着new运算，因为跟着new运算符的()优先级更高
new new a()
同理a后面的运算符也是跟着第二个new的
#### Reference（引用类型） 补充
reference是运行中的类型，形如a.b的调用过程中，并非调用
a.b本身，而是调用a.b的引用，一个内存地址，这个引用类型并
非JS语言中的类型 ，而是运行时的类型，就是 reference

一个reference分成两个部分Object(js中的Object)和key(string or symbol)

* delete
* assign(+= -= *= /=)

js就是用引用类型在运行时来处理删除或者赋值这样的写相关操作的

### Expression-Call(函数调用)
运算优先级低于new 也低于Member运算
* foo()
* super()
* foo().b
* foo()`abc`
*foo()后跟反引号abc*

Example

new a()['b']
还是优先级 new加()最高，['b']也是Member级别
但是由于new的操作 降级成为new运算完之后的运算处理
所以可以解释为 new a() 之后调用其['b']属性

***可不可以理解为这三者优先级在一个级别上，从左往右算？***
Expression-Member-new
Expression-Member-其他
Expression-Call

### Expression-Left Handside & Right Handside(左手运算与右手运算)

#### Left Handside
a.b=c
#### Right Handside
不能放到=左边的
a+b=c 这是一个Right Handside 但是这样写不正确
Left Handside一定是Right Handside
### Expression-Update(自增自减)
自Expression-Update之后就是Right Handside
* a++
* a--
* --a
* ++a

example
++ a ++
因为这是Right Handside，所以会先和后面运算
在console中，会报错，这个报错跟优先级也没关系，不管谁先，都是错误
<font color=#FF0000>*VM522:1 Uncaught SyntaxError: Invalid left-hand side expression in postfix operation*</font> 

### Expression-Unary(单目运算符)
* delete a.b
delete 后面跟的是Reference（引用类型）
* void foo()
void 后面跟什么都返回Undefind,相当于js中的回车 换行
* typeof a
* + a
* - a
* ~ a
位运算符，整数按位取反
* ! a
针对bool的取反运算 
<font color=#FF0000>!! 强制把一个值转换成为bool值</font> 

* await a
### Expression-Exponental(乘方)
* `**`
唯一一个右结合的运算符

example
```js
3 ** 2 ** 3 //先算2的3次方，然后算3的8次方
```
### Expression-Multiplicative Additive Shift Relationship
* Multiplicative
`* / %`
* Additive
` + -`
* Shift
`<<` 
`>>`
`>>>`
* Relationship
< > <= >= instanceof
in
### Expression-Equality()
* ==
类型相等 就是相等
* ===
* !=
* !==
### Expression-Bitwise()
* & ^ | 
### Expression-Logical(逻辑运算符)
* &&
* ||
### Expression-Conditional(三目运算符)
* ?:
<font color=#FF0000>
Logical Conditional 都有短路优先原则，即前面的判断条件可以判断出结果就不会进行后面的运算
</font>