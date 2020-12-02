# 1. HTML解析 | HTML parse模块的文件拆分
## 第一步 文件拆分
- 为了方便文件管理，我们把parser单独拆分到文件中
```js
// client.js
const parser=require('./parser.js');
```
- parser接收HTML文本作为参数，返回一棵DOM树
```js
void async function () {
  //...
 let dom=parser.parseHTML(response.body);
```
# 2. HTML解析 | 用FSM实现HTML的分析

## 第二步 用FSM实现HTML的分析

- 我们用FSM来实现HTML的分析
- 在HTML标准中，已经规定了HTML的状态
- Toy-Borwser只挑选其中一部分状态，完成一个简易版本
