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
// Populate times cooktime or preptime
const populateTimeInputs = (timeArr, timeType) => {
  timeArr.forEach((el, i) => {
    let timeValue = Number(timeArr[i - 1]);
    if (el === "hrs") {
      if (timeType === "prepTime") {
        document.querySelector("#prep-time-hours").value = timeValue;
      } else {
        document.querySelector("#cook-time-hours").value = timeValue;
      }
    } else if (el === "mins") {
      if (timeType === "prepTime") {
        document.querySelector("#prep-time-minutes").value = timeValue;
      } else {
        document.querySelector("#cook-time-minutes").value = timeValue;
      }
    } else {
      if (timeType === "prepTime") {
        document.querySelector("#prep-time-seconds").value = timeValue;
      } else {
        document.querySelector("#cook-time-seconds").value = timeValue;
      }
    }
  });
};
// Populates form with data
const populateFormWithData = (recipe) => {
  const cookTimeArr = recipe.cookTime.split(" ");
  const prepTimeArr = recipe.prepTime.split(" ");
  populateTimeInputs(cookTimeArr, "cookTime");
  populateTimeInputs(prepTimeArr, "prepTime");
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
};
// Identifies which recipe to edit
const handleEdit = async (recipeId) => {
  const recipeData = await retreiveData(recipeId);
  populateFormWithData(recipeData);
  console.log(recipeData);
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
