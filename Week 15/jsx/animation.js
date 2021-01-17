//严格处理
const TICK = Symbol('tick');
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animation");
export class Timeline {
  constructor() {
    this[ANIMATIONS]=new Set();
  }
  start() {
    let startTime=Date.now();
    this[TICK] = () => {
      // console.log('tick');
      let t=Date.now()-startTime;
      for(let animation of this[ANIMATIONS]){
        // console.log(t);
        // console.log(animation.duration);
        let t0=t;
        if(animation.duration<t){
          this[ANIMATIONS].delete(animation);
          t0=animation.duration;
        }
        animation.receive(t0);
      }
      requestAnimationFrame(this[TICK]);
    }
    this[TICK]();
  }
  // 设置速率 暂不实现
  // set rate(){} 
  // get rate(){}


  //暂停
  pause() {

  }
  //恢复
  resume() {

  }
  //重启
  reset() {}
  add(animation){
    this[ANIMATIONS].add(animation);
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, timingFunction) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction;
  }
  receive(time) {
    // console.log(time);
    let range = (this.endValue - this.startValue);
    this.object[this.property] = this.startValue + range * time / this.duration;
  }
}