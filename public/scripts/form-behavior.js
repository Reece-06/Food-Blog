import { storeData } from "./store-create-recipe.js";
import { hideCreateRecipeModal } from "./create-recipe.js";
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
  // changes button label
  const changeButtonLabel = (currentPageNum) => {
    const buttonLabel = ["Next", "Submit"];

    if (currentPageNum === 4) {
      nextBtnText.textContent = buttonLabel[1];
      nextBtn.classList.add("hide-arrow-icon");
    } else {
      if (nextBtnText.textContent !== buttonLabel[0]) {
        nextBtnText.textContent = buttonLabel[0];
      }

      if (nextButton.classList.contains("hide-arrow-icon")) {
        nextBtn.classList.remove("hide-arrow-icon");
      }
    }
  };
  // changes form label text
  const changeFormLabel = (
    currentPageNum,
    firstLabel,
    secondLabel,
    thirdLabel,
    fourthLabel
  ) => {
    if (currentPageNum === 2) {
      formLabel.textContent = secondLabel;
    } else if (currentPageNum === 3) {
      formLabel.textContent = thirdLabel;
    } else if (currentPageNum === 4) {
      formLabel.textContent = fourthLabel;
    } else {
      formLabel.textContent = firstLabel; // Default case
    }
  };
  // Changes the input forms
  const changeForm = (currentPageNum, prevPageNum) => {
    const showFormArr = ["show", "form"];
    const newShowFormArr = [...showFormArr, currentPageNum];
    const newShowFormClass = newShowFormArr.join("-");
    const oldShowFormArr = [...showFormArr, prevPageNum];
    const oldShowFormClass = oldShowFormArr.join("-");

    createRecipeform.classList.remove(oldShowFormClass);
    createRecipeform.classList.add(newShowFormClass);
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

    if (btnIdObj.prevNum === 4) {
      storeData(btnIdObj.prevNum);

      hideCreateRecipeModal();
    } else {
      nextBtn.id = btnIdObj.newBtnId;

      changeFormLabel(btnIdObj.lastNum, ...formLabelArr);

      changeForm(btnIdObj.lastNum, btnIdObj.prevNum);

      changeButtonLabel(btnIdObj.lastNum);

      // storeData(btnIdObj.prevNum);
    }
  };

  nextBtn.addEventListener("click", showNextForm);
});
