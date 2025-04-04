document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".next-btn");
  const createRecipeform = document.querySelector(".create-form");
  const formLabel = document.querySelector(".form-label");
  const nextButton = document.querySelector(".next-btn");
  const nextBtnText = document.querySelector(".next-button-text");
  // Changes the btn id
  const increaseBtnId = (btnId) => {
    const splitBtnId = btnId.split("-");

    const lastIndex = splitBtnId.length - 1;

    const lastNumber = Number(splitBtnId[lastIndex]);
    let newNumber = 0;

    if (lastNumber !== 4) {
      newNumber = lastNumber + 1;
    } else {
      newNumber = 1;
    }

    splitBtnId[lastIndex] = newNumber.toString();

    const btnIdObj = {
      newBtnId: splitBtnId.join("-"),
      prevNum: lastNumber,
      lastNum: newNumber,
    };
    return btnIdObj;
  };
  const changeButtonLabel = (currentPageNum) => {
    const buttonLabel = ["Next", "Submit"];

    if (currentPageNum === 4) {
      nextBtnText.textContent = buttonLabel[1];
      nextBtn.classList.add("hide-arrow-icon");
    } else {
      if (nextBtnText.textContent !== buttonLabel[0]) {
        console.log("not next text");
        nextBtnText.textContent = buttonLabel[0];
      }

      if (nextButton.classList.contains("hide-arrow-icon")) {
        console.log("hidden arrow");
        nextBtn.classList.remove("hide-arrow-icon");
      }
    }
  };
  const changeFormLabel = (
    currentPageNum,
    firstLabel,
    secondLabel,
    thirdLabel,
    fourthLabel
  ) => {
    if (currentPageNum === 2) {
      return secondLabel;
    } else if (currentPageNum === 3) {
      return thirdLabel;
    } else if (currentPageNum === 4) {
      return fourthLabel;
    } else {
      return firstLabel; // Default case
    }
  };
  // Shows the next form and hides the previous
  const showNextForm = (event) => {
    const formLabelArr = [
      "Basic Info",
      "Ingredients",
      "Instructions",
      "Nutrition",
    ];

    const btnId = nextBtn.id;
    const btnIdObj = increaseBtnId(btnId); // button id info

    const newFormLabel = changeFormLabel(btnIdObj.lastNum, ...formLabelArr);
    formLabel.textContent = newFormLabel; // changes form label text

    nextBtn.id = btnIdObj.newBtnId;

    const showFormArr = ["show", "form"];
    const newShowFormArr = [...showFormArr, btnIdObj.lastNum];
    const newShowFormClass = newShowFormArr.join("-");
    const oldShowFormArr = [...showFormArr, btnIdObj.prevNum];
    const oldShowFormClass = oldShowFormArr.join("-");

    createRecipeform.classList.remove(oldShowFormClass);
    createRecipeform.classList.add(newShowFormClass);

    changeButtonLabel(btnIdObj.lastNum);
  };

  nextBtn.addEventListener("click", showNextForm);
});
