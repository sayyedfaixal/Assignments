fetch('data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    appendData(jsonData);
  })
  .catch(function (err) {
    // If there is some error in loading the JSON file log the error
    console.log('error: ' + err);
  });

function appendData(jsonData) {

  // console.log(jsonData);
  const Test = function () {

    const elementsObject = {};

    // Creating Custom Elements
    this.createCustomElement = function (
      type = 'div',
      parent,
      nameOfElement,
      classes
    ) {
      const element = document.createElement(type);
      if (classes.length > 1) element.classList.add(...classes);
      else element.classList.add(classes);
      if (type === 'img');
      else {
        if (jsonData[nameOfElement]) element.innerHTML = jsonData[nameOfElement];
      }
      parent.append(element);
      elementsObject[nameOfElement] = element;
    };

    this.init = function () {
      // Header Section
      this.createCustomElement(undefined, document.body, 'header', ['header']);
      this.createCustomElement('h3', elementsObject['header'], 'title', [
        'title',
      ]);
      this.createCustomElement('p', elementsObject['header'], 'subTitle', [
        'sub-title',
      ]);
      this.createCustomElement(undefined, elementsObject['header'], 'btnClose', [
        'btn-close',
        'close',
      ]);
      this.createCustomElement('p', elementsObject['btnClose'], 'closeBtnText', [
        'cls',
      ]);
      var close = document.getElementsByClassName("btn-close");
      close[0].addEventListener("click", () => {
        if (confirm("Do you really want to close!")) {
          window.close();
        }
      })
      // Container Section
      this.createCustomElement(undefined, document.body, 'container', [
        'container',
      ]);

      this.createCustomElement(undefined, elementsObject['container'], 'info', [
        'info',
      ]);

      this.createCustomElement('hr', elementsObject['container'], 'dash', [
        'dash',
      ]);

      this.createCustomElement(
        undefined,
        elementsObject['container'],
        'headTitle',
        ['head-title']
      );

      this.createCustomElement(
        undefined,
        elementsObject['container'],
        'headInfo',
        ['head-info']
      );

      // Question Div
      this.createCustomElement(
        undefined,
        elementsObject['container'],
        'questionsDiv',
        ['questionz']
      );

      // Footer Section
      this.createCustomElement(undefined, document.body, 'footer', ['footer']);

      var btnDiv = document.createElement("div");
      btnDiv.classList.add("btnDiv");

      var resetBtn = document.createElement("button");
      resetBtn.classList.add("btn");
      resetBtn.classList.add("btn-reset");
      resetBtn.disabled = true;
      resetBtn.style.height = "50px";
      resetBtn.style.width = "150px";
      resetBtn.style.background = `url(${jsonData.btnResetDisabled}) no-repeat`;
      resetBtn.style.backgroundSize = "100% 100%";
      btnDiv.append(resetBtn);

      var showMeBtn = document.createElement("button");
      showMeBtn.classList.add("btn");
      showMeBtn.classList.add("btn-show-me");
      showMeBtn.disabled = true;
      showMeBtn.style.height = "50px";
      showMeBtn.style.width = "150px";
      showMeBtn.style.background = `url(${jsonData.btnShowmeDisabled}) no-repeat`;
      showMeBtn.style.backgroundSize = "100% 100%";
      btnDiv.append(showMeBtn);

      var submitBtn = document.createElement("button");
      submitBtn.classList.add("btn");
      submitBtn.classList.add("btn-submit");
      submitBtn.disabled = true;
      submitBtn.style.height = "50px";
      submitBtn.style.width = "150px";
      submitBtn.style.background = `url(${jsonData.btnSubmitDisabled}) no-repeat`;
      submitBtn.style.backgroundSize = "100% 100%";
      btnDiv.append(submitBtn);

      var footer = document.querySelector(".footer");
      footer.append(btnDiv);

    };

    this.loadQuestions = function () {
      const options = jsonData.questionsData
        .map((answer) => answer.ans)
        // Randomize the answer Box
        .sort(() => (Math.random() > 0.5 ? 1 : -1));
      // Loading Questions and options initially
      var markup = ""
      jsonData.questionsData.forEach((ques, index) => {
        markup += `
        <div class="question">
        <div class="srno"><strong> ${index + 1}.</strong></div>
        <div class="ques"> ${ques.question}</div>
        <div class="ans-box" id="drop${index}"  ></div>
        <img class="ansImg hide" id="ansImg${index}" 
            src="${jsonData.wrongAnsImg.src}" height="${jsonData.rightAnsImg.height}" width="${jsonData.rightAnsImg.width}">
        <div class="options options-drag${index}">
            <div class="ans-options" id="drag${index}" style="background:${jsonData.blankImg}">
                <span style="pointer-events:none"><strong>${options[index]}</strong>
                </span>
              </div>
              </div>
          </div>                           
          `;
      });
      elementsObject['questionsDiv'].innerHTML = markup;

    };


    this.enableDragAndDrop = function () {

      var resetBtn = document.querySelector(".btn-reset");
      var showMeBtn = document.querySelector(".btn-show-me");
      var submitBtn = document.querySelector(".btn-submit");

      var ansOptions = document.querySelectorAll(".ans-options");

      let currentDrag;
      // console.log(originalTopArr, originalLeftArr);
      ansOptions.forEach((drag) => {
        //mousedown event
        drag.addEventListener("mousedown", (e) => {
          currentDrag = e.target.id;
          // console.log(currentDrag);
          e.target.parentNode.classList.remove("dropped");
          if (e.target.parentNode.classList.contains("options")) {
            const cloneDiv = document.createElement("div");
            e.target.parentNode.append(cloneDiv);
            cloneDiv.classList.add("ans-options", "drag", "clone");
            cloneDiv.innerHTML = e.target.innerHTML;
          }
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        });
        //dragstart event
        drag.addEventListener("dragstart", (e) => {
          return false;
        });
        drag.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
        drag.addEventListener("drop", (e) => { });
      });
      function onMouseMove(e) {
        const drag = document.getElementById(currentDrag);
        drag.style.left = e.pageX - 100 + "px";
        drag.style.top = e.pageY - 25 + "px";
      }
      function onMouseUp(e) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        let dropBox;
        for (let i = 0; i < 6; i++) {
          const pointer = document.getElementById(`drop${i}`);
          console.log(pointer);
          const topValue = pointer.offsetTop;
          // console.log(topValue);
          const leftValue = pointer.offsetLeft;
          // console.log(leftValue);
          // console.log(e.pageX, e.pageY);
          if (
            e.pageX > leftValue &&
            e.pageX < leftValue + 200 &&
            e.pageY > topValue &&
            e.pageY < topValue + 50
          ) {
            if (pointer.classList.contains("dropped")) {
              dropBox = false;
              break;
            }
            e.target.style.top = `${topValue + 1}px`;
            e.target.style.left = `${leftValue + 2}px`;
            pointer.classList.add("dropped");
            pointer.append(e.target);
            dropBox = true;
            break;
          } else {
            dropBox = false;
          }
        }
        //taking back to the original position
        if (!dropBox) {
          const parent = document.querySelector(`.options-${currentDrag}`);
          parent.innerHTML = "";
          parent.appendChild(e.target);
          e.target.style.left = `${parent.offsetLeft}px`;
          e.target.style.top = `${parent.offsetTop}px`;
        }

        let counter = 0;
        var ansBoxes = document.querySelectorAll(".ans-box");
        ansBoxes.forEach((dropbox) => {
          if (dropbox.classList.contains("dropped")) {
            counter++;
          }
          //enable reset button
          if (counter > 0) {
            resetBtn.disabled = false;
            resetBtn.style.background = `url(${jsonData.btnResetEnabled}) no-repeat`;
            resetBtn.style.backgroundSize = "100% 100%";
          } else {
            // disableResetBtn();
            resetBtn.disabled = true;
            resetBtn.style.background = `url(${jsonData.btnResetDisabled}) no-repeat`;
            resetBtn.style.backgroundSize = "100% 100%";
          }
          // enable submit button
          if (counter === jsonData.questionsData.length) {
            submitBtn.disabled = false;
            submitBtn.style.background = `url(${jsonData.btnSubmitEnabled}) no-repeat`;
            submitBtn.style.backgroundSize = "100% 100%";
          } else {
            // disableSubmitBtn();
            submitBtn.disabled = true;
            submitBtn.style.background = `url(${jsonData.btnSubmitDisabled}) no-repeat`;
            submitBtn.style.backgroundSize = "100% 100%";
          }
        });

      }
      // console.log(resetBtn);
      resetBtn.addEventListener("click", () => {
        location.reload();
      });

      submitBtn.addEventListener("click", () => {

        let wrongAnsCounter = 0;
        var ansBoxes = document.querySelectorAll(".ans-box");
        var correctAns = jsonData.correctAns;
        let ansImg = "";
        for (let i = 0; i < ansBoxes.length; i++) {
          ansImg = document.getElementById(`ansImg${i}`);
          if (ansBoxes[i].innerText === correctAns[i]) {
            ansImg.classList.remove("hide");
            ansImg.src = jsonData.rightAnsImg.src;
          } else {
            ansImg.classList.remove("hide");
            ansImg.src = jsonData.wrongAnsImg.src;
            wrongAnsCounter++;
          }
        }
        if (wrongAnsCounter >= 3) {
          // var showMeBtn = document.querySelector(".btn-show-me");

          showMeBtn.disabled = false;
          showMeBtn.style.background = `url(${jsonData.btnShowmeEnabled}) no-repeat`;
          showMeBtn.style.backgroundSize = "100% 100%";
        }
        submitBtn.disabled = true;
        submitBtn.style.background = `url(${jsonData.btnSubmitDisabled}) no-repeat`;
        submitBtn.style.backgroundSize = "100% 100%";
      });
      showMeBtn.addEventListener("click", () => {
        var ansBoxes = document.querySelectorAll(".ans-box");
        var correctAns = jsonData.correctAns;

        var ansImg = document.querySelectorAll(".ansImg");
        ansImg.forEach((img) => {
          img.classList.add("hide");
        });
        ansBoxes.forEach((drop, i) => {
          drop.removeChild(drop.lastChild);
          drop.innerText = correctAns[i];
        });
        showMeBtn.disabled = true;
        showMeBtn.style.background = `url(${jsonData.btnShowmeDisabled}) no-repeat`;
        showMeBtn.style.backgroundSize = "100% 100%";
      })
    }



    // Initialization
    this.init();

    // Display Questions                                                                        
    this.loadQuestions();

    // Enable Drag & Drop
    this.enableDragAndDrop();

    // Handle Reset and Submit
    // this.handleEvents();
  };

  const app = new Test();

}
