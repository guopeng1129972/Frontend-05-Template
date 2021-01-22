let element = document.documentElement;

let isListeningMouse=false;
element.addEventListener("mousedown", event => {
  // console.log(event.button);
  let context = Object.create(null);
  contexts.set('mouse' + (1 << event.button), context);
  start(event, context);
  let mousemove = event => {
    let button = 1;
    while (button <= event.buttons) {
      //order of buttons & button property is not same
      if (button & event.buttons) {
        let key;
        if (button === 2)
          key = 4;
        else if (button === 4)
          key = 2;
        else
          key = button;
          contexts.get("mouse" + key);
          move(event,context);
      }
      button = button << 1;
    }
  };
  let mouseup = event => {
    let context = contexts.get("mouse" + (1 << event.button));
    end(event, context);
    contexts.delete("mouse" + (1 << event.button));
    if(isListeningMouse){
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      isListeningMouse=false;
    }
  };
  if(!isListeningMouse){
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    isListeningMouse=true;
  }
});

let contexts = new Map();
element.addEventListener('touchstart', event => {
  for (let touch of event.changedTouches) {
    let context = Object.create(null);
    contexts.set(touch.identifier, context);
    start(touch, context);
  }
});

element.addEventListener('touchmove', event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    move(touch, context);
  }
});

element.addEventListener('touchend', event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    end(touch, context);
    // end之在Map中删除事件
    contexts.delete(contexts.identifier);
  }
});

element.addEventListener('touchcancel', event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    cancel(touch, context);
    contexts.delete(contexts.identifier);
  }
});

let start = (point, context) => {
  // console.log('start',point.clientX,point.clientY);
  context.startX = point.clientX, context.startY = point.clientY;
  context.isPan = false;
  context.isTap = true;
  context.isPress = false;
  context.handler = setTimeout(() => {
    context.isPan = false;
    context.isTap = false;
    context.isPress = true;
    console.log("press");
    context.handler = null;
  }, 500);
};

let move = (point, context) => {
  // console.log('move',point.clientX,point.clientY);
  let dx = point.clientY - context.startX,
    dy = point.clientY - context.startY;
  if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
    context.isPan = true;
    context.isTap = false;
    context.isPress = false;
    console.log("panStart");
    clearTimeout(context.handler);
  }
  if (context.isPan) {
    console.log(dx, dy);
    console.log("pan");
  }
};

let end = (point, context) => {
  // console.log('end', point.clientX, point.clientY);
  if (context.isTap) {
    dispatch("tap",{});
    clearTimeout(context.handler);
  }
  if (context.isPan) {
    console.log("paned");
  }
  if (context.isPress) {
    console.log("pressed");
  }

};

let cancel = (point, context) => {
  // console.log('cancel', point.clientX, point.clientY);
  clearTimeout(context.handler);
};

function dispatch(type,properties){
  let event=new Event(type);
  for(let name in properties){
    event[name]=properties[name];
  }
  element.dispatchEvent(event);
  // console.log(event);
}