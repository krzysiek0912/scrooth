class Scrooth {
  constructor(options) {
    this.element = typeof options !== 'undefined' ? options.element : window;
    this.distance = typeof options !== 'undefined' ? options.strength : 10;
    this.acceleration = typeof options !== 'undefined' ? options.acceleration : 1.2;
    this.deceleration = typeof options !== 'undefined' ? options.deceleration : 0.975;

    this.running = false;

    this.element.addEventListener('wheel', this.scrollHandler.bind(this));
    this.element.addEventListener('mousewheel', this.scrollHandler.bind(this));

    this.scroll = this.scroll.bind(this);
  }

  scrollHandler(e) {
    e.preventDefault();

    if (this.running === false) {
      this.top = this.element.pageYOffset || this.element.scrollTop;
      this.top = typeof this.top === 'undefined' ? 0 : this.top;
      this.running = true;
      this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
      this.isDistanceAsc = true;
      this.scroll();
    } else {
      this.isDistanceAsc = false;
      this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
    }
  }

  scroll() {
    if (this.running === true) {
      this.currentDistance *= this.isDistanceAsc === true ? this.acceleration : this.deceleration;
      Math.abs(this.currentDistance) < 0.1 && this.isDistanceAsc === false ? this.running = false : 1;
      Math.abs(this.currentDistance) >= Math.abs(this.distance) ? this.isDistanceAsc = false : 1;

      this.top += this.currentDistance;
      this.element.scrollTo(0, this.top);
      
      requestAnimationFrame(this.scroll);
    }
  }
}

const body = new Scrooth();
