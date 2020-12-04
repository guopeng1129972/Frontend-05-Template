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
```js
// match 的一个使用,字符串拆分
  get response(){
    // 'HTTP/1.1 200 OK '
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\S\s]+)/);
    return {
      statusCode:RegExp.$1,//200
      statusText:RegExp.$2,//OK
      headers:this.headers,
      body:this.bodyParser.content.join('')
    }
  }
```
## 第二步 用FSM实现HTML的分析

- 我们用FSM来实现HTML的分析
- 在HTML标准中，已经规定了HTML的状态
- Toy-Borwser只挑选其中一部分状态，完成一个简易版本
# 3. HTML解析 | 解析标签

## 第三步总结 解析标签
- 开始标签 
- 结束标签 
- 自封闭标签 
- 暂时忽略属性

# 4. HTML解析 | 创建元素

## 第四步总结 创建元素
- 在状态机中，除了状态迁移，我们还会要加入业务逻辑
- 我们在标签结束状态提交标签token

# 5. HTML解析 | 处理属性

## 第五步总结 处理属性
- 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
- 处理属性的方式跟标签类似
- 属性结束时，我们把属性加到标签Token上

# 6. HTML解析 | 用token构建DOM树

有些地方更新 有些地方没明确说，但是不改的话就不能正常运行，
花了些时间，不过最后还是改好了

状态机上是元素的地方需要暂时处理下，先返回到emit上为text return
```js
    emit({
      type: 'text',
      content: c
    });
    return;
```
##  第六步 用token构建DOM树
- 从标签构建DOM树的基本技巧是使用栈
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
- 自封闭节点可视为入栈后立即出栈
- 任何元素的父元素是它入栈前的栈顶