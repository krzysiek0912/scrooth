class Scrooth {
  constructor(options) {
    this.element = typeof options !== 'undefined' ? options.element : window;
    this.distance = typeof options !== 'undefined' ? options.strength : 10;
    this.acceleration = typeof options !== 'undefined' ? options.acceleration : 1.5;
    this.deceleration = typeof options !== 'undefined' ? options.deceleration : 0.975;

    this.running = false;

    this.element.addEventListener('onwheel', this.scrollHandler.bind(this));
    this.element.addEventListener('DOMMouseScroll', this.scrollHandler.bind(this));
    this.element.addEventListener('mousewheel', this.scrollHandler.bind(this));

    this.scroll = this.scroll.bind(this);
  }

  scrollHandler(e) {
    e.preventDefault();

    if (this.running === false) {
      this.running = true;
      this.currentDistance = e.deltaY > 0 ? 1 : -1;
      this.isDistanceAsc = true;
      this.scroll();
    } else {
      this.isDistanceAsc = false;
      this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
    }
  }

  scroll() {
    if (this.running === true) {
      requestAnimationFrame(this.scroll);
      let top = this.element.pageYOffset || this.element.scrollTop;
      top = typeof top === 'undefined' ? 0 : top;

      this.element.scrollTo(0, top + this.currentDistance);

      this.currentDistance *= this.isDistanceAsc === true ? this.acceleration : this.deceleration;
      Math.abs(this.currentDistance) >= Math.abs(this.distance) ? this.isDistanceAsc = false : 1;
      Math.abs(this.currentDistance) < 1 && this.isDistanceAsc === false ? this.running = false : 1 ;
    }
  }
}

const body = new Scrooth();
