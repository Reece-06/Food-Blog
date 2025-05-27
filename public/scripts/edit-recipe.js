import { showCreateRecipeModal } from "./create-recipe.js";
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
// Add instruction inputs based on the instruction length
const addInstructionInputs = (insLen) => {
  console.log(insLen);
  let numOfExistingIns = 1; // Default 1 existing
  while (numOfExistingIns < insLen) {
    const insContainerEls = document.querySelectorAll(
      ".instruction-input-container"
    );
    const lastInsContainer = insContainerEls[insContainerEls.length - 1];
    console.log("lastInsContainer:", lastInsContainer);
    const newInsContainer = lastInsContainer.cloneNode(true);
    console.log("newInsContainer:", newInsContainer);
    const newInsInput = newInsContainer.querySelector(".instruction-input");
    console.log("newInsInput:", newInsInput);
    const newInsLabel = newInsContainer.querySelector(".ins-label");
    console.log("newInsLabel:", newInsLabel);
    const idArr = newInsInput.id.split("-");
    const lastNum = Number(idArr[idArr.length - 1]);
    console.log("lastNum:", lastNum);

    newInsInput.id = "instruction-" + (lastNum + 1);
    newInsInput.name = "instruction-" + (lastNum + 1);
    newInsLabel.setAttribute("for", "instruction-" + (lastNum + 1));
    console.log("newInsInput:", newInsInput);
    console.log("newInsLabel:", newInsLabel);
    lastInsContainer.parentNode.insertBefore(
      newInsContainer,
      lastInsContainer.nextSibling
    );
    numOfExistingIns++;
  }
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
  // console.log(inputsLabelsArr);
  inputsLabelsArr.forEach((el) => {
    const newEl = el.cloneNode(true);
    if (el.nodeName === "LABEL") {
      newEl.classList.add("hidden-label");
    }

    el.parentElement.insertBefore(newEl, lastEl.nextElementSibling);
    lastEl = newEl;
  });
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
  const lastElIdArr = lastElement.id.split("-");
  let lastNumber = Number(lastElIdArr[lastElIdArr.length - 1]);
  elements.forEach((el) => {
    const newNum = lastNumber + 1;
    const elIdArr = el.id.split("-");
    elIdArr[elIdArr.length - 1] = newNum;
    const newId = elIdArr.join("-");
    if (el.nodeName === "INPUT") {
      el.id = newId;
      el.name = newId;
    } else {
      el.setAttribute("for", newId);
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
// Add ingredient inputs based on number of sets and inputs
const addIngredientInputs = (ingredients) => {
  ingredients.forEach((ingredient, index) => {
    const ingInputsEls = document.querySelectorAll(".ingredient-set-inputs");
    let lastIngInputsEl = ingInputsEls[ingInputsEls.length - 1];

    if (index !== 0) {
      const newIngInputsEl = lastIngInputsEl.cloneNode(true);
      lastIngInputsEl = lastIngInputsEl.parentElement.insertBefore(
        newIngInputsEl,
        lastIngInputsEl.nextElementSibling
      );
      changeSetNameAttrs(lastIngInputsEl);
      removeExcessInputs(lastIngInputsEl);
    }
    const setName = Object.keys(ingredient)[0];

    changeSetNameValue(lastIngInputsEl, setName);
    const setInputVals = ingredient[setName];
    // console.log(setInputVals);
    setInputVals.forEach((setInputVal, index) => {
      const inputsLabelsArr = getLastInputsLabels(lastIngInputsEl);
      const filteredLabels = inputsLabelsArr.filter(
        (el) => el.nodeName === "LABEL"
      );
      const filteredInputs = inputsLabelsArr
        .map((el) => {
          if (el.nodeName === "INPUT") return el;
          if (el.nodeName === "DIV")
            return el.querySelector(".measurement-input");
          return null;
        })
        .filter(Boolean);

      // console.log(filteredLabels);
      // console.log(filteredInputs);
      if (index !== 0) {
        // console.log(index);
        // console.log(inputsLabelsArr);
        insertInputsLabels(inputsLabelsArr);
        // changeOtherInputAttrs(filteredLabels);
        // changeOtherInputAttrs(filteredInputs);
      }
      // changeIngInputValues(setInputVal, lastIngInputsEl);
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
