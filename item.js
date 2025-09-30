class Item {
  constructor(caption, x, y, w, h, callback) {
    this.caption = caption;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.callback = callback;
  }
  run() {
    if (this.callback) this.callback();
  }
  draw() {
    strokeWeight(5);
    noFill();
    stroke("white");
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER);
    strokeWeight(1);
    textSize(this.h/2+5);
    stroke("white");
    text(this.caption, this.x + this.w / 2, this.y + this.h/2+10);
  }

  highlighted() {
    strokeWeight(5);
    fill(0, 255, 0, 100);
    rect(this.x-5, this.y-5, this.w+5, this.h+5);
    stroke("white");
    noFill();
    textAlign(CENTER);
    strokeWeight(1);
    textSize(this.h/2+14);
    stroke("white");
    text(this.caption, this.x + this.w / 2, this.y + this.h/2+15);
  }

  isHighlighted(x, y) {
    if (
      x >= this.x &&
      x <= this.x + this.w &&
      y >= this.y &&
      y <= this.y + this.h
    )
      return true;
    return false;
  }


}
