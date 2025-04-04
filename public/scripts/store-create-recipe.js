const recipeData = [
  // recipeData1
  // {
  // ingredientSet: [],
  // }
];
const reformatTime = (timeInputs) => {
  let newTimeArr = [];
  timeInputs.forEach((time) => {
    newTimeArr.push(time.value);
  });
  return newTimeArr.join(":");
};

// Stores data from create recipe
const storeData = (currentPageNum) => {
  let recipe = {};
  if (currentPageNum === 1) {
    const recipeNameInput = document.querySelector("#recipe-name");
    const authorInput = document.querySelector("#author");
    const prepTimeInputs = document.querySelectorAll(
      "#prep-time-hours, #prep-time-minutes, #prep-time-seconds"
    );
    const cookTimeInputs = document.querySelectorAll(
      "#cook-time-hours, #cook-time-minutes, #cook-time-seconds"
    );
    const mealCourseInput = document.querySelector("#meal-course");
    const cuisineInput = document.querySelector("#cuisine");

    recipe.recipeName = recipeNameInput.value;
    recipe.author = authorInput.value;
    recipe.prepTime = reformatTime(prepTimeInputs);
    recipe.cookTime = reformatTime(cookTimeInputs);
    recipe.mealCourse = mealCourseInput.value;
    recipe.cuisine = cuisineInput.value;
  } else if (currentPageNum === 2) {
    // get number of set ingredients
    recipe.ingredientSets = [];
    const ingredientSets = document.querySelectorAll(".ingredient-set");
    ingredientSets.forEach((ingredientSet, index) => {
      // const ingredientQtyInput = ingre
    });
  }
  recipeData.push(recipe);
  console.log(recipeData);
};

export { storeData };
