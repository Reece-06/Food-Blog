import { recipeData } from "./store-create-recipe";
const retrieveInstructions = () => {};
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
  formData.append("numServing", recipe.numServing);
  formData.append("prepTime", recipe.prepTime);
  formData.append("protein", recipe.protein);
  formData.append("recipeName", recipe.recipeName);
  formData.append("photo", recipe.photo);
  formData.append("instructions", JSON.stringify(recipe.instructions));
  formData.append("ingredientSets", JSON.stringify(recipe.ingredientSets));
};
// Sends recipe data to the server
const sendRecipeData = async (recipe) => {};
