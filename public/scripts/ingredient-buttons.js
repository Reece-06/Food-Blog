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
// Adds Event Listener to buttons of new Ingredient Set
const addIngredientAndDeleteListener = (delSetBtn, addIngBtn) => {
  delSetBtn.addEventListener("click", deleteIngredientSet);
  addIngBtn.addEventListener("click", addIngredientInputs);
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

  const newDelSetBtn = newIngredientSetEl.querySelector(".delete-set-btn ");
  const newIngBtn = newIngredientSetEl.querySelector(".add-ingredient-btn");
  addIngredientAndDeleteListener(newDelSetBtn, newIngBtn);
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
  let newMeasureDiv = measureInput.cloneNode(true);
  let newIngNameInput = ingNameInput.cloneNode();
  let newIngDetsInput = ingDetsInput.cloneNode();

  parent.insertAdjacentElement("beforeend", newQtyInput);
  parent.insertAdjacentElement("beforeend", newMeasureDiv);
  parent.insertAdjacentElement("beforeend", newIngNameInput);
  parent.insertAdjacentElement("beforeend", newIngDetsInput);
  // Gets the Select input field
  const newMeasureInput = newMeasureDiv.querySelector(".measurement-input");

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
    const labelEl = element.label;
    const inputEl = element.input;

    const labelArr = labelEl.getAttribute("for").split("-");
    labelArr[labelArr.length - 1] = newNum;
    const newLabelId = labelArr.join("-");
    labelEl.setAttribute("for", newLabelId);

    const inputArr = inputEl.id.split("-");
    inputArr[inputArr.length - 1] = newNum;
    const newInputId = inputArr.join("-");
    inputEl.id = newInputId;
    inputEl.name = newInputId;
  });
};
// Organize Ingredients inputs and labels
const organizeIngInputsAndLabels = (labelsArr, inputsArr) => {
  let newArr = [];
  labelsArr.forEach((label, i) => {
    const newObj = {
      label: label,
      input: inputsArr[i],
    };
    newArr.push(newObj);
  });
  return newArr;
};
// Add Ingredient inputs and labels
const addIngredientInputs = (event) => {
  const parentInputs = event.currentTarget.previousElementSibling;
  const innerGridInputs = parentInputs.firstElementChild;
  const lastInputEl = innerGridInputs.querySelector(
    ".ing-details-input:last-of-type"
  );

  const newLabelsArr = insertNewLabels(innerGridInputs);

  const newInputsArr = insertInputs(innerGridInputs);
  insertIngDelButton(innerGridInputs);

  const newElementsArr = organizeIngInputsAndLabels(newLabelsArr, newInputsArr);

  changeDuplicateAttriOfAddedIng(newElementsArr, lastInputEl);
};
ingDeleteBtns.forEach((ingDelBtn) => {
  ingDelBtn.addEventListener("click", deleteIngredientSet);
});
ingAddSetBtn.addEventListener("click", addIngredientsSet);
ingAddBtns.forEach((ingAddBtn) => {
  ingAddBtn.addEventListener("click", addIngredientInputs);
});
