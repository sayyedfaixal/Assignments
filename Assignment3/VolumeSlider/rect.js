function Rect(x, y, width, height, color) {
  // Base
  var rect = this;

  // Specifications
  rect.c = color || "white";
  rect.x = x;
  rect.y = y;
  rect.w = width;
  rect.h = height;
  rect.context = null;
}

Rect.prototype.draw = function () {
  // Base
  var rect = this;

  // Check Context
  if (!rect.context) {
    return;
  }

  // Draw rect
  rect.context.beginPath();
  rect.context.fillStyle = rect.c;
  rect.context.fillRect(rect.x, rect.y, rect.w, rect.h);
  rect.context.stroke();
};
