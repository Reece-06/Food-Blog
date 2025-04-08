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
  const elementArrLength = elementArr.length - 1;

  elementArr[elementArrLength] = Number(elementArr[elementArrLength]) + 1;

  const newElementId = elementArr.join("-");
  return newElementId;
};
// Changes buttons ids and names
const changeButtonsDuplicateAttributes = (element) => {
  const delSetBtn = element.querySelector(".delete-set-btn");
  const delIngBtn = element.querySelector(".delete-ingredient-btn");
  const addIngBtn = element.querySelector(".add-ingredient-btn");
  const newDelSetBtnId = increaseElementAttribute(delSetBtn, "id");
  const newDelSetBtnName = increaseElementAttribute(delSetBtn, "name");
  const newDelIngBtnId = increaseElementAttribute(delIngBtn, "id");
  const newDelIngBtnName = increaseElementAttribute(delIngBtn, "name");
  const newAddIngBtnId = increaseElementAttribute(addIngBtn, "id");
  const newAddIngBtnName = increaseElementAttribute(addIngBtn, "name");
  delSetBtn.id = newDelSetBtnId;
  delSetBtn.name = newDelSetBtnName;
  delIngBtn.id = newDelIngBtnId;
  delIngBtn.name = newDelIngBtnName;
  addIngBtn.id = newAddIngBtnId;
  addIngBtn.name = newAddIngBtnName;
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
  // Buttons
  changeButtonsDuplicateAttributes(element);
  // Labels
  changeLablelsDuplicateAttributes(element);
  // Inputs
  changeInputsDuplicateAttributes(element);
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
  console.log(event.target);
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
// Add Ingredient inputs and labels
const addIngredientInputs = (event) => {
  const parentInputs = event.currentTarget.previousElementSibling;
  const innerGridInputs = parentInputs.firstElementChild;

  const qtyLabel = getLastElement(innerGridInputs, ".ing-quantity-label");

  const measureLabel = getLastElement(innerGridInputs, ".ing-measure-label");
  const ingNameLabel = getLastElement(innerGridInputs, ".ing-name-label");
  const ingDetsLabel = getLastElement(
    innerGridInputs,
    ".ingredient-dets-label"
  );

  const qtyInput = getLastElement(innerGridInputs, ".ingredient-qty-input");
  const measureInput = getLastElement(
    innerGridInputs,
    ".ing-measure-input-container"
  );
  const ingNameInput = getLastElement(innerGridInputs, ".ing-name-input");
  const ingDetsInput = getLastElement(innerGridInputs, ".ing-details-input");
  const delIngBtn = getLastElement(innerGridInputs, ".delete-ingredient-btn");

  let newQtyLabel = qtyLabel.cloneNode(true);
  let newMeasureLabel = measureLabel.cloneNode(true);
  let newIngNameLabel = ingNameLabel.cloneNode(true);
  let newIngDetsLabel = ingDetsLabel.cloneNode(true);
  let newQtyInput = qtyInput.cloneNode();
  let newMeasureInput = measureInput.cloneNode(true);
  let newIngNameInput = ingNameInput.cloneNode();
  let newIngDetsInput = ingDetsInput.cloneNode();
  let newIngDelBtn = delIngBtn.cloneNode(true);
  innerGridInputs.insertAdjacentElement("beforeend", newQtyLabel);
  innerGridInputs.insertAdjacentElement("beforeend", newMeasureLabel);
  innerGridInputs.insertAdjacentElement("beforeend", newIngNameLabel);
  innerGridInputs.insertAdjacentElement("beforeend", newIngDetsLabel);

  innerGridInputs.insertAdjacentElement("beforeend", newQtyInput);
  innerGridInputs.insertAdjacentElement("beforeend", newMeasureInput);
  innerGridInputs.insertAdjacentElement("beforeend", newIngNameInput);
  innerGridInputs.insertAdjacentElement("beforeend", newIngDetsInput);
  innerGridInputs.insertAdjacentElement("beforeend", newIngDelBtn);

  console.log(parentInputs);
  console.log(innerGridInputs);
  console.log(newQtyLabel);
};
ingDeleteBtns.forEach((ingDelBtn) => {
  ingDelBtn.addEventListener("click", deleteIngredientSet);
});
ingAddSetBtn.addEventListener("click", addIngredientsSet);
ingAddBtns.forEach((ingAddBtn) => {
  ingAddBtn.addEventListener("click", addIngredientInputs);
});
