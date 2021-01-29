# 1. 初始化与构建 | 初始化工具Yeoman（一）
* [使用yeoman](https://yeoman.io/authoring/index.html)
```bash
mkdir generators 
cd generators
mkdir app router
cd app && touch index.js
cd ..
cd route && touch index.js
```
- route 是对于比较复杂的时候使用的
- `npm link` 在toolchain文件夹里
- yo toolchain 就可以看到执行了app/index.js里的代码