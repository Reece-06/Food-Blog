let ingDeleteBtns = document.querySelectorAll(".delete-set-btn");
let ingAddSetBtn = document.querySelector(".add-set-btn");
const ingAddBtns = document.querySelectorAll(".add-ingredient-btn");

// Increase element Id or Name
const increaseElementAttribute = (element, toChange) => {
  let elementArr;
  if (toChange === "id") {
    elementArr = element.id.split("-");
  } else if (toChange === "name") {
    elementArr = element.name.split("-");
  } else {
    elementArr = element.getAttribute("for").split("-");
  }
  const elementArrLength = elementArr.length - 2;

  elementArr[elementArrLength] = Number(elementArr[elementArrLength]) + 1;

  const newElementId = elementArr.join("-");
  return newElementId;
};
// Changes buttons ids and names
// const changeButtonsDuplicateAttributes = (element) => {
//   const delSetBtn = element.querySelector(".delete-set-btn");
//   const delIngBtn = element.querySelector(".delete-ingredient-btn");
//   const addIngBtn = element.querySelector(".add-ingredient-btn");
//   const newDelSetBtnId = increaseElementAttribute(delSetBtn, "id");
//   const newDelSetBtnName = increaseElementAttribute(delSetBtn, "name");
//   const newDelIngBtnId = increaseElementAttribute(delIngBtn, "id");
//   const newDelIngBtnName = increaseElementAttribute(delIngBtn, "name");
//   const newAddIngBtnId = increaseElementAttribute(addIngBtn, "id");
//   const newAddIngBtnName = increaseElementAttribute(addIngBtn, "name");
//   delSetBtn.id = newDelSetBtnId;
//   delSetBtn.name = newDelSetBtnName;
//   delIngBtn.id = newDelIngBtnId;
//   delIngBtn.name = newDelIngBtnName;
//   addIngBtn.id = newAddIngBtnId;
//   addIngBtn.name = newAddIngBtnName;
// };
// Changes for attribute
const changeLablelsDuplicateAttributes = (element) => {
  const setNameLabel = element.querySelector(".ing-set-name-label ");
  const quantityLabel = element.querySelector(".ing-quantity-label");
  const measureLabel = element.querySelector(".ing-measure-label");
  const ingNameLabel = element.querySelector(".ing-name-label");
  const ingDetailsLabel = element.querySelector(".ingredient-dets-label");
  const newSetNameLabelFor = increaseElementAttribute(setNameLabel, "for");
  const newQuantityLabelFor = increaseElementAttribute(quantityLabel, "for");
  const newMeasureLabelFor = increaseElementAttribute(measureLabel, "for");
  const newIngNameLabelFor = increaseElementAttribute(ingNameLabel, "for");
  const newIngDetailsLabelFor = increaseElementAttribute(
    ingDetailsLabel,
    "for"
  );
  setNameLabel.setAttribute("for", newSetNameLabelFor);
  quantityLabel.setAttribute("for", newQuantityLabelFor);
  measureLabel.setAttribute("for", newMeasureLabelFor);
  ingNameLabel.setAttribute("for", newIngNameLabelFor);
  ingDetailsLabel.setAttribute("for", newIngDetailsLabelFor);
};
// Changes ids and names of input el
const changeInputsDuplicateAttributes = (element) => {
  const setNameInput = element.querySelector(".set-name-input");
  const quantityInput = element.querySelector(".ingredient-qty-input");
  const measureInput = element.querySelector(".measurement-input");
  const ingNameInput = element.querySelector(".ing-name-input");
  const ingDetailsInput = element.querySelector(".ing-details-input");
  const newSetNameInputId = increaseElementAttribute(setNameInput, "id");
  const newSetNameInputName = increaseElementAttribute(setNameInput, "name");
  const newQuantityInputId = increaseElementAttribute(quantityInput, "id");
  const newQuantityInputName = increaseElementAttribute(quantityInput, "name");
  const newMeasureInputId = increaseElementAttribute(measureInput, "id");
  const newMeasureInputName = increaseElementAttribute(measureInput, "name");
  const newIngNameInputId = increaseElementAttribute(ingNameInput, "id");
  const newIngNameInputName = increaseElementAttribute(ingNameInput, "name");
  const newIngDetsInputId = increaseElementAttribute(ingDetailsInput, "id");
  const newIngDetsInputName = increaseElementAttribute(ingDetailsInput, "name");
  setNameInput.id = newSetNameInputId;
  setNameInput.name = newSetNameInputName;
  quantityInput.id = newQuantityInputId;
  quantityInput.name = newQuantityInputName;
  measureInput.id = newMeasureInputId;
  measureInput.name = newMeasureInputName;
  ingNameInput.id = newIngNameInputId;
  ingNameInput.name = newIngNameInputName;
  ingDetailsInput.id = newIngDetsInputId;
  ingDetailsInput.name = newIngDetsInputName;
};
// Changes ids and names of duplicate ids
const changeElementsDuplicateAttributes = (element) => {
  // Buttons
  // changeButtonsDuplicateAttributes(element);
  // Labels
  changeLablelsDuplicateAttributes(element);
  // Inputs
  changeInputsDuplicateAttributes(element);
};
// Remove 2nd to last rows of Inputs if any
const removeLastIngredientInputs = (ingSet) => {
  const parentInputs = ingSet.querySelector(".ingredient-inputs");

  const delButtons = parentInputs.querySelectorAll(".delete-ingredient-btn");
  const numOfDelButtons = delButtons.length;
  if (numOfDelButtons > 1) {
    const firstDelButton = delButtons[0];
    let delBtnNextSib = firstDelButton.nextElementSibling;
    while (delBtnNextSib !== null) {
      const nextSib = delBtnNextSib.nextElementSibling;
      delBtnNextSib.remove();
      delBtnNextSib = nextSib;
    }
  }

  return ingSet;
};
// Adds Ingredient set and a divider
const addIngredientsSet = () => {
  const lastIngredientSetEl = document.querySelector(
    ".ingredient-set:last-of-type"
  );
  const lastHrEl = document.querySelector(
    ".divider-create-recipe:last-of-type"
  );

  let newIngredientSetEl = lastIngredientSetEl.cloneNode(true);

  newIngredientSetEl = removeLastIngredientInputs(newIngredientSetEl);
  let newLastHrEl = lastHrEl.cloneNode();

  newLastHrEl = lastIngredientSetEl.insertAdjacentElement(
    "afterend",
    newLastHrEl
  );

  newIngredientSetEl = newLastHrEl.insertAdjacentElement(
    "afterend",
    newIngredientSetEl
  );

  changeElementsDuplicateAttributes(newIngredientSetEl);
};
// Deletes Ingredient set
const deleteIngredientSet = (event) => {
  const btnParent = event.target.parentElement;
  const btnIngSetParent = btnParent.parentElement;

  if (
    btnIngSetParent.nextElementSibling !== null &&
    btnIngSetParent.nextElementSibling.nodeName !== "BUTTON"
  ) {
    btnIngSetParent.nextElementSibling.remove();
  } else {
    console.log("run");
    btnIngSetParent.previousElementSibling.remove();
  }
  btnIngSetParent.remove();
};
// get last element
const getLastElement = (parent, elSelector) => {
  const elements = parent.querySelectorAll(elSelector);
  return elements[elements.length - 1];
};
// insert Labels and hide them
const insertNewLabels = (parent) => {
  const qtyLabel = getLastElement(parent, ".ing-quantity-label");

  const measureLabel = getLastElement(parent, ".ing-measure-label");
  const ingNameLabel = getLastElement(parent, ".ing-name-label");
  const ingDetsLabel = getLastElement(parent, ".ingredient-dets-label");
  let newQtyLabel = qtyLabel.cloneNode(true);
  let newMeasureLabel = measureLabel.cloneNode(true);
  let newIngNameLabel = ingNameLabel.cloneNode(true);
  let newIngDetsLabel = ingDetsLabel.cloneNode(true);

  newQtyLabel.classList.add("hidden-label");
  newMeasureLabel.classList.add("hidden-label");
  newIngNameLabel.classList.add("hidden-label");
  newIngDetsLabel.classList.add("hidden-label");

  parent.insertAdjacentElement("beforeend", newQtyLabel);
  parent.insertAdjacentElement("beforeend", newMeasureLabel);
  parent.insertAdjacentElement("beforeend", newIngNameLabel);
  parent.insertAdjacentElement("beforeend", newIngDetsLabel);
  return [newQtyLabel, newMeasureLabel, newIngNameLabel, newIngDetsLabel];
};
// Insert Inputs
const insertInputs = (parent) => {
  const qtyInput = getLastElement(parent, ".ingredient-qty-input");
  const measureInput = getLastElement(parent, ".ing-measure-input-container");
  const ingNameInput = getLastElement(parent, ".ing-name-input");
  const ingDetsInput = getLastElement(parent, ".ing-details-input");

  let newQtyInput = qtyInput.cloneNode();
  let newMeasureInput = measureInput.cloneNode(true);
  let newIngNameInput = ingNameInput.cloneNode();
  let newIngDetsInput = ingDetsInput.cloneNode();

  parent.insertAdjacentElement("beforeend", newQtyInput);
  parent.insertAdjacentElement("beforeend", newMeasureInput);
  parent.insertAdjacentElement("beforeend", newIngNameInput);
  parent.insertAdjacentElement("beforeend", newIngDetsInput);
  return [newQtyInput, newMeasureInput, newIngNameInput, newIngDetsInput];
};
// Insert ingredient inputs delete button
const insertIngDelButton = (parent) => {
  const delIngBtn = getLastElement(parent, ".delete-ingredient-btn");

  let newIngDelBtn = delIngBtn.cloneNode(true);

  parent.insertAdjacentElement("beforeend", newIngDelBtn);
};
// Change ids and names of newly added ingrdient inputs
const changeDuplicateAttriOfAddedIng = (elements, lastInputEl) => {
  const splitIdArr = lastInputEl.id.split("-");
  const lastNum = Number(splitIdArr[splitIdArr.length - 1]);
  elements.forEach((element, index) => {
    const newNum = lastNum + index + 1;

    if (element.nodeName === "LABEL") {
      const currentForArr = element.getAttribute("for").split("-");
      currentForArr[currentForArr.length - 1] = newNum;
      const newId = currentForArr.join("-");
      element.setAttribute("for", newId);
    } else {
      const currentIdArr = element.id.split("-");
      currentIdArr[currentIdArr.length - 1] = newNum;
      const newId = currentIdArr.join("-");
      element.id = newId;
      element.name = newId;
    }
  });
};
// Add Ingredient inputs and labels
const addIngredientInputs = (event) => {
  const parentInputs = event.currentTarget.previousElementSibling;
  const innerGridInputs = parentInputs.firstElementChild;
  const lastInputEl = innerGridInputs.querySelector(
    ".ing-details-input:last-of-type"
  );
  console.log(lastInputEl);

  const newLabelsArr = insertNewLabels(innerGridInputs);

  const newInputsArr = insertInputs(innerGridInputs);
  insertIngDelButton(innerGridInputs);
  const newElementsArr = newLabelsArr.concat(newInputsArr);
  console.log(newElementsArr);
  changeDuplicateAttriOfAddedIng(newElementsArr, lastInputEl);
};
ingDeleteBtns.forEach((ingDelBtn) => {
  ingDelBtn.addEventListener("click", deleteIngredientSet);
});
ingAddSetBtn.addEventListener("click", addIngredientsSet);
ingAddBtns.forEach((ingAddBtn) => {
  ingAddBtn.addEventListener("click", addIngredientInputs);
});
