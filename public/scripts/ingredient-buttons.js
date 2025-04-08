let ingDeleteBtns = document.querySelectorAll(".delete-set-btn");
let ingAddSetBtn = document.querySelector(".add-set-btn");

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
ingDeleteBtns.forEach((ingDelBtn) => {
  ingDelBtn.addEventListener("click", deleteIngredientSet);
});
ingAddSetBtn.addEventListener("click", addIngredientsSet);
