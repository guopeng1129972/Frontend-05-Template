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

