const DEFAULT_OPTIONS = { debug: false };
const PI_2 = Math.PI * 2;
const LINEAR = x => x;
const easeOutSin = x => Math.sin((x * Math.PI) / 2);

const juggler = {
  running: false,
  duration: 0,
  scheduledAt: 0,
  tween: LINEAR,
  callback: undefined,
  play: (time, tickcb, tween = LINEAR) => {
    if (isNaN(time) || time < 1) return;
    juggler.scheduledAt = Date.now();
    juggler.duration = time;
    juggler.callback = tickcb;
    juggler.tween = tween;
    if (!juggler.running) {
      juggler.running = true;
      requestAnimationFrame(juggler.tick);
    }
  },
  tick: () => {
    const now = Date.now();
    const progress = (now - juggler.scheduledAt) / juggler.duration;
    if (juggler.callback) juggler.callback(juggler.tween(Math.min(1, progress)));
    if (progress < 1) {
      requestAnimationFrame(juggler.tick);
    } else {
      juggler.running = false;
    }
  }
};

function Carousel(container, options = DEFAULT_OPTIONS) {
  this.container = container;
  this.elements = Array.from(container.children);
  this.rotation = 0;
  this.options = options;
  this.debug(`Creating a carousel with ${this.elements.length} elements.`)
  this.updateChildren();
}

Carousel.prototype.debug = function(text) {
  console.info(`[CAROUSEL] ${text}`);
};

Carousel.prototype.updateChildren = function() {
  for (let i = 0; i < this.elements.length; i ++) {
    const child = this.elements[i];
    const childAngle = (this.rotation - i / this.elements.length) * PI_2;
    const x = (-Math.sin(childAngle) + 1) / 2;
    const y = (Math.cos(childAngle) + 1) / 2;
    child.style['top'] = `${y * 100}%`;
    child.style['left'] = `${x * 100}%`;
    child.style['z-index'] = Math.floor(y * 100);
  }
};

function nRot(n) {
  const r = (n % 1 + 1) % 1;
  return r > 0.5 ? r - 1 : r;
}

Carousel.prototype.focus = function(index) {
  this.debug(`Focusing on element ${index}.`)
  this.rotation = nRot(this.rotation);
  const targetRot = index / this.elements.length;
  const diff = nRot(targetRot - this.rotation);
  const startRot = this.rotation;
  juggler.play(Math.abs(diff * 5000), p => {
    this.rotation = startRot + diff * p;
    this.updateChildren();
  }, easeOutSin);
};
