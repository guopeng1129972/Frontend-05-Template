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
# 8. 手势与动画 | 实现手势的逻辑
- 设置定时器时候，把它再置位null(`handler=null;`)，clear的时候就避免错误
```js
  handler = setTimeout(() => {
    isPan=false;
    isTap=false;
    isPress=true;  
    console.log("press");
    handler=null;
  }, 500);

```
# 9. 手势与动画 | 处理鼠标事件
- 不用将`handler`,`startX`,`isPan`...这些变量写在全局上，只需要在创建时绑定到`context`上
```diff
- let handler;
- let startX, startY;
- let isPan=false,isTap=true,isPress=false;
```
- 创建`contexts`存储当前的事件库，以`touch.identifier`为标示操作Map,事件start,move,end...同理
```js
let contexts=new Map();
element.addEventListener('touchstart', event => {
  for (let touch of event.changedTouches) {
    let context=Object.create(null);
    contexts.set(touch.identifier,context);
    start(touch,context);
  }
});
```
- 鼠标事件的`event.button`可以获取到具体按下的是哪个键
```js
element.addEventListener("mousedown", event => {
  console.log(event.button);//
  start(event);
```
- 按照这个特点，同理创建鼠标`context`
- 但是在`mousemove`事件上的`event`是获取不到`event.button`,因为不按键也可以移动
- 而是可以获取到`event.buttons`,表示当前有哪些键被按下
  - `event.buttons`按照二进制掩码设计，
    - `0b11111`表示5个键全按下
    - `0b00001`表示左键被按下
    - `0b00010`   中键
- 所以，由于`mousemove`的特点，在设计`contexs`的时候，key按照1的`event.button`位移量表示
```js
element.addEventListener("mousedown", event => {
  let context = Object.create(null);
  contexts.set('mouse' + (1 << event.button), context);
  start(event, context);
  let mousemove = event => {
    let button = 1;
    while (button <= event.buttons) {
      contexts.get("mouse" + event.button);
      move(event);
      button=button<<1;
    }
  };
```
- 需要禁用body的`oncontextmenu``事件
```html
<body oncontextmenu="event.preventDefault()">
</body>
```
- 还有个问题，当button是2的时候buttons转换过来是4，反之相反；
```diff
while (button <= event.buttons) {
    //order of buttons & button property is not same
+    if (button & event.buttons) {
+      let key;
+      if (button === 2)
+        key = 4;
+      else if (button === 4)
+        key = 2;
+      else
+        key = button;
+        contexts.get("mouse" + key);
+        move(event,context);
+    }
```
- 当两个键按下会有问题,因为多监听了一组`mousemove`,`mouseup`事件
```js
    if(isListeningMouse){
      element.removeEventListener('mousemove', mousemove);
      element.removeEventListener('mouseup', mouseup);
      isListeningMouse=false;
    }
  };
  if(!isListeningMouse){
    element.addEventListener('mousemove', mousemove);
    element.addEventListener('mouseup', mouseup);
    isListeningMouse=true;
  }
```
# 10. 手势与动画 | 派发事件
- 注册事件直接`new Event(type)`就可以了
  - 这块要用`for in`因为`properties`不一定可以枚举
```js
function dispatch(type,properties){
  let event=new Event(type);
  for(let name in properties){
    event[name]=properties[name];
  }
  element.dispatchEvent(event);
  // console.log(event);
}
```
  - end之后
```js
  if (context.isTap) {
    dispatch("tap",{});
    clearTimeout(context.handler);
  }
```
- 监听 创建
```html
<script>
  document.documentElement.addEventListener('tap',()=>{
    console.log("tap event trigger!");
  })
</script>
```
# 11. 手势与动画 | 实现一个flick事件
- 需要判断速度的事件