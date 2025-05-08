const recipeData = [];
let recipe = {};

const reformatTime = (timeInputs) => {
  let newTimeArr = [];
  timeInputs.forEach((time) => {
    newTimeArr.push(time.value);
  });
  return newTimeArr.join(":");
};
// returns Input value
const getInputValue = (elementId) => {
  const el = document.querySelector(elementId);
  return el.value;
};
// store first form data (basic info form)
const getBasicInfoData = () => {
  const recipe = {};
  const prepTimeInputs = document.querySelectorAll(
    "#prep-time-hours, #prep-time-minutes, #prep-time-seconds"
  );
  const cookTimeInputs = document.querySelectorAll(
    "#cook-time-hours, #cook-time-minutes, #cook-time-seconds"
  );

  recipe.recipeName = getInputValue("#recipe-name");
  recipe.author = getInputValue("#author");
  recipe.prepTime = reformatTime(prepTimeInputs);
  recipe.cookTime = reformatTime(cookTimeInputs);
  recipe.mealCourse = getInputValue("#meal-course");
  recipe.cuisine = getInputValue("#cuisine");
  return recipe;
};

// Get select element
const getSelectElement = (inputsEls) => {
  const els = [...inputsEls];
  const result = els.map((el) => {
    if (el.nodeName === "DIV") {
      return el.querySelector(".measurement-input");
    }
    return el;
  });
  return result;
};
// organize inputs by row
const organizeByRow = (inputs) => {
  let rowInputs = [];
  let newInputs = [];
  inputs.forEach((input, index) => {
    const nextIndex = index + 1;
    console.log("curr index: " + index + " div by 4? " + (index % 4));

    if (index % 4 !== 0 || nextIndex % 4 === 0) {
      newInputs.push(input);
      if (nextIndex % 4 === 0) {
        newInputs.push(inputs[nextIndex]);
        // console.log(newInputs);
        rowInputs.push(newInputs);
        newInputs = [];
      }
    }
  });
  return rowInputs;
};
// Store second form data (ingredients form)
const getIngredientsData = () => {
  const recipe = {};
  recipe.ingredientSets = [];
  const ingSets = document.querySelectorAll(".ingredient-set");
  ingSets.forEach((ingSetEl) => {
    const numRows = ingSetEl.querySelectorAll(".delete-ingredient-btn").length;
    const ingredientSet = [];

    const ingInputs = ingSetEl.querySelector(".ingredient-inputs");

    let inputs = ingInputs.querySelectorAll("input, div");
    inputs = getSelectElement(inputs);
    console.log(inputs);
    const newRows = organizeByRow(inputs);
    console.log(newRows);

    let currentRow = 1;
    let ingredientIds = {
      qty: "quantity",
      measurement: "measurement",
      name: "ingName",
      details: "ingDetails",
    };

    // console.log(numRows);
    const ingKeys = Object.keys(ingredientIds);

    // while (currentRow <= numRows) {
    //   let ingredient = {};
    //   inputs.forEach((input) => {
    //     const inputId = input.id;
    //     console.log(inputId);
    //     const inputRow = Number(inputId.split("-")[2]);
    //     console.log(inputRow);
    //     if (inputRow === currentRow) {
    //       const inputName = input.id.split("-")[1];
    //       console.log(inputName);
    //       ingKeys.forEach((key) => {
    //         console.log(key);
    //         console.log(inputName);
    //         if (key === inputName) {
    //           const ingObjName = ingredientIds[key];
    //           console.log(ingObjName);
    //           ingredient[ingObjName] = getInputValue(inputId);
    //         }
    //       });
    //     }
    //   });
    //   currentRow++;
    //   ingredientSet.push(ingredient);
    //   ingredient = {};
    // }
    // recipe.ingredientSets.push(ingredientSet);
  });
  console.log(recipe.ingredientSets);
  return recipe;
};
// Store third form data (instructions form)
const getInstructionsData = () => {
  const recipe = {};
  recipe.instructions = [];
  const instructionsEl = document.querySelectorAll(
    ".instruction-input-container"
  );
  const numInstructions = instructionsEl.length;
  let i = 1;
  while (i <= numInstructions) {
    recipe.instructions.push(getInputValue("#instruction-" + i));
    i++;
  }
  return recipe;
};
// Store fourth form data (nutrition form)
const getNutritionData = () => {
  const recipe = {};
  recipe.calories = getInputValue("#nutrition-calories");
  recipe.carbohydrates = getInputValue("#nutrition-carbs");
  recipe.protein = getInputValue("#nutrition-protein");
  recipe.fat = getInputValue("#nutrition-fat");
  return recipe;
};
// Stores data from create recipe
const storeData = (currentPageNum) => {
  if (currentPageNum === 1) {
    recipe = { ...getBasicInfoData() };
  } else if (currentPageNum === 2) {
    recipe = { ...recipe, ...getIngredientsData() };
  } else if (currentPageNum === 3) {
    recipe = { ...recipe, ...getInstructionsData() };
  } else {
    recipe = { ...recipe, ...getNutritionData() };
    recipeData.push(recipe);
    recipe = {};
  }
  // console.log(recipe);
};

export { storeData };
