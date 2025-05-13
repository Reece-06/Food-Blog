import { recipeData } from "./store-create-recipe";
// Transfer all recipe data to form data
const getNewFormData = (recipe) => {
  const formData = new FormData();
  formData.append("author", recipe.author);
  formData.append("calories", recipe.calories);
  formData.append("carbohydrates", recipe.carbohydrates);
  formData.append("cookTime", recipe.cookTime);
  formData.append("cuisine", recipe.cuisine);
  formData.append("fat", recipe.fat);
  formData.append("mealCourse", recipe.mealCourse);
  formData.append("nunServing", recipe.nunServing);
};
// Sends recipe data to the server
const sendRecipeData = async (recipe) => {};
