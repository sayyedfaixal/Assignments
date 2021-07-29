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
    // console.log(jsonData.questionsData);
    const Test = function () {
        var mainContainer = document.getElementById("mainContainer");
        mainContainer.innerHTML = "";
        // console.log(mainContainer);
        {/* 
        <button id="resetBtn" disabled="true"></button>
        <button id="showmeBtn" disabled="true"></button>
        <button id="submitBtn"></button> */}

        var headerContainer = document.getElementById("heading-container");
        headerContainer.innerHTML = "";

        var headerDiv = document.createElement("div");
        var headerH3 = document.createElement("h3");
        var headerP = document.createElement("p");
        var closeDiv = document.createElement("div");
        var pCloseDiv = document.createElement("p");
        var detailsDiv = document.createElement("div");
        var detailInfoDiv = document.createElement("div");
        var detailHr = document.createElement("hr");
        var detailHeadTitle = document.createElement("div");
        var detailHeadInfo = document.createElement("div");
        var strongSubmit = document.createElement("strong");

        // Adding respective classess and Inner Text
        detailInfoDiv.classList.add("info");
        detailInfoDiv.innerText = "Check Your Knowledge";
        detailHr.classList.add("dash");
        detailHeadTitle.classList.add("head-title");
        detailHeadTitle.innerText = "Match the relevant area to its characteristic feature";

        strongSubmit.innerText = "Submit";
        detailHeadInfo.classList.add("head-info");
        detailHeadInfo.append(strongSubmit)
        detailHeadInfo.innerText = "When you're done, click ";

        detailsDiv.classList.add("details");
        detailsDiv.append(detailInfoDiv, detailHr, detailHeadTitle, detailHeadInfo);
        pCloseDiv.classList.add("cls");
        pCloseDiv.innerText = "CLOSE";
        closeDiv.classList.add("btn-close", "close");
        closeDiv.innerText = "×";
        headerP.classList.add("sub-title");
        headerP.innerText = "Analyze"
        headerH3.classList.add("title");
        headerH3.innerText = "Six Sigma IV - DMAIC - Go!";
        headerDiv.classList.add("header");

        detailHeadInfo.append(strongSubmit);
        closeDiv.append(pCloseDiv);
        headerDiv.append(headerH3, headerP, closeDiv);

        headerContainer.append(headerDiv, detailsDiv)

        for (let i = 0; i < jsonData.questionsData.length; i++) {

            // Creating Requeired elememts 
            var containerDiv = document.createElement("div");
            var box1Div = document.createElement("div");
            var box2Div = document.createElement("div");
            var box3Div = document.createElement("div");
            var box4Div = document.createElement("div");
            var input1 = document.createElement("input");
            var input2 = document.createElement("input");
            var label1 = document.createElement("label");
            var label2 = document.createElement("label");
            var correctImg = document.createElement("img");
            var wrongImg = document.createElement("img");

            correctImg.src = jsonData.correct;
            wrongImg.src = jsonData.incorrect;

            correctImg.classList.add("hide");
            wrongImg.classList.add("hide");

            correctImg.classList.add("img");
            wrongImg.classList.add("img");
            // ansImg${id}true
            // ansImg${id}false
            correctImg.classList.add(`ansImg${jsonData.questionsData[i].id}true`);
            wrongImg.classList.add(`ansImg${jsonData.questionsData[i].id}false`);
            // Adding respective classes to the elememts
            containerDiv.classList.add("container");
            box1Div.classList.add("box1");
            box2Div.classList.add("box2");
            box3Div.classList.add("box3");
            box4Div.classList.add("box4");
            input1.classList.add("radioBtns");
            input2.classList.add("radioBtns");
            Object.assign(input1, { id: `trueBtn${jsonData.questionsData[i].id - 1}`, type: 'radio', value: 'true', name: `row${jsonData.questionsData[i].id}` });
            Object.assign(input2, { id: `falseBtn${jsonData.questionsData[i].id - 1}`, type: 'radio', value: 'false', name: `row${jsonData.questionsData[i].id}` });
            label1.innerText = "True";
            label2.innerText = "False";

            box3Div.append(correctImg, input1, label1);
            box4Div.append(wrongImg, input2, label2);

            //Creating TextNode
            var id = document.createTextNode(jsonData.questionsData[i].id);
            box1Div.appendChild(id);
            var ques = document.createTextNode(jsonData.questionsData[i].ques);
            box2Div.appendChild(ques);
            containerDiv.append(box1Div, box2Div, box3Div, box4Div);
            mainContainer.append(containerDiv);
            // console.log(containerDiv);
        }


        //Adding event listener on Buttons
        var submitBtnEn = document.getElementById("submitBtn");
        submitBtnEn.addEventListener("click", submit);

        var resetBtnEn = document.getElementById("resetBtn");
        resetBtnEn.addEventListener("click", reset);

        var showMeEn = document.getElementById("showmeBtn");
        showMeEn.addEventListener("click", showMe);

        var radioButtons = document.querySelectorAll(".radioBtns");
        var correctAns = jsonData.answers;
        function submit() {

            let wrongAns = 0;
            let ansImg = "";
            let ourAns = [];
            radioButtons.forEach((btn) => {
                if (btn.checked) {
                    ourAns.push(btn.value);
                }
            });
            for (let i = 0; i < jsonData.questionsData.length; i++) {
                ansImg = document.querySelector(`.ansImg${i + 1}${ourAns[i]}`);
                if (ourAns[i] === correctAns[i]) {
                    ansImg.classList.remove("hide");
                    ansImg.src = jsonData.correct;
                } else {
                    wrongAns++;
                    ansImg.classList.remove("hide");
                    ansImg.src = jsonData.incorrect;
                }
            }
            if (wrongAns >= 3) {
                showmeBtn.disabled = false;
                showmeBtn.style.background = `url(${jsonData.btnShowmeEnabled}) no-repeat`;
                showmeBtn.style.backgroundSize = "100% 100%";
            }
            if (wrongAns === 0) {
                alert("That's Correct");
            } else {
                alert("Not Quiet! try again");
            }
            disableSubmitBtn();

        }
        var remImg = document.querySelectorAll(".img");
        function reset() {
            var ele = document.getElementsByTagName("input");
            for (var i = 0; i < ele.length; i++) {
                ele[i].checked = false;
            }
            remImg.forEach((img) => {
                img.classList.add("hide");
            })
            disableShowmeBtn();
            disableResetBtn();
            disableSubmitBtn();
        }
        function showMe() {
            // alert('Clicked on Show me');
            remImg.forEach((remImg) => {
                remImg.classList.add("hide");
            });
            for (let i = 0; i < jsonData.questionsData.length; i++) {
                if (correctAns[i] === "true") {
                    document.getElementById(`trueBtn${i}`).checked = true;
                } else {
                    document.getElementById(`falseBtn${i}`).checked = true;
                }
            }
            disableSubmitBtn();
            disableShowmeBtn();
        }

        var resetBtn = document.getElementById("resetBtn");

        var showBtn = document.getElementById("showmeBtn");

        var submitBtn = document.getElementById("submitBtn");
        disableShowmeBtn();
        disableResetBtn();
        disableSubmitBtn();

        function disableResetBtn() {
            resetBtn.disabled = true;
            resetBtn.style.background = `url(${jsonData.btnResetDisabled}) no-repeat`;
            resetBtn.style.backgroundSize = "100% 100%";
        }
        function disableShowmeBtn() {
            showBtn.disabled = true;
            showBtn.style.background = `url(${jsonData.btnShowmeDisabled}) no-repeat`;
            showBtn.style.backgroundSize = "100% 100%";
        }
        function disableSubmitBtn() {
            submitBtn.disabled = true;
            submitBtn.style.background = `url(${jsonData.btnSubmitDisabled}) no-repeat`;
            submitBtn.style.backgroundSize = "100% 100%";
        }

        radioButtons.forEach((btn) => {
            btn.addEventListener("change", () => {
                let count = 0;
                for (let i = 1; i <= jsonData.questionsData.length; i++) {
                    const radioBtn = document.querySelectorAll(
                        `input[name='row${i}']`
                    );
                    if (radioBtn[0].checked || radioBtn[1].checked) {
                        count++;
                    }
                    if (count === jsonData.questionsData.length) {
                        submitBtn.disabled = false;
                        submitBtn.style.background = `url(${jsonData.btnSubmitEnabled}) no-repeat`;
                        submitBtn.style.backgroundSize = "100% 100%";
                    }
                }
            });
        });

        radioButtons.forEach((btn) => {
            btn.addEventListener("change", () => {
                if (btn.checked) {
                    resetBtn.disabled = false;
                    resetBtn.style.background = `url(${jsonData.btnResetEnabled}) no-repeat`;
                    resetBtn.style.backgroundSize = "100% 100%";
                }
            });
        });
    }

    const app = new Test();

}
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