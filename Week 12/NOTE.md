

# 1. CSS排版 | 盒
| 源代码 | 语义 | 表现 |
| ---- | ----- | ---- |
| 标签 tag | 元素 element | 盒 box

- HTML代码可以书写开始`标签`,结束`标签`,和自封闭`标签`。
- 一对起止的`标签`，表示一个`元素`。
- DOM树中储存的是`元素`和其他类型的节点（Node）。
  - 节点说的是，存储在DOM上的也不一定是元素，比如文本节点，等。
- CSS选择器选中的是`元素`。
  - 也可以是伪元素。
- CSS选择器选中的`元素`，在排版时可能产生多个`盒`.
  - 可能是一对多的选择
- 排版和渲染的基本单位是`盒`。

## 盒模型

![盒模型](img/1.jpg)

- padding主要影响盒内排版
- margin主要影响盒本身排版
- box-size:
   - content-box
     - 设置的width只包含content的内容，这个时候盒子占用的空间为content-box+padding+border+margin
  - border-box
    - 包含padding+border+content-box

