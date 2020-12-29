# 1. 重学HTML | HTML的定义：XML与SGML
- HTML的定义：继承与XML与SGML的基础
## DTD与XML namespace

- http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd 
  - 使用css属性white-space代替`&nbsp;`,因为使用`&nbsp;`改变了原有的HTML语义结构
  - white-space 属性会影响到浏览器对文档中空格、回车和制表符的处理效果。
  - `&Lambda`就是`^`
- http://www.w3.org/1999/xhtml

## DTD 常用转义符
| 字符	| 十进制 | 转义字符 |
| ---- | ----- | ------ |
| " |	`&#34;` |	`&quot;` |
| &	| `&#38;`	| `&amp;` |
| <	| `&#60;`	| `&lt; `|
| >	| `&#62;`	| `&gt; `|
| 不断开空格(non-breaking space) | `&#160;` |	`&nbsp;` |