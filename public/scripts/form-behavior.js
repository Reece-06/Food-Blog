document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".next-btn");
  const createRecipeform = document.querySelector(".create-form");
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

  // Shows the next form and hides the previous
  const showNextForm = (event) => {
    const btnId = nextBtn.id;

    const btnIdObj = increaseBtnId(btnId);

    nextBtn.id = btnIdObj.newBtnId;

    const showFormArr = ["show", "form"];
    const newShowFormArr = [...showFormArr, btnIdObj.lastNum];
    const newShowFormClass = newShowFormArr.join("-");
    const oldShowFormArr = [...showFormArr, btnIdObj.prevNum];
    const oldShowFormClass = oldShowFormArr.join("-");
    console.log(typeof oldShowFormClass);
    createRecipeform.classList.remove(oldShowFormClass);
    createRecipeform.classList.add(newShowFormClass);
  };

  nextBtn.addEventListener("click", showNextForm);
});
