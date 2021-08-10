window.onload = function () {
  var canvas = document.getElementById("animations-canvas");
  var context = canvas.getContext("2d");

  canvas.addEventListener("mousedown", (e) => {
    console.log("MouseDown");
    console.log(e);
  });
  canvas.addEventListener("mouseup", (e) => {
    console.log("MouseUp");
    console.log(e);
  });

  canvas.addEventListener("mousemove", (e) => {
    console.log("mouseMove");
    console.log(e);
  });
};
