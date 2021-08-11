window.onload = function () {
  var canvas = document.getElementById("animations-canvas");
  var context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const boundings = canvas.getBoundingClientRect();

  var currentRect = "";
  const lowVol = "black";
  const midVol = "green";
  const highVol = "blue";
  const fullVol = "red";
  const allRect = [];

  //Drawing volumnColorBox
  const volumnColorBox = new Rect(50, 250, 30, 30, lowVol);
  volumnColorBox.context = context;
  volumnColorBox.draw();
  allRect.push(volumnColorBox);

  //Images
  //drawing volumeBox
  const container = new Rect(110, 250, 400, 30, "grey");
  container.context = context;
  container.draw();
  allRect.push(container);

  //drawing slider
  const slider = new Rect(110, 240, 10, 50, "black");
  slider.context = context;
  slider.draw();
  allRect.push(slider);

  //fill Background
  const backgroundFill = new Rect(110, 250, 0, 0, "blue");
  backgroundFill.context = context;

  //text
  let text = 0;
  drawText(text);
  //mousevent to canvas
  canvas.addEventListener("mousedown", function (event) {
    var mouseDownX = event.clientX - boundings.left;
    var mouseDownY = event.clientY - boundings.top;
    onSlider(mouseDownX, mouseDownY);
    onController(mouseDownX, mouseDownY);
  });

  canvas.addEventListener("mousemove", function (event) {
    var mouseMoveX = event.clientX - boundings.left;
    var mouseMoveY = event.clientY - boundings.top;
    canvas.style.cursor = "default";
    if (
      mouseMoveX >= allRect[2].x &&
      mouseMoveX <= allRect[2].x + 10 &&
      mouseMoveY >= allRect[2].y &&
      mouseMoveY <= allRect[2].y + 50
    ) {
      canvas.style.cursor = "pointer";
    }

    if (currentRect) {
      if (mouseMoveX >= 110 && mouseMoveX <= 511) {
        update(mouseMoveX, currentRect);
      }
    }
  });

  canvas.addEventListener("mouseup", function () {
    currentRect = null;
  });

  //If Mousedown is on slider
  function onSlider(mx, my) {
    if (
      mx >= allRect[2].x &&
      mx <= allRect[2].x + 10 &&
      my >= allRect[2].y &&
      my <= allRect[2].y + 50
    ) {
      currentRect = allRect[2];
    }
  }

  //If Mousedown is on anywhere in the controller
  function onController(mx, my) {
    if (mx >= 110 && mx <= 511 && my >= 250 && my <= 280) {
      update(mx, allRect[2]);
    }
  }
  function drawRectangles(text) {
    context.clearRect(0, 0, 600, 700);
    allRect.forEach((rect) => {
      rect.draw();
    });

    //filling background till the slider
    backgroundFill.w = allRect[2].x - 110;
    backgroundFill.h = 30;
    backgroundFill.draw();
    drawText(text);
  }

  function update(mouseMoveX, currentRect) {
    volumePercentage = parseInt((mouseMoveX - 110) / 4);
    currentRect.x = mouseMoveX;

    if (volumePercentage >= 0 && volumePercentage < 20) {
      allRect[0].c = lowVol;
      drawRectangles(volumePercentage);
    } else if (volumePercentage >= 20 && volumePercentage < 60) {
      allRect[0].c = midVol;
      drawRectangles(volumePercentage);
    } else if (volumePercentage >= 60 && volumePercentage <= 99) {
      allRect[0].c = highVol;
      drawRectangles(volumePercentage);
    } else {
      allRect[0].c = fullVol;
      drawRectangles(volumePercentage);
    }
  }

  function drawText(text) {
    context.clearRect(520, 250, 590, 290);
    context.beginPath();
    context.font = "normal 800 30px times";
    context.textAlign = "center";
    context.fillStyle = "grey";
    context.fillText(text, 550, 275);
  }
};
