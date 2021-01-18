# 7. 手势与动画 | 实现鼠标操作
- touch事件 touchstart touchmove touchend
  - touch事件都是发生在touchstart之后，所以不用监听类似于mousedown的事件，因为手指抬起就认为不发生在当前的touch元素上了
  - 可以通过event.changedTouches获取touch事件的list，因为有可能是多点，所以获取到的touchList可以是多个
```js
element.addEventListener('touchstart',event=>{
  console.log(event.changedTouches);
})
```
  - 每一个点TouchList[0]有一个追踪的唯一ID identifier 来描述点的运动轨迹
  - touch事件比鼠标事件多了个touchcancel,描述事件非法结束
    - 一个队列外的事件有可能打破touch事件队列setTimeout队列的事件
```bash
setTimeout(()=>alert(1),3000);
```