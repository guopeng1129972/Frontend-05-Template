export class Dispatcher{
  constructor(element){
    this.element=element;
  }
  dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}
export class Listener {
  constructor(element, recognizer) {
    let isListeningMouse = false;
    let contexts = new Map();
    element.addEventListener("mousedown", event => {

      let context = Object.create(null);
      contexts.set('mouse' + (1 << event.button), context);
      recognizer.start(event, context);
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
            recognizer.move(event, context);
          }
          button = button << 1;
        }
      };
      let mouseup = event => {
        let context = contexts.get("mouse" + (1 << event.button));
        recognizer.end(event, context);
        contexts.delete("mouse" + (1 << event.button));
        if (isListeningMouse) {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
          isListeningMouse = false;
        }
      };
      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        isListeningMouse = true;
      }
    });
    // touch 
    element.addEventListener('touchstart', event => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        recognizer.start(touch, context);
      }
    });

    element.addEventListener('touchmove', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.move(touch, context);
      }
    });

    element.addEventListener('touchend', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.end(touch, context);
        // end之在Map中删除事件
        contexts.delete(contexts.identifier);
      }
    });

    element.addEventListener('touchcancel', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.cancel(touch, context);
        contexts.delete(contexts.identifier);
      }
    });
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispather = dispatcher;
  }
  start(point, context) {
    context.startX = point.clientX, context.startY = point.clientY;
    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }];
    context.isPan = false;
    context.isTap = true;
    context.isPress = false;
    context.handler = setTimeout(() => {
      context.isPan = false;
      context.isTap = false;
      context.isPress = true;
      this.dispather.dispatch("press", {});
      context.handler = null;
    }, 500);
  };

  move(point, context) {
    let dx = point.clientY - context.startX,
      dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isPan = true;
      context.isTap = false;
      context.isPress = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);
      this.dispather.dispatch("panStart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })
      clearTimeout(context.handler);
    }
    if (context.isPan) {
      this.dispather.dispatch("pan", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
    }
    context.points = context.points.filter(point => Date.now() - point.t < 500);

    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    });
  };

  end(point, context) {
    if (context.isTap) {
      this.dispather.dispatch("tap", {});
      clearTimeout(context.handler);
    }
    if (context.isPress) {
      this.dispather.dispatch("pressed", {});

    }
    context.points = context.points.filter(point => Date.now() - point.t < 500);
    let d, v;
    if (!context.points.length) {
      v = 0;
    } else {
      d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
        (point.clientY - context.points[0].y) ** 2);
      v = d / (Date.now() - context.points[0].t);
    }
    if (v > 1.5) {
      this.dispather.dispatch("flick  速度大于1.5xp/ms 为一次flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      });
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }
    if (context.isPan) {
      this.dispather.dispatch("paned", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick
      });
    }
  };

  cancel(point, context) {
    clearTimeout(context.handler);
    this.dispather.dispatch("cancel", {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      isVertical: context.isVertical,
      isFlick: context.isFlick
    });
  };
}

export function enableGesture(element) {
  new Listener(element,new Recognizer(new Dispatcher(element)));
}