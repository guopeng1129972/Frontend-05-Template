# 1. 单元测试工具 | Mocha（一）
## 安装
- 使用NPM全局安装：
```bash
npm install --global mocha
```
- 也可以作为项目的依赖进行安装：
```bash
npm install --save-dev mocha
```

- `add.js`需要module.exports
```js
function add(a, b) {
  return a + b
};
module.exports=add;
```
- test.js 
```js
var assert=require('assert');

var add=require('../add.js');

describe('add function testing ',function(){
  it('1+2 should be 3',function(){
    assert.equal(add(1,2),3);
  });
  it('-5+2 should be -3',function(){
    assert.equal(add(-5,2),-3);
  });
});
```
- `describe`这个方法就是将测试的信息分块显示 好看一些
- 为了配合mocha 测试的内容需要module.exports=add;
- 要想使用常规的export add 需要使用babel