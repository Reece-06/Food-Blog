import { showCreateRecipeModal } from "./create-recipe.js";
import { addDelBtnListener } from "./instruction-buttons.js";
import {
  addIngredientAndDeleteListener,
  deleteIngredientInputs,
} from "./ingredient-buttons.js";
// Retrieve recipe from the server
const retreiveData = async (recipeId) => {
  try {
    const result = await fetch(`/api/getRecipe/${recipeId}`, {
      method: "GET",
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error retrieving recipe:", error);
    return null;
  }
};
// Reenables del btns if del btn is more than 1
const reenableDelBtns = () => {
  const allDelBtns = document.querySelectorAll(".delete-instruction-btn");
  if (allDelBtns.length > 1) {
    allDelBtns.forEach((delBtn) => {
      const isDisabled = delBtn.getAttribute("disabled") !== null;

      if (isDisabled) {
        delBtn.removeAttribute("disabled");
      }
    });
  }
};
// Add instruction inputs based on the instruction length
const addInstructionInputs = (insLen) => {
  let numOfExistingIns = 1; // Default 1 existing
  while (numOfExistingIns < insLen) {
    const insContainerEls = document.querySelectorAll(
      ".instruction-input-container"
    );
    const lastInsContainer = insContainerEls[insContainerEls.length - 1];

    const newInsContainer = lastInsContainer.cloneNode(true);
    const newDelBtn = newInsContainer.querySelector(".delete-instruction-btn");
    const newInsInput = newInsContainer.querySelector(".instruction-input");

    const newInsLabel = newInsContainer.querySelector(".ins-label");

    const idArr = newInsInput.id.split("-");
    const lastNum = Number(idArr[idArr.length - 1]);

    newInsInput.id = "instruction-" + (lastNum + 1);
    newInsInput.name = "instruction-" + (lastNum + 1);
    newInsLabel.setAttribute("for", "instruction-" + (lastNum + 1));

    lastInsContainer.parentNode.insertBefore(
      newInsContainer,
      lastInsContainer.nextSibling
    );
    addDelBtnListener(newDelBtn);
    numOfExistingIns++;
  }
  reenableDelBtns();
};

// Populate instructions
const populateInstructions = (instructions) => {
  const instructionLen = instructions.length;
  addInstructionInputs(instructionLen);

  const insInputs = document.querySelectorAll(".instruction-input");
  insInputs.forEach((inputEl, i) => {
    inputEl.value = instructions[i];
  });
};
// Populate times cooktime or preptime
const populateTimeInputs = (timeArr, timeType) => {
  timeArr.forEach((el, i) => {
    let timeValue = Number(timeArr[i - 1]);
    if (el === "hrs") {
      document.querySelector("#" + timeType + "-hours").value = timeValue;
    } else if (el === "mins") {
      document.querySelector("#" + timeType + "-minutes").value = timeValue;
    } else {
      document.querySelector("#" + timeType + "-seconds").value = timeValue;
    }
  });
};

// Get all last labels and inputs
const getLastInputsLabels = (lastIngInputsEl) => {
  const qtyLabels = lastIngInputsEl.querySelectorAll(".ing-quantity-label");
  const qtyLabel = qtyLabels[qtyLabels.length - 1];

  const measureLabels = lastIngInputsEl.querySelectorAll(".ing-measure-label");
  const measureLabel = measureLabels[measureLabels.length - 1];

  const ingNameLabels = lastIngInputsEl.querySelectorAll(".ing-name-label");
  const ingNameLabel = ingNameLabels[ingNameLabels.length - 1];

  const ingDetsLabels = lastIngInputsEl.querySelectorAll(
    ".ingredient-dets-label"
  );
  const ingDetsLabel = ingDetsLabels[ingDetsLabels.length - 1];

  const ingQtyInputs = lastIngInputsEl.querySelectorAll(
    ".ingredient-qty-input"
  );
  const ingQtyInput = ingQtyInputs[ingQtyInputs.length - 1];

  const ingMeasureContainers = lastIngInputsEl.querySelectorAll(
    ".ing-measure-input-container"
  );
  const ingMeasureContainer =
    ingMeasureContainers[ingMeasureContainers.length - 1];

  const ingNameInputs = lastIngInputsEl.querySelectorAll(".ing-name-input");
  const ingNameInput = ingNameInputs[ingNameInputs.length - 1];

  const ingDetInputs = lastIngInputsEl.querySelectorAll(".ing-details-input");
  const ingDetInput = ingDetInputs[ingDetInputs.length - 1];
  const delBtns = lastIngInputsEl.querySelectorAll(".delete-ingredient-btn");
  const delBtn = delBtns[delBtns.length - 1];
  return [
    qtyLabel,
    measureLabel,
    ingNameLabel,
    ingDetsLabel,
    ingQtyInput,
    ingMeasureContainer,
    ingNameInput,
    ingDetInput,
    delBtn,
  ];
};
// Clone and insert ingredients labels and inputs
const insertInputsLabels = (inputsLabelsArr) => {
  let lastEl = inputsLabelsArr[inputsLabelsArr.length - 1];

  let newInputsLabels = [];
  inputsLabelsArr.forEach((el) => {
    const newEl = el.cloneNode(true);
    if (el.nodeName === "LABEL") {
      newEl.classList.add("hidden-label");
    }

    el.parentElement.insertBefore(newEl, lastEl.nextElementSibling);
    newInputsLabels.push(newEl);
    lastEl = newEl;
  });
  return newInputsLabels;
};
// Change Ingredient Input Values
const changeIngInputValues = (setInputVal, lastIngInputsEl) => {
  const ingQtyInputs = lastIngInputsEl.querySelectorAll(
    ".ingredient-qty-input"
  );
  const ingQtyInput = ingQtyInputs[ingQtyInputs.length - 1];

  const ingMeasureContainers = lastIngInputsEl.querySelectorAll(
    ".ing-measure-input-container"
  );
  const ingMeasureContainer =
    ingMeasureContainers[ingMeasureContainers.length - 1];
  const ingMeasureInput =
    ingMeasureContainer.querySelector(".measurement-input");
  const ingNameInputs = lastIngInputsEl.querySelectorAll(".ing-name-input");
  const ingNameInput = ingNameInputs[ingNameInputs.length - 1];

  const ingDetInputs = lastIngInputsEl.querySelectorAll(".ing-details-input");
  const ingDetInput = ingDetInputs[ingDetInputs.length - 1];

  ingQtyInput.value = setInputVal.quantity;
  ingMeasureInput.value = setInputVal.measurement;
  ingNameInput.value = setInputVal.ingName;
  ingDetInput.value = setInputVal.ingDetails;
};
// Change id, name, and for of other inputs
const changeOtherInputAttrs = (elements) => {
  const lastElement = elements[elements.length - 1];

  let lastElIdArr;
  if (lastElement.nodeName === "LABEL") {
    lastElIdArr = lastElement.getAttribute("for").split("-");
  } else {
    lastElIdArr = lastElement.id.split("-");
  }

  let lastNumber = Number(lastElIdArr[lastElIdArr.length - 1]);

  elements.forEach((el) => {
    const newNum = lastNumber + 1;

    let elIdArr;
    if (el.nodeName === "LABEL") {
      elIdArr = el.getAttribute("for").split("-");
    } else {
      elIdArr = el.id.split("-");
    }
    elIdArr[elIdArr.length - 1] = newNum;
    const newId = elIdArr.join("-");
    if (el.nodeName === "LABEL") {
      el.setAttribute("for", newId);
    } else {
      el.id = newId;
      el.name = newId;
    }

    lastNumber = newNum;
  });
};
// Change Ids names and fors of set Name
const changeSetNameAttrs = (newIngInputsEl) => {
  const setNameInput = newIngInputsEl.querySelector(".set-name-input");
  const setNameLabel = newIngInputsEl.querySelector(".ing-set-name-label");
  const setNameId = setNameInput.id;
  const setNameIdArr = setNameId.split("-");
  setNameIdArr[2] = Number(setNameIdArr[2]) + 1;
  const newId = setNameIdArr.join("-");
  setNameInput.id = newId;
  setNameInput.name = newId;
  setNameLabel.setAttribute("for", newId);
};
// Change set name value
const changeSetNameValue = (lastIngInputsEl, setNameVal) => {
  const setNameInput = lastIngInputsEl.querySelector(".set-name-input");
  setNameInput.value = setNameVal;
};
// Removes excess inputs, labels and del btns if any
const removeExcessInputs = (addedIngInputsEl) => {
  const ingInput = addedIngInputsEl.querySelector(".ingredient-inputs");

  const btnIndex = 8;
  Array.from(ingInput.children).forEach((el, i) => {
    if (!(el.nodeName === "BUTTON" && i === btnIndex) && i > 8) {
      el.remove();
    }
  });
};
// Change set number of newly added sets
const changeSetNum = (lastIngInputsEl) => {
  const ingInputs = lastIngInputsEl.querySelector(".ingredient-inputs");

  Array.from(ingInputs.children).forEach((el, i) => {
    let elIdArr;

    if (el.nodeName !== "BUTTON") {
      if (el.nodeName === "LABEL") {
        elIdArr = el.getAttribute("for").split("-");
        const newNum = Number(elIdArr[elIdArr.length - 2]) + 1;
        elIdArr[elIdArr.length - 2] = newNum;
        const newId = elIdArr.join("-");
        el.setAttribute("for", newId);
      } else if (el.nodeName === "INPUT") {
        elIdArr = el.id.split("-");
        const newNum = Number(elIdArr[elIdArr.length - 2]) + 1;
        elIdArr[elIdArr.length - 2] = newNum;
        const newId = elIdArr.join("-");
        el.id = newId;
        el.name = newId;
      } else {
        const input = el.querySelector(".measurement-input");
        elIdArr = input.id.split("-");
        const newNum = Number(elIdArr[elIdArr.length - 2]) + 1;
        elIdArr[elIdArr.length - 2] = newNum;
        const newId = elIdArr.join("-");
        input.id = newId;
        input.name = newId;
      }
    }
  });
};
// Disables del set btn if there are more than 1

const reenableDelSetBtn = () => {
  const delBtns = document.querySelectorAll(".delete-set-btn");
  const reenableDelBtn = delBtns.length > 1;
  if (reenableDelBtn) {
    delBtns.forEach((delBtn) => {
      delBtn.removeAttribute("disabled");
    });
  }
};

// Reenables ingredients del input btn
const reenableDelIngInput = () => {
  const ingInputsParent = document.querySelectorAll(".ingredient-inputs");

  ingInputsParent.forEach((parent) => {
    const delBtns = parent.querySelectorAll(".delete-ingredient-btn");
    const reenableBtns = delBtns.length > 1;

    if (reenableBtns) {
      delBtns.forEach((delBtn) => {
        delBtn.removeAttribute("disabled");
      });
    }
  });
};
// Add event listeners to newly added del btn sets
const addEventListenerToDelBtnSets = (lastSet) => {
  const delBtn = lastSet.querySelector(".delete-ingredient-btn");
  delBtn.addEventListener("click", deleteIngredientInputs);
};
// Add event listener to del btns on the second row or more
const addEventListenerToNewDelBtns = (delBtn) => {
  delBtn.addEventListener("click", deleteIngredientInputs);
};

// Add ingredient inputs based on number of sets and inputs
const addIngredientInputs = (ingredients) => {
  ingredients.forEach((ingredient, index) => {
    const ingInputsEls = document.querySelectorAll(".ingredient-set-inputs");
    let lastIngInputsEl = ingInputsEls[ingInputsEls.length - 1];

    if (index !== 0) {
      const hrEl = document.createElement("hr");
      hrEl.classList.add("divider", "divider-create-recipe");
      const newIngInputsEl = lastIngInputsEl.cloneNode(true);
      const newHr = lastIngInputsEl.parentElement.insertBefore(
        hrEl,
        lastIngInputsEl.nextElementSibling
      );
      lastIngInputsEl = lastIngInputsEl.parentElement.insertBefore(
        newIngInputsEl,
        newHr.nextElementSibling
      );
      const newDelSetBtn = lastIngInputsEl.querySelector(".delete-set-btn");
      const newIngBtn = lastIngInputsEl.querySelector(".add-ingredient-btn");
      changeSetNameAttrs(lastIngInputsEl);
      changeSetNum(lastIngInputsEl);
      removeExcessInputs(lastIngInputsEl);
      addIngredientAndDeleteListener(newDelSetBtn, newIngBtn);
      // addDelSetBtnListener(newDelSetBtn);
      reenableDelSetBtn();
      addEventListenerToDelBtnSets(lastIngInputsEl);
    }
    const setName = Object.keys(ingredient)[0];

    changeSetNameValue(lastIngInputsEl, setName);
    const setInputVals = ingredient[setName];

    setInputVals.forEach((setInputVal, index) => {
      const inputsLabelsArr = getLastInputsLabels(lastIngInputsEl);

      if (index !== 0) {
        const newInputsLabels = insertInputsLabels(inputsLabelsArr);
        const delBtn = newInputsLabels.find((el) => el.nodeName === "BUTTON");
        const filteredLabels = newInputsLabels.filter(
          (el) => el.nodeName === "LABEL"
        );
        const filteredInputs = newInputsLabels
          .map((el) => {
            if (el.nodeName === "INPUT") return el;
            if (el.nodeName === "DIV")
              return el.querySelector(".measurement-input");
            return null;
          })
          .filter(Boolean);

        changeOtherInputAttrs(filteredLabels);
        changeOtherInputAttrs(filteredInputs);

        addEventListenerToNewDelBtns(delBtn);
      }
      changeIngInputValues(setInputVal, lastIngInputsEl);
    });
  });
};
// Populates form with data
const populateFormWithData = (recipe) => {
  const cookTimeArr = recipe.cookTime.split(" ");
  const prepTimeArr = recipe.prepTime.split(" ");
  populateTimeInputs(cookTimeArr, "cook-time");
  populateTimeInputs(prepTimeArr, "prep-time");
  document.querySelector("#recipe-name").value = recipe.recipeName;
  document.querySelector("#author").value = recipe.author;
  document.querySelector("#meal-course").value = recipe.mealCourse;

  document.querySelector("#cuisine").value = recipe.cuisine;
  document.querySelector("#num-serving").value = recipe.numServing;
  document.querySelector("#recipe-photo").value = "";

  document
    .querySelector(".file-custom")
    .setAttribute("data-before", "Choose file...");
  document.querySelector("#nutrition-calories").value = recipe.calories;
  document.querySelector("#nutrition-carbs").value = recipe.carbohydrates;
  document.querySelector("#nutrition-protein").value = recipe.protein;

  document.querySelector("#nutrition-fat").value = recipe.fat;
  populateInstructions(recipe.instructions);
  addIngredientInputs(recipe.ingredientSets);
  reenableDelIngInput();
};
// Identifies which recipe to edit
const handleEdit = async (recipeId) => {
  const recipeData = await retreiveData(recipeId);
  populateFormWithData(recipeData);

  showCreateRecipeModal();
};

// Add event listener to edit recipe btns
const addEditRecipeEventListener = () => {
  const editRecipeBtns = document.querySelectorAll(".edit-icon-btn");
  editRecipeBtns.forEach((editBtn, i) => {
    editBtn.addEventListener("click", () => handleEdit(i));
  });
};
addEditRecipeEventListener();
