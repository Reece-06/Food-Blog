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
  recipe.numServing = getInputValue("#num-serving");
  const fileInput = document.querySelector("#recipe-photo");

  const file = fileInput.files[0];
  recipe.photo = file;

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
  for (let i = 0; i < inputs.length; i++) {
    if ((i + 1) % 4 === 0) {
      const row = inputs.slice(i - 3, i + 1);
      rowInputs.push(row);
    }
  }

  return rowInputs;
};
// Store second form data (ingredients form)
const getIngredientsData = () => {
  const recipe = {};
  recipe.ingredientSets = [];
  const ingSets = document.querySelectorAll(".ingredient-sets-input");
  ingSets.forEach((ingSetEl) => {
    const ingredientSet = [];

    const ingInputs = ingSetEl.querySelector(".ingredient-inputs");

    let inputs = ingInputs.querySelectorAll("input, div");

    inputs = getSelectElement(inputs);

    const newRows = organizeByRow(inputs);

    let ingredientIds = {
      qty: "quantity",
      measurement: "measurement",
      name: "ingName",
      details: "ingDetails",
    };

    const ingKeys = Object.keys(ingredientIds);
    newRows.forEach((row) => {
      const ingredient = {};
      row.forEach((input) => {
        const inputId = input.id;
        const idName = inputId.split("-")[1];

        ingKeys.forEach((key) => {
          if (key === idName) {
            const keyName = ingredientIds[key];
            ingredient[keyName] = getInputValue("#" + inputId);
          }
        });
      });

      ingredientSet.push(ingredient);
    });

    recipe.ingredientSets.push(ingredientSet);
  });

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

  for (let i = 0; i < numInstructions; i++) {
    recipe.instructions.push(getInputValue("#instruction-" + (i + 1)));
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
// Remove recipe data
const removeRecipeData = () => {
  recipe = {};
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
    console.log(recipe);
  }
  return recipe;
};

export { storeData, removeRecipeData };
