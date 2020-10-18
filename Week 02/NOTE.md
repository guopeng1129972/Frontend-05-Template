学习笔记

给event添加监听是不是对应的key值为3，可以使用e.which===3或者别的来实现绑定keycode
```js
  document.addEventListener('mousedown',e=>{
    mousedown=true;
    clear=(e.which===3)
  })
```
```js
通过Promise设置一个停顿
  function sleep(t) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, t)
    })
  }
```
选取元素的子元素可以使用div.children[0]队列来找
比如设置元素的格式
```js
 sleep(30)
      container.children[y*100+x].style.backgroundColor='green';
```

brew cask install stretchly