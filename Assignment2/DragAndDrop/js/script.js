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
    const self = this;

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
        ['ques']
      );

      // Footer Section
      this.createCustomElement(undefined, document.body, 'footer', ['footer']);

      this.createCustomElement('img', elementsObject['footer'], 'btnReset', [
        'btn',
        'btn-reset',
      ]);
      elementsObject['btnReset'].src = jsonData.btnResetDisabled;

      this.createCustomElement('img', elementsObject['footer'], 'btnShowme', [
        'btn',
        'btn-show-me',
      ]);
      elementsObject['btnShowme'].src = jsonData.btnShowmeDisabled;

      this.createCustomElement('img', elementsObject['footer'], 'btnSubmit', [
        'btn',
        'btn-submit',
      ]);
      elementsObject['btnSubmit'].src = jsonData.btnSubmitDisabled;
    };

    this.loadQuestions = function () {
      const options = jsonData.questionsData
        .map((answer) => answer.ans)
        // Randomize the answer Box
        .sort(() => (Math.random() > 0.5 ? 1 : -1));
      // Loading Questions and options initially
      jsonData.questionsData.forEach((ques, index) => {
        const markup = `
          <div class="question">
            <div class="srno">
            ${index + 1}
            </div>
            <div class="ques">
            ${ques.question}
            </div>
            <div class="ans-box validation"> <span id="${index}" class="mark"></span>
            </div>
            <div class="ans-opt ans-box">
            <p class="ans-options" data-ans="${index}" draggable="true"> ${options[index]
          } </p>
            </div>
          </div>
          `;
        elementsObject['questionsDiv'].insertAdjacentHTML('beforeend', markup);
      });
    };

    // Enabling Drag & Drop
    this.enableDragAndDrop = function () {
      const options = document.querySelectorAll('.ans-box');
      const ans = document.querySelectorAll('.ans-options');
      let dragItem = null;
      ans.forEach((an) => {
        an.addEventListener('dragstart', function (e) {
          if (!e.target.classList.contains('dropped')) {
            e.target.classList.remove('dropped');
          }
          dragItem = this;
          setTimeout(() => (this.style.display = 'none'), 0);
        });
        an.addEventListener('dragend', function (e) {
          setTimeout(() => (this.style.display = 'block'), 0);
          dragItem = null;
        });
      });

      options.forEach((option) => {
        option.addEventListener('dragenter', function (e) {
          if (!e.target.classList.contains('dropped')) {
            e.target.classList.add('ans-box-hover');
          }
        });
        option.addEventListener('dragover', function (e) {
          if (!e.target.classList.contains('dropped')) {
            e.preventDefault();
          }
        });
        option.addEventListener('dragleave', function (e) {
          if (!e.target.classList.contains('dropped')) {
            e.target.classList.remove('ans-box-hover');
          }
        });
        option.addEventListener('drop', function (e) {
          e.preventDefault();
          if (e.target.classList.contains('dragged')) {
            e.target.classList.remove('dragged');
          }
          if (dragItem.parentElement.classList.contains('dropped')) {
            dragItem.parentElement.classList.remove('dropped');
          }
          dragItem.parentElement.classList.add('dragged');
          this.classList.add('dropped');
          e.target.classList.remove('ans-box-hover');
          this.append(dragItem);
          self.buttonHandler();
        });
      });
    };

    // Answer Validation
    this.buttonHandler = function () {
      const [...answers] = document.querySelectorAll('.validation');
      if (answers.every((element) => element.classList.contains('dropped'))) {
        elementsObject['btnSubmit'].src = jsonData.btnSubmitEnabled;
      } else {
        elementsObject['btnSubmit'].src = jsonData.btnSubmitDisabled;
      }

      if (answers.some((element) => element.classList.contains('dropped'))) {
        elementsObject['btnReset'].src = jsonData.btnResetEnabled;
      } else {
        elementsObject['btnReset'].src = jsonData.btnResetDisabled;
      }
    };

    this.submitData = function () {
      const [...answers] = document.querySelectorAll('.mark');
      if (!answers.every((answer) => answer.innerHTML === '')) return;
      answers.forEach((answer) => {
        let rightWrong;
        if (
          answer.nextElementSibling.innerHTML.trim() ===
          jsonData.questionsData[answer.id].ans
        )
          rightWrong = jsonData.correct;
        else rightWrong = jsonData.incorrect;
        const markup = `<img src="${rightWrong}">`;
        answer.insertAdjacentHTML('beforeend', markup);
      });
    };

    this.showAnswer = function () {
      const [...answers] = document.querySelectorAll('.validation');
      answers.forEach((answer) => {
        answer.firstChild.nextSibling.nextSibling.nextElementSibling.innerHTML =
          jsonData.questionsData[answer.firstChild.nextSibling.id].ans;
        answer.firstChild.nextSibling.removeChild(
          answer.firstChild.nextSibling.firstChild
        );
        const right = document.createElement('img');
        right.src = jsonData.correct;
        answer.firstChild.nextSibling.appendChild(right);
        elementsObject['btnSubmit'].src = jsonData.btnSubmitDisabled;
      });
    };

    this.handleEvents = function () {
      elementsObject.btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.getAttribute('src') === jsonData.btnResetDisabled) return;
        location.reload();
      });

      elementsObject.btnSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.getAttribute('src') === jsonData.btnSubmitDisabled) return;
        self.submitData();
        elementsObject['btnShowme'].src = jsonData.btnShowmeEnabled;
      });

      elementsObject.btnShowme.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.getAttribute('src') === jsonData.btnShowmeDisabled) return;
        self.showAnswer();
      });

      document
        .querySelector('.btn-close')
        .addEventListener('click', function (e) {
          const answer = window.confirm('Are you sure want to exit?');
          if (answer) {
            window.close();
          } else {
          }
        });
    };

    // Initialization
    this.init();

    // Display Questions
    this.loadQuestions();

    // Enable Drag & Drop
    this.enableDragAndDrop();

    // Handle Reset and Submit
    this.handleEvents();
  };

  const app = new Test();

}
 