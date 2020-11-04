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