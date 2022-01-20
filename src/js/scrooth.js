class Scrooth {
  constructor({
      element = window,
      strength = 20,
      acceleration = 1.2,
      deceleration = 0.925,
  } = {}) {
      this.element = element;
      this.distance = strength;
      this.acceleration = acceleration;
      this.deceleration = deceleration;
      this.timestamp = new Date();
      this.running = false;
      this.scrollDirection = null;
      this.element.addEventListener('wheel', this.scrollHandler.bind(this), {
          passive: false,
      });
      this.element.addEventListener('mousewheel', this.scrollHandler.bind(this), {
          passive: false,
      });
      this.scroll = this.scroll.bind(this);
  }

  checkScrollDirectionIsUp(event) {
      if (event.wheelDelta) {
          return event.wheelDelta > 0 ? 'UP' : 'DOWN';
      }
      return null;
  }

  scrollHandler(e) {
      e.preventDefault();
      const direction = this.checkScrollDirectionIsUp(e);
      if (this.scrollDirection && this.scrollDirection !== direction) {
          this.running = false;
      }

      this.scrollDirection = direction;

      if (!this.running) {
          this.top = this.element.pageYOffset || this.element.scrollTop || 0;
          this.running = true;
          this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
          this.isDistanceAsc = true;
          this.scroll();
      } else {
          this.isDistanceAsc = false;
          this.currentDistance = e.deltaY;
      }
  }

  scroll() {
      if (this.running) {
          this.currentDistance *=
              this.isDistanceAsc === true ? this.acceleration : this.deceleration;

          this.running =
              Math.abs(this.currentDistance) < 0.1 && this.isDistanceAsc === false
                  ? false
                  : this.running;
          this.isDistanceAsc =
              Math.abs(this.currentDistance) >= Math.abs(this.distance)
                  ? false
                  : this.isDistanceAsc;

          this.top += this.currentDistance;
          this.element.scrollTo(0, this.top);

          requestAnimationFrame(this.scroll);
      }
  }
}

export default Scrooth;
