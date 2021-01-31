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

# 2. 初始化与构建 | 初始化工具Yeoman（二）
- User Interactions 简单的命令行交互 
  - input
```js
 {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
```
  - confirm 
```js
 {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?"
      }
    this.log("app name", answers.name);
    this.log("cool feature", answers.cool);
```
- Interacting with the file system 文件模板系统 
  - 创建`app/templates/t.html` 设置模板变量
```html
<html>
  <head>
    <title><%= title %></title>
  </head>
</html>
```
  - 调用`this.fs.copyTpl`模块完成替换 
```js
  async step1() {
    this.fs.copyTpl(
      this.templatePath('t.html'), //模板路径
      this.destinationPath('publish/index.html'), //生成的目标路径
      {
        title: "Templating with Yeoman"
      } // 替换的模板内容
    );
  }
```
- Managing Dependencies 依赖系统 
yo 对npm进行了一层包装 更好更方便的使用npm
```js
//npm
// npm install lodash --save-dev
this.npmInstall(['lodash'], { 'save-dev': true });
// npm install
this.npmInstall()
// yarn
this.yarnInstall(['lodash'], { 'dev': true });
//yarn add lodash --dev
this.yarnInstall();
// yarn add
```
# 3. 初始化与构建 | 初始化工具Yeoman（三）

- CopyWebpackPlugin
https://www.webpackjs.com/plugins/copy-webpack-plugin/