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
// Populates form with data
const populateFormWithData = (recipe) => {};
// Identifies which recipe to edit
const handleEdit = async (recipeId) => {
  const recipeData = await retreiveData(recipeId);
  populateFormWithData(recipeData);
  console.log(recipeData);
  // showCreateRecipeModal();
};

// Add event listener to edit recipe btns
const addEditRecipeEventListener = () => {
  const editRecipeBtns = document.querySelectorAll(".edit-icon-btn");
  editRecipeBtns.forEach((editBtn, i) => {
    editBtn.addEventListener("click", () => handleEdit(i));
  });
};
addEditRecipeEventListener();
