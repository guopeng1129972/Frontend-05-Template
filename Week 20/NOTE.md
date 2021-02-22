# 1. 持续集成 | 发布前检查的相关知识
- git Hooks 完成检查
- ESlint
- PhantomJS

# 2. 持续集成 | Git Hooks基本用法
```bash
mkdir git-demo
cd git-demo
touch README.md
git init
git add README.md
git commit -a -m "init"
cd .git/hooks
touch pre-commit
chmod +x pre-commit
```
- pre-commit
```bash
#!/usr/bin/env node
console.log('hello hooks');
let process=require("process");
process.exitCode=1;
```
   - pre-commit 就是git commit的时候执行的内容 
