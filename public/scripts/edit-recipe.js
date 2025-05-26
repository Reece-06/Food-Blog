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
// Change Ids names and fors of input fields
const changeIngredientAttrs = (ingInputsEl) => {
  ingInputsEl;
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
  const lastEl = inputsLabelsArr[inputsLabelsArr.length - 1];
  inputsLabelsArr.forEach((el) => {
    const newEl = el.cloneNode();
    el.parentElement.insertBefore(newEl, lastEl.nextElementSibling);
    if (el.nodeName === "LABEL") {
      newEl.classList.add("hidden-label");
    }
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
// Add ingredient inputs based on number of sets and inputs
const addIngredientInputs = (ingredients) => {
  ingredients.forEach((ingredient, index) => {
    let lastIngInputsEl;
    if (index !== 0) {
      const ingInputsEls = document.querySelectorAll(".ingredient-set-inputs");
      lastIngInputsEl = ingInputsEls[ingInputsEls.length - 1];
      const newIngInputsEl = lastIngInputsEl.cloneNode();
      lastIngInputsEl.parentElement.insertBefore(
        newIngInputsEl,
        lastIngInputsEl.nextElementSibling
      );
    }
    const setName = Object.keys(ingredient)[0];
    const setNameInput = lastIngInputsEl.querySelector(".set-name-input");
    setNameInput.value = setName;
    const setInputVals = ingredient[setName];
    setInputVals.forEach((setInputVal, index) => {
      // changeIngredientAttrs(newIngInputsEl);
      const inputsLabelsArr = getLastInputsLabels(lastIngInputsEl);

      if (index !== 0) {
        insertInputsLabels(inputsLabelsArr);
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
