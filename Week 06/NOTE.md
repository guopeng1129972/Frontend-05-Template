学习笔记

# 1. JS语言通识 | 泛用语言分类方法

乔姆斯基谱系：是计算机科学中刻画形式文法表达能力的一个分类谱系，
是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：
0- 型文法（无限制文法或短语结构文法）包括所有的文法。
1- 型文法（上下文相关文法）生成上下文相关语言。
2- 型文法（上下文无关文法）生成上下文无关语言。
3- 型文法（正规文法）生成正则语言。

###### 一种语言的分类方法

# 2. JS语言通识 | 什么是产生式

产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
引号和中间字符表示终结符
可以有括号
*表示重复多次
|表示或
+表示至少一次
巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。

终结符： 最终在代码中出现的字符（ https://zh.wikipedia.org/wiki/ 終結符與非終結符)

## 练习：编写带括号的四则运算产生式
```html
1+2*(3/4)
1+2*3
AdditiveExpression
Expression
MultiplicativeExpression

<!-- 带括号的产生式 -->
<!-- 1 描述括号 -->
<Expression>::=<MultiplicativeExpression>|"("<AdditiveExpression>")"
<!-- 1 描述运算 -->
<ArithmeticExpression>::=<Expression>"+"<Expression>|
<Expression>"-"<Expression>|
<Expression>"*"<Expression>|
<Expression>"/"<Expression>|


<MultiplicativeExpression>::=<Number>|
  <MultiplicativeExpression>"*"<Number>|
  <MultiplicativeExpression>"/"<Number>|

<AdditiveExpression>::=<Number>|
  <MultiplicativeExpression>"*"<MultiplicativeExpression>|
  <MultiplicativeExpression>"/"<MultiplicativeExpression>|
  <AdditiveExpression>"+"<MultiplicativeExpression>|
  <AdditiveExpression>"-"<MultiplicativeExpression>|
```

# 3. JS语言通识 | 深入理解产生式

0型 无限制文法
  ?::?
1型 上下文无关文法
  ?\<A\>?::?\<B\>?
2型 上下文相关文法
  \<A\>::?
3型 正则文法
  \<A\>::=\<A\>?
  \<A\>::=?\<A\> ❌

**JS是什么文法？**

整体上是上下文无关文法，具体涉及上下文有关的时候，会特殊处理为上下文相关文法（函数定义）
示例
```js
//，上下文无关文法反例，重新定义get
{
  get a{return 1};
  get:1
}

//非正则文法的反例，乘方运算符 示例为先算运算符右侧 先算1的平方，再算2的1次方， 结果为2 
//这块应该在底层 ** 的结果是作为参数进行计算的 所以需要先算出这个，才能继续
2 ** 1 ** 2 // 2
```

# 4. JS语言通识 | 现代语言的分类

上下文相关文法的特点
比如在vb中，\<可能是XML的开始，也可能是小于号，这取决于当前的使用环境，所以这是上下文相关文法的特点

语言的分类
形式语言-用途
*  数据描述语言 html css json
*  编程语言  c js ruby
形式语言-表达方式
*  声明式语言 html css json
*  命令型语言  c js ruby 

# 5. JS语言通识 | 编程语言的性质

**图灵完备性**
>命令式--图灵机
>>goto
>>if和while

>声明式--lambda
>>递归

**动态与静态**
* 动态
>>在用户的设备上\/在线服务器上运行
>>产品实际运行时
>>Runtime

* 静态:
>>在程序员的设备上
>>产品开发时
>>Compiletime

**类型系统**
* 动态类型与静态类型系统
* 强类型与弱类型系统
这里强弱类型是值 能不能在某种场景下完成类型转换
* 复合类型
>>结构体
>>函数签名
>>>参数类型（type:list）
>>>返回值类型
* 子类型
* 泛型
>>逆变\/协变