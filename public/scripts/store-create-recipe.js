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
// Store second form data (ingredients form)
const getIngredientsData = () => {
  const recipe = {};
  recipe.ingredientSets = [];
  const ingredientSetsEl = document.querySelectorAll(".ingredient-set");
  const numIngredientSets = ingredientSetsEl.length;

  let i = 1;
  while (i <= numIngredientSets) {
    const ingredientSet = {};

    ingredientSet.setName = getInputValue("#set-name-" + i);
    ingredientSet.quantity = getInputValue("#ingredient-qty-" + i);
    ingredientSet.measurement = getInputValue("#ingredient-measurement-" + i);
    ingredientSet.ingredientName = getInputValue("#ingredient-name-" + i);
    ingredientSet.details = getInputValue("#ingredient-details-" + i);

    recipe.ingredientSets.push(ingredientSet);

    i++;
  }
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
};

export { storeData };
