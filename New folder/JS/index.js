//Fetching Data from JSON
fetch('data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    appendData(jsonData);
  })
  .catch(function (err) {
    console.log('error: ' + err);
  });

function appendData(jsonData) {

  var container = document.getElementsByClassName("container");
  container[0].innerHTML = ""

  for (var i = 0; i < jsonData.length; i++) {

    //Getting DOM elements
    var div = document.createElement("div");
    var newSrDiv = document.createElement("div");
    var newQuestionDiv = document.createElement("div");
    var newAnswerDiv = document.createElement("div");
    var choiceAnswerDiv = document.createElement("div");

    //Adding apprioproate class and tribute to the elements 
    div.classList.add("data");
    newSrDiv.classList.add("srData");
    newQuestionDiv.classList.add("questionData");
    newAnswerDiv.classList.add("answerData");
    choiceAnswerDiv.classList.add("choiceData");
    choiceAnswerDiv.setAttribute("draggable", true);

    //Putting JSON data into the inner HTML via createTextNode
    newSrDiv.appendChild(document.createTextNode(jsonData[i].id));
    newQuestionDiv.appendChild(document.createTextNode(jsonData[i].ques));
    choiceAnswerDiv.appendChild(document.createTextNode(jsonData[i].ans));

    //Appending all divs in the parent div
    div.appendChild(newSrDiv);
    div.appendChild(newQuestionDiv);
    div.appendChild(newAnswerDiv);
    div.appendChild(choiceAnswerDiv);
    container[0].appendChild(div);
  }

  //calling Drag handler function
  init();
}
function init() {
  var choiceBoxes = document.getElementsByClassName('choiceData');
  var answerBoxes = document.getElementsByClassName('answerData');
  // for (item of choiceBoxes) {

  //   item.addEventListener('dragstart', (e) => {
  //     console.log('Drag Start');
  //     e.target.className += ' hold';
  //     setTimeout(() => e.target.display = 'none', 0);
  //   })
  //   item.addEventListener('dragend', (e) => {
  //     e.target.className = 'item';
  //     setTimeout(() => e.target.display = 'none', 0);
  //     console.log('Drag End');
  //   });

  //   for (box of answerBoxes) {
  //     box.addEventListener('dragover', (e) => {
  //       e.preventDefault();
  //       console.log('Drag Over');

  //     });
  //     box.addEventListener('dragenter', () => {
  //       console.log('Drag Enter');

  //     });
  //     box.addEventListener('dragleave', () => {
  //       console.log('Drag Leave');

  //     });
  //     box.addEventListener('drop', (e) => {
  //       e.target.append(item);
  //       console.log('Drop');

  //     });

  //   }
  // }
    const options = document.querySelectorAll('.choiceData');
    const ans = document.querySelectorAll('.answerData');
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
  
}