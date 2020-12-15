学习笔记

# 1. CSS总论 | CSS语法的研究

 
## css2.1 css总体结构
- @charset
- @import
- rules
  - @media
  - @page
  - rule

# 2. CSS总论 | CSS @规则的研究
- @charset : https://www.w3.org/TR/css-syntax-3/
  - 声明CSS的字符集
- @import :https://www.w3.org/TR/css-cascade-4/
  - css cascade 级联规则标准 级联样式表(cascading style sheet)
- `@media` :https://www.w3.org/TR/css3-conditional/
  - 重要： css3-conditional（css3 有条件发生）media query 是一个预制好的函数（查询媒体的一个规范）
- @page : https://www.w3.org/TR/css-page-3/
  - css3 分页媒体标准（打印机）
- @counter-style :https://www.w3.org/TR/css-counter-styles-3 
  - css前的小黑点
- `@keyframes` :https://www.w3.org/TR/css-animations-1/
  - 重要：css动画标准
- `@fontface `:https://www.w3.org/TR/css-fonts-3/
  - 重要 ：定义一切字体（不止webfont 衍生体 icon font）
- @supports :https://www.w3.org/TR/css3-conditional/
  - 不推荐
- @namespace :https://www.w3.org/TR/css-namespaces-3/
  - css命名空间

# 3. CSS总论 | CSS规则的结构

## CSS规则
```css
div {
  background-color: blue;
}
```
- 选择器 Selector
  - https://www.w3.org/TR/selectors-3/ 
  - https://www.w3.org/TR/selectors-4/
- 声明 Declaration
  - Key
    - Properties
    - Variables: https://www.w3.org/TR/css-variables/
  - Value
    - https://www.w3.org/TR/css-values-4/

# 4. CSS总论 | 收集标准

## 爬取css网站信息
- https://www.w3.org/TR/?tag=css
```js
  Array.prototype.slice.call(document.querySelector('#container').children).filter(e => e.getAttribute('data-tag').match(/css/)).map(e => ({
    name: e.children[1].innerText,
    url: e.children[1].children[0].href
  }))
```
也不难 学学
```js
 //1
 Array.prototype.slice.call(`$2`)
 //2
 document.querySelector('#container').children
 //3
 `$1`.filter(`$4`)
 //4
 e => e.getAttribute('data-tag').match(/css/)).map(`$5`)
 //5
 e => ({
    name: e.children[1].innerText,
    url: e.children[1].children[0].href})
```
### 要点
```js
// 同域 访问iframe.contentDocument
iframe.contentDocument.querySelectorAll(".propdef")
```
# 5. CSS总论 | CSS总论总结

- CSS语法
- at-rule
- selector
- variables
- value
- 实验