学习笔记

##Proxy(obj,config:{})
第一个参数：obj
第二个参数：对象可以设置 set,get,constructor,prototype
```js
let po = new Proxy(object, {
      set(obj, prop, val) {
        console.log(obj.prop, val)
      }
    })
```
vue3 就用 proxy 重写了双向数据绑定

###遍历Map的一个应用
```js
    let callbocks = new Map()
    let usedReactivties = []
    //...
      console.log(usedReactivties)
      for (let reactivity of usedReactivties) {
        if (!callbocks.has(reactivity[0])) {
          callbocks.set(reactivity[0], new Map());
        }
        if (!callbocks.get(reactivity[0]).has(reactivity[1])) {
          callbocks.get(reactivity[0]).set(reactivity[1], [])
        }
        callbocks.get(reactivity[0]).get(reactivity[1]).push(callbock)
      }
```