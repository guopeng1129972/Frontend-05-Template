# 浏览器工作原理

# 1. 浏览器总论 | 浏览器工作原理总论
浏览器基础渲染流程
URL->(HTTP)=>HTML->(parse)=>DOM->(css computing)=>DOM with CSS->(layout)
=>DOM with position->(render)=>Bitmap

# 2. 状态机 | 有限状态机
## 有限状态机的特点？
- 每一个状态都是一个机器
  - 在每一个机器里，我们可以做计算、存储、输出...
  - 所有的这些机器接收的输入是一致的
  - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，他们应该是纯函数（无副作用）
- 每一个机器知道下一个状态
  - 每一个机器都有确定的下一个状态（Moore）
  - 每一个机器根据输入决定下一个状态（Mealy）
###### Promise的纯函数回调么

## JS中的有限状态机（Mealy）
```js
//每个函数是一个状态
function state(input){
//...
return next;//返回值为下一个状态
}

// 如何调用？
white(input){
  //get input
  state=state(input);//把状态机的返回值作为下一个状态
}
```

# 3. 状态机 | 不使用状态机处理字符串（一）

## 使用有限状态机处理字符串

- 在一个字符串中，找到字符“a”
```js
    function match(string) {
    for (let c of string) {
      if (c == 'a')
        return true;
    }
    return false;
  }

  match('i am groot');
```
# 4. 状态机 | 不使用状态机处理字符串（二）

- 在一个字符串中，找到字符“ab”
```js
  const findStr = (str) => {
    console.log(`********my find ab from ${str} *********`);
    if (typeof str !== 'string')
      return 'str or word is not a string';
    for (let i = 0; i < str.length; i++) {
      if (str[i] === 'a') {
        if (str[i + 1] === 'b')
          return true;
      }
    }
    return false;
  };
  console.log(findStr('acadc'));
```